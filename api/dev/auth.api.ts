/**
 * lib/api/auth.api.ts
 * ─────────────────────────────────────────────────────────────
 * DEV-ONLY static auth API.
 * Replace this file with real API calls when you have a backend.
 * The shape of AuthUser and the return types must stay the same
 * so the store doesn't need to change.
 * ─────────────────────────────────────────────────────────────
 */

export type Role = "admin" | "user";
// Add more roles here when needed:
// export type Role = "admin" | "user" | "manager";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

// ── Static accounts — swap credentials to switch roles ────────
const STATIC_USERS: Record<string, AuthUser & { password: string }> = {
  "admin@dev.com": {
    id: "1",
    name: "Dev Admin",
    email: "admin@dev.com",
    password: "admin",
    role: "admin",
  },
  "user@dev.com": {
    id: "2",
    name: "Dev User",
    email: "user@dev.com",
    password: "user",
    role: "user",
  },
};

// ── Simulated async calls (swap for fetch() later) ────────────

export async function apiLogin(
  email: string,
  password: string,
): Promise<AuthUser> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 600));

  const account = STATIC_USERS[email.toLowerCase().trim()];
  if (!account || account.password !== password) {
    throw new Error("Invalid email or password.");
  }

  const { password: _, ...user } = account;
  return user;
}

export async function apiLogout(): Promise<void> {
  await new Promise((r) => setTimeout(r, 200));
}
