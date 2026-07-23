import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
  titleClassName,
  eyebrowClassName,
}: {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>
        {(eyebrow || title) && (
          <header className="mb-10 max-w-3xl sm:mb-12">
            {eyebrow ? (
              <p className={cn("type-eyebrow", eyebrowClassName)}>{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className={cn("type-section mt-3 text-[var(--foreground)]", titleClassName)}>
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

