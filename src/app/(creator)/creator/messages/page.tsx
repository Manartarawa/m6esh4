import { getSession } from "@/lib/auth/session";
import { messageService } from "@/services/message.service";
import { EmptyState } from "@/components/ui/states";

export default async function CreatorMessagesPage() {
  const session = await getSession();
  const conversations = session ? messageService.listConversations(session.user.id) : [];
  const active = conversations[0];
  const thread = active ? messageService.listMessages(active.id) : [];

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">Messages</h1>
      {active ? (
        <section className="card grid gap-3 p-5">
          {thread.map((message) => (
            <article key={message.id} className="rounded-2xl bg-surface-muted p-3">
              <p className="text-xs text-muted">{message.senderName}</p>
              <p className="mt-1">{message.body}</p>
            </article>
          ))}
        </section>
      ) : (
        <EmptyState title="No messages" body="Client conversations will appear here." />
      )}
    </div>
  );
}
