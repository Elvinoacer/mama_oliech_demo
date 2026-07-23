/**
 * Basic link/button styles.
 * TODO:
 * - Flesh out brand colors (warm earth / wood / Lake Victoria blues?).
 * - Add loading / disabled states for forms.
 * - Prefer <Link> for internal routes (passed as `href`).
 */

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:opacity-90",
  secondary:
    "border border-foreground/15 bg-transparent hover:bg-foreground/5",
  ghost: "hover:bg-foreground/5",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
