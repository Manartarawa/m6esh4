export default function AdminReportsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">Reports</h1>
      <article className="card p-5">
        <p className="badge">Moderation</p>
        <h2 className="mt-2 text-xl font-semibold">No open reports</h2>
        <p className="mt-2 text-muted">Flagged briefs and profiles will land here.</p>
      </article>
    </div>
  );
}
