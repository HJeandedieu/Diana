export interface Session {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
}

// Conversation is an alias for Session — sidebar uses this name
export type Conversation = Session;

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sessionId?: string;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string | null;
    };
  };
}

export interface SendMessageResponse {
  success: boolean;
  data: {
    id: string;
    role: "assistant";
    content: string;
    sessionTitle?: string;
  };
}

export interface Memory {
  id: string;
  memoryType: string;
  content: string;
  importance: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt?: string;
}
