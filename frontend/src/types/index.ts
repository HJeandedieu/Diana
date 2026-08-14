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

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
  };
}

export interface SendMessageResponse {
  success: boolean;
  data: Message;
}


export interface Memory {
  id: string;
  memoryType: string;
  content: string;
  importance: number;
  createdAt: string;
  updatedAt: string;
}