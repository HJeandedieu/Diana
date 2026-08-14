const API_URL = import.meta.env.VITE_API_URL;

import type { Session, Message } from "../types/index";

export async function createSession(
  title: string,
  token: string,
): Promise<Session> {
  const response = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to create session");
  }

  const result = await response.json();
  return result.data;
}

export async function getSessions(token: string): Promise<Session[]> {
  const response = await fetch(`${API_URL}/sessions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }

  const result = await response.json();
  return result.data;
}

export async function getSessionMessages(
  sessionId: string,
  token: string,
): Promise<Message[]> {
  const response = await fetch(`${API_URL}/sessions/${sessionId}/messages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const result = await response.json();
  return result.data;
}
