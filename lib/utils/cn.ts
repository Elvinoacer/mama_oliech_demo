/**
 * Tiny className helper.
 * TODO: swap for `clsx` + `tailwind-merge` if class conflicts become painful.
 */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
