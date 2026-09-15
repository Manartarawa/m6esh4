import { conversations, messages } from "@/lib/data/mock";

export const messageService = {
  listConversations(userId: string) {
    return conversations.filter((item) => item.clientId === userId || item.creatorId === userId);
  },
  listMessages(conversationId: string) {
    return messages.filter((item) => item.conversationId === conversationId);
  },
  send(input: { conversationId: string; senderId: string; senderName: string; body: string }) {
    const message = {
      id: `m-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...input,
    };
    messages.push(message);
    const conversation = conversations.find((item) => item.id === input.conversationId);
    if (conversation) {
      conversation.lastMessage = input.body;
      conversation.updatedAt = message.createdAt;
    }
    return message;
  },
};
