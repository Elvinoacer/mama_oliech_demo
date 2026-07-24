import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand-primary)] text-[var(--surface)] hover:bg-[var(--brand-primary-hover)] active:bg-[var(--brand-primary-hover)]/90 shadow-sm shadow-[var(--brand-primary)]/20",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--brand-accent)] hover:bg-[var(--accent-soft)] active:bg-stone-100",
  ghost:
    "text-[var(--foreground)] hover:bg-[var(--foreground)]/5 active:bg-[var(--foreground)]/10",
  outline:
    "border border-amber-500/40 text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30 backdrop-blur-md",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-[36px] px-3.5 py-1.5 text-xs sm:text-sm gap-1.5",
  md: "min-h-[44px] px-5 py-2.5 text-xs sm:text-sm md:text-base gap-2",
  lg: "min-h-[48px] sm:min-h-[52px] px-6 sm:px-7 py-3 text-sm sm:text-base md:text-lg gap-2.5",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  external?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  external,
  disabled,
  ...rest
}: ButtonProps) {
  const baseClasses = cn(
    // Base layout & alignment
    "inline-flex items-center justify-center font-bold rounded-full select-none text-center whitespace-nowrap",
    // Touch feedback & micro-interactions
    "transition-all duration-200 active:scale-[0.98] shrink-0",
    // Focus states
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    // Disabled states
    "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
    // Optional Full Width support for mobile button stacks
    fullWidth && "w-full",
    // Variants & Sizes
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const isExternal =
      external ||
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={baseClasses}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
