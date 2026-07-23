/**
 * Vertical page section with optional heading.
 * TODO: add spacing scale + optional background variants (cream/wood brand feel).
 */

import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
}: {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-12 sm:py-16", className)}>
      <Container>
        {(eyebrow || title) && (
          <header className="mb-8 max-w-2xl">
            {eyebrow ? (
              <p className="text-sm font-medium tracking-wide uppercase opacity-70">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h2>
            ) : null}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
