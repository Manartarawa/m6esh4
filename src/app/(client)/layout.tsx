import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard-nav";
import { SiteHeader } from "@/components/site-chrome";
import { getSession } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/roles";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/projects/new", label: "New project" },
  { href: "/dashboard/brief", label: "AI Brief Builder" },
  { href: "/dashboard/match", label: "Creative Match" },
  { href: "/dashboard/messages", label: "Messages" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.role === "CREATOR") redirect("/creator/dashboard");
  requireRole(session.user.role, ["CLIENT", "ADMIN"]);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader session={session} />
      <div className="container-mesh grid flex-1 gap-6 py-8 md:grid-cols-[240px_1fr]">
        <DashboardNav title="Client" items={items} />
        <div>{children}</div>
      </div>
    </div>
  );
}
