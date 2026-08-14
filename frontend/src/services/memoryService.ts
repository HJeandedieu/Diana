const API_URL = import.meta.env.VITE_API_URL;
import type { Memory } from "../types/index";

export async function getMemories(token: string): Promise<Memory[]> {
  const response = await fetch(`${API_URL}/memories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch memories");
  const result = await response.json();
  return result.data;
}

export async function updateMemory(
  id: string,
  content: string,
  token: string,
): Promise<Memory> {
  const response = await fetch(`${API_URL}/memories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error("Failed to update memory");
  const result = await response.json();
  return result.data;
}

export async function deleteMemory(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/memories/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete memory");
}