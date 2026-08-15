const API_URL = import.meta.env.VITE_API_URL;

export async function updateProfile(
  name: string,
  email: string,
  token: string,
) {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  const result = await response.json();
  return result.data;
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
  token: string,
) {
  const response = await fetch(`${API_URL}/users/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message ?? "Failed to update password");
  }
}

export async function clearAllMemories(token: string) {
  const response = await fetch(`${API_URL}/users/memories`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to clear memories");
}

export async function deleteAccount(token: string) {
  const response = await fetch(`${API_URL}/users`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete account");
}
