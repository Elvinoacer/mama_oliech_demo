"use client";

import { useState } from "react";
import Image from "next/image";
import { getActiveBranches } from "@/lib/data/locations";
import { Button } from "@/components/ui/button";

const branches = getActiveBranches();

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
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
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Visual Banner Header */}
      <div className="relative aspect-[16/7] sm:aspect-[21/8] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--border)] shadow-sm bg-stone-900">
        <Image
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80"
          alt="Mama Oliech Guest Hospitality"
          fill
          sizes="(max-width: 640px) 100vw, 600px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <span className="absolute bottom-3 left-3.5 sm:bottom-4 sm:left-5 text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider backdrop-blur-sm bg-black/40 px-2.5 py-1 rounded-md border border-amber-500/20">
          Direct Customer Service
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        {/* Honeypot — hidden from users */}
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Contact Info Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" placeholder="John Doe" required />
          <Field
            label="Phone / WhatsApp"
            name="phone"
            type="tel"
            placeholder="+254 700 000 000"
            required
          />
        </div>

        <Field
          label="Email address"
          name="email"
          type="email"
          placeholder="john@example.com"
        />

        {/* Branch Selector */}
        <div>
          <label
            htmlFor="branch"
            className="mb-1.5 block text-xs sm:text-sm font-semibold text-[var(--foreground)]"
          >
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            defaultValue=""
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-[var(--foreground)] transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
          >
            <option value="">Either / Not sure yet</option>
            {branches.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Message Input */}
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-xs sm:text-sm font-semibold text-[var(--foreground)]"
          >
            Message <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="How can we help you today? Ask about reservations, menu items, or general enquiries…"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-[var(--foreground)] transition-colors placeholder:text-[var(--muted)]/60 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
          />
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={status === "loading"}
            className="w-full sm:w-auto font-bold min-h-[44px] shadow-sm active:scale-[0.98] transition-transform"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Sending Message…</span>
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>

        {/* Status Alert Banner */}
        {message ? (
          <div
            role="status"
            className={`flex items-start gap-3 rounded-xl p-3.5 text-xs sm:text-sm border transition-all ${
              status === "error"
                ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
            }`}
          >
            {status === "error" ? (
              <svg
                className="h-5 w-5 shrink-0 stroke-current mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 shrink-0 stroke-current mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <p className="font-medium leading-relaxed">{message}</p>
          </div>
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
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs sm:text-sm font-semibold text-[var(--foreground)]"
      >
        {label}
        {required ? (
          <span className="text-[var(--brand-accent)]"> *</span>
        ) : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-[var(--foreground)] transition-colors placeholder:text-[var(--muted)]/60 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
      />
    </div>
  );
}
