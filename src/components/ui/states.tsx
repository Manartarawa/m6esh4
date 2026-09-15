export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2">{body}</p>
    </div>
  );
}

export function LoadingState({ label = "Loading MESH…" }: { label?: string }) {
  return <div className="loading-state">{label}</div>;
}

export function ErrorState({ title = "Could not load this page", body }: { title?: string; body: string }) {
  return (
    <div className="error-state">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2">{body}</p>
    </div>
  );
}
