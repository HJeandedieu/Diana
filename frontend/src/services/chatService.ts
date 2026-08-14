const API_URL = import.meta.env.VITE_API_URL;

import type { SendMessageResponse } from "../types/index";
export async function sendMessage(
  sessionId: string,
  message: string,
  token: string,
) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      sessionId,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const result: SendMessageResponse = await response.json();

  return result.data;
}
