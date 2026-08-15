const API_URL = import.meta.env.VITE_API_URL;

import type { AuthResponse } from "../types";

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const result: AuthResponse = await response.json();
  localStorage.setItem("token", result.data.token);
  localStorage.setItem("user", JSON.stringify(result.data.user));
  return { token: result.data.token, user: result.data.user };
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) throw new Error("Registration failed");

  const result = await response.json();
  return { token: result.data.token, user: result.data.user };
}
