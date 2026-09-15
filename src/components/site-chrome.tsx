import Link from "next/link";
import { appConfig } from "@/config/app";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import type { Session } from "@/lib/auth/session";
import { homeForRole } from "@/lib/auth/session";

export function SiteHeader({ session }: { session: Session | null }) {
  const home = session ? homeForRole(session.user.role) : "/sign-in";
  return (
    <header className="site-header border-b border-border bg-surface/80 backdrop-blur">
      <div className="container-mesh flex items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {appConfig.name}
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
          <Link href="/explore">Explore</Link>
          <Link href="/creators">Creators</Link>
          <Link href="/projects">Projects</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          {session ? (
            <Link href={home} className="btn btn-primary">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-secondary">
                Sign in
              </Link>
              <Link href="/sign-up" className="btn btn-primary">
                Join MESH
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-mesh flex flex-col gap-2 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{appConfig.name} · creative marketplace</p>
        <p>Built as a sequential product from discovery through production foundations.</p>
      </div>
    </footer>
  );
}
