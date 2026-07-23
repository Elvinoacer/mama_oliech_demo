"use client";

import { useState } from "react";
import Image from "next/image";
import { getActiveBranches } from "@/lib/data/locations";
import { Button } from "@/components/ui/button";

const branches = getActiveBranches();

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (String(data.get("company") ?? "").trim()) {
      setStatus("ok");
      setMessage("Thanks — we received your message.");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          branch: data.get("branch"),
          message: data.get("message"),
        }),
      });
      const json = (await res.json()) as { message?: string; ok?: boolean };
      if (!res.ok) {
        setStatus("error");
        setMessage(json.message ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage(json.message ?? "Thanks — we received your message.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-sm">
      <div className="relative mb-6 aspect-[21/8] w-full overflow-hidden rounded-2xl border border-[var(--border)]">
        <Image
          src="/images/locations/restaurant-dining-vibe.jpg"
          alt="Mama Oliech Guest Hospitality"
          fill
          sizes="(max-width: 640px) 100vw, 500px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-4 text-xs font-bold text-white uppercase tracking-wider">
          Direct Customer Service
        </span>
      </div>

      <form onSubmit={onSubmit} className="max-w-lg space-y-4">
        {/* Honeypot — hidden from users */}
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

      <Field label="Name" name="name" required />
      <Field label="Phone / WhatsApp" name="phone" type="tel" required />
      <Field label="Email" name="email" type="email" />
      <div>
        <label htmlFor="branch" className="mb-2 block text-base font-semibold">
          Branch
        </label>
        <select
          id="branch"
          name="branch"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          defaultValue=""
        >
          <option value="">Either / not sure</option>
          {branches.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-base font-semibold">
          Message <span className="text-[var(--brand-accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>

      {message ? (
        <p
          className={`text-base ${status === "error" ? "text-red-700" : "text-[var(--brand-primary)]"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-base font-semibold">
        {label}
        {required ? <span className="text-[var(--brand-accent)]"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      />
    </div>
  );
}
