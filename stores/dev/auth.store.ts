/**
 * stores/auth.store.ts
 * ─────────────────────────────────────────────────────────────
 * Zustand auth store.
 *
 * Shape consumed by app/(protected)/_layout.tsx:
 *   isAuthenticated  — boolean
 *   user.role        — string matching a key in ROLE_ROUTES
 *
 * DEV shortcut: set DEFAULT_AUTH below to skip the login screen
 * and boot straight into a role.
 * ─────────────────────────────────────────────────────────────
 */

import { create } from "zustand";
import { apiLogin, apiLogout, AuthUser } from "@/api/dev/auth.api";

// ── DEV SHORTCUT ──────────────────────────────────────────────
// Set to a role string to auto-authenticate on launch, or null
// to go through the login screen normally.
//
//   "admin"  → boots into /(protected)/admin
//   "user"   → boots into /(protected)/user
//   null     → shows login screen
//
const DEV_AUTO_LOGIN: "admin" | "user" | null = "admin";

const DEV_USERS: Record<string, AuthUser> = {
  admin: { id: "1", name: "Dev Admin", email: "admin@dev.com", role: "admin" },
  user: { id: "2", name: "Dev User", email: "user@dev.com", role: "user" },
};
// ─────────────────────────────────────────────────────────────

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  // Auto-login in dev if DEV_AUTO_LOGIN is set
  isAuthenticated: DEV_AUTO_LOGIN !== null,
  user: DEV_AUTO_LOGIN ? DEV_USERS[DEV_AUTO_LOGIN] : null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await apiLogin(email, password);
      set({ isAuthenticated: true, user, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    await apiLogout();
    set({ isAuthenticated: false, user: null, loading: false, error: null });
  },
}));
