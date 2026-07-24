import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

interface SectionProps {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
  descriptionClassName?: string;
  headerClassName?: string;
}

export function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  className,
  titleClassName,
  eyebrowClassName,
  descriptionClassName,
  headerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-12 sm:py-16 lg:py-24", className)}>
      <Container>
        {(eyebrow || title || description) && (
          <header
            className={cn("mb-6 sm:mb-10 lg:mb-12 max-w-3xl", headerClassName)}
          >
            {eyebrow ? (
              <p
                className={cn(
                  "type-eyebrow text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--brand-accent)]",
                  eyebrowClassName,
                )}
              >
                {eyebrow}
              </p>
            ) : null}

            {title ? (
              <h2
                className={cn(
                  "type-section mt-1.5 sm:mt-2.5 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)] leading-tight text-balance",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : null}

            {description ? (
              <p
                className={cn(
                  "mt-2.5 sm:mt-3 text-xs sm:text-base text-[var(--muted)] leading-relaxed max-w-2xl",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : null}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
