export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatCurrency(value?: number) {
  if (value == null) return "Flexible";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatBudget(min?: number, max?: number) {
  if (min == null && max == null) return "Budget flexible";
  if (min != null && max != null) return `${formatCurrency(min)} – ${formatCurrency(max)}`;
  return formatCurrency(min ?? max);
}



export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function skillFromCategory(category: string) {
  return { id: `s-${slugify(category)}`, name: category, slug: slugify(category) };
}

export function normalizeBehanceUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "https://www.behance.net";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^www\./i.test(trimmed)) return `https://${trimmed}`;
  if (/^behance\.net\//i.test(trimmed)) return `https://${trimmed}`;
  return `https://www.behance.net/${trimmed.replace(/^\/+/, "")}`;
}

export function isRedirectError(error: unknown) {
  return typeof error === "object" && error !== null && "digest" in error;
}
