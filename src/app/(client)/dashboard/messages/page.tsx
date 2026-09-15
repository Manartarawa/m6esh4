import { getSession } from "@/lib/auth/session";
import { messageService } from "@/services/message.service";
import { EmptyState } from "@/components/ui/states";

export default async function ClientMessagesPage() {
  const session = await getSession();
  const conversations = session ? messageService.listConversations(session.user.id) : [];
  const active = conversations[0];
  const thread = active ? messageService.listMessages(active.id) : [];

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">Messages</h1>
      {active ? (
        <div className="grid gap-4 md:grid-cols-[240px_1fr]">
          <aside className="card p-4">
            {conversations.map((item) => (
              <p key={item.id} className="rounded-xl bg-accent-soft px-3 py-2 text-sm">
                {item.creatorName}
                <span className="mt-1 block text-muted">{item.projectTitle}</span>
              </p>
            ))}
          </aside>
          <section className="card grid gap-3 p-5">
            {thread.map((message) => (
              <article key={message.id} className="rounded-2xl bg-surface-muted p-3">
                <p className="text-xs text-muted">{message.senderName}</p>
                <p className="mt-1">{message.body}</p>
              </article>
            ))}
          </section>
        </div>
      ) : (
        <EmptyState title="No conversations" body="Messages appear after a match or application." />
      )}
    </div>
  );
}
