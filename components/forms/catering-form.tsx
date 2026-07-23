"use client";

import { useState } from "react";
import { getActiveBranches } from "@/lib/data/locations";
import { Button } from "@/components/ui/button";

const branches = getActiveBranches();

export function CateringForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim()) {
      setStatus("ok");
      setMessage("Thanks — we received your catering enquiry.");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          date: data.get("date"),
          guestCount: data.get("guestCount"),
          branch: data.get("branch"),
          message: data.get("message"),
        }),
      });
      const json = (await res.json()) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(json.message ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage(json.message ?? "Thanks — we received your catering enquiry.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-4">
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company-catering">Company</label>
        <input id="company-catering" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Name" name="name" required />
      <Field label="Phone / WhatsApp" name="phone" type="tel" required />
      <Field label="Email" name="email" type="email" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Event date" name="date" type="date" required />
        <Field label="Guest count" name="guestCount" type="number" required />
      </div>
      <div>
        <label htmlFor="branch-catering" className="mb-2 block text-base font-semibold">
          Preferred branch
        </label>
        <select
          id="branch-catering"
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
        <label htmlFor="message-catering" className="mb-2 block text-base font-semibold">
          Details <span className="text-[var(--brand-accent)]">*</span>
        </label>
        <textarea
          id="message-catering"
          name="message"
          required
          rows={5}
          placeholder="Occasion, menu preferences, dietary notes…"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send catering enquiry"}
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
        min={type === "number" ? 1 : undefined}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      />
    </div>
  );
}
