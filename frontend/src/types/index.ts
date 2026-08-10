export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}
export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
}
