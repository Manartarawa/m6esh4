import Link from "next/link";
import { appConfig } from "@/config/app";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-orb auth-orb-top" aria-hidden="true" />
      <div className="auth-orb auth-orb-bottom" aria-hidden="true" />
      <div className="auth-grid" aria-hidden="true" />
      <div className="auth-content">
        <Link href="/" className="auth-brand">
          {appConfig.name}
        </Link>
        <div className="auth-panel">{children}</div>
      </div>
    </div>
  );
}
