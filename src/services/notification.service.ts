import { notifications } from "@/lib/data/mock";
import type { Notification } from "@/types/domain";

export const notificationService = {
  list(userId: string) {
    return notifications.filter((item) => item.userId === userId);
  },
  create(input: Omit<Notification, "id" | "createdAt">) {
    const note: Notification = {
      ...input,
      id: `n-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    notifications.unshift(note);
    return note;
  },
  markRead(id: string) {
    const note = notifications.find((item) => item.id === id);
    if (note && !note.readAt) note.readAt = new Date().toISOString();
    return note ?? null;
  },
};
