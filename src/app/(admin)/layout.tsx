import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard-nav";
import { SiteHeader } from "@/components/site-chrome";
import { getSession } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/roles";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  requireRole(session.user.role, ["ADMIN"]);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader session={session} />
      <div className="container-mesh grid flex-1 gap-6 py-8 md:grid-cols-[240px_1fr]">
        <DashboardNav title="Admin" items={items} />
        <div>{children}</div>
      </div>
    </div>
  );
}
