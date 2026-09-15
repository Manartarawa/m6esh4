import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getSession } from "@/lib/auth/session";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader session={session} />
      <main className="container-mesh flex-1 py-8 md:py-12">{children}</main>
      <SiteFooter />
    </div>
  );
}
