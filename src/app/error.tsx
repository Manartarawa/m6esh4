"use client";

import { ErrorFallback } from "@/app/not-found";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-mesh py-16">
      <ErrorFallback error={error} />
      <button type="button" className="btn btn-secondary mt-4" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
