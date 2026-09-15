import Link from "next/link";
import { cn } from "@/lib/utils";

export function DashboardNav({
  items,
  title,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <aside className="dashboard-nav card h-fit p-4 md:sticky md:top-6">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{title}</p>
      <nav className="mt-4 grid gap-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={cn("rounded-xl px-3 py-2 text-sm hover:bg-accent-soft")}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
