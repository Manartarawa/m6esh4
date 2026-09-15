import Link from "next/link";
import type { Metadata } from "next";
import { toPublicError } from "@/lib/errors";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="container-mesh py-24">
      <div className="error-state mx-auto max-w-lg">
        <p className="badge">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">This page is not on the mesh.</h1>
        <p className="mt-2">The route does not exist or the resource was removed.</p>
        <Link href="/" className="btn btn-primary mt-6">
          Back home
        </Link>
      </div>
    </div>
  );
}

export function ErrorFallback({ error }: { error: unknown }) {
  const publicError = toPublicError(error);
  return (
    <div className="error-state">
      <p className="badge">{publicError.status}</p>
      <h1 className="mt-4 text-xl font-semibold text-foreground">{publicError.message}</h1>
    </div>
  );
}
