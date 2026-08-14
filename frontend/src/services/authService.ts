const API_URL = import.meta.env.VITE_API_URL;

import type { LoginResponse } from "../types";
export async function loginUser(
  email: string,
  password: string,
): Promise<string> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const result: LoginResponse = await response.json();

  return result.data.token;
}
