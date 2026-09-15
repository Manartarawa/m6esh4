import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard-nav";
import { SiteHeader } from "@/components/site-chrome";
import { getSession } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/roles";

const items = [
  { href: "/creator/dashboard", label: "Overview" },
  { href: "/creator/projects", label: "Open projects" },
  { href: "/creator/applications", label: "Applications" },
  { href: "/creator/portfolio", label: "Portfolio" },
  { href: "/creator/messages", label: "Messages" },
  { href: "/creator/settings", label: "Settings" },
];

export default async function CreatorLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.role === "CLIENT") redirect("/dashboard");
  requireRole(session.user.role, ["CREATOR", "ADMIN"]);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader session={session} />
      <div className="container-mesh grid flex-1 gap-6 py-8 md:grid-cols-[240px_1fr]">
        <DashboardNav title="Creator" items={items} />
        <div>{children}</div>
      </div>
    </div>
  );
}
