"use client";

import { ErrorFallback } from "@/app/not-found";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="bg-background text-foreground">
        <div className="container-mesh py-24">
          <ErrorFallback error={error} />
          <button type="button" className="btn btn-secondary mt-4" onClick={reset}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
