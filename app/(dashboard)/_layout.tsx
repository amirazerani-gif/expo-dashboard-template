/**
 * app/(protected)/_layout.tsx
 * ─────────────────────────────────────────────────────────────
 * Guards all child routes behind authentication and redirects
 * each role to its own sub-group.
 *
 * FOLDER STRUCTURE (create these as needed):
 *   app/(protected)/
 *     _layout.tsx        ← this file
 *     admin/
 *       _layout.tsx
 *       index.tsx
 *     user/
 *       _layout.tsx
 *       index.tsx
 *
 * ADDING A NEW ROLE:
 *   1. Add the role → path mapping to ROLE_ROUTES below
 *   2. Create the folder + _layout.tsx + screens
 * ─────────────────────────────────────────────────────────────
 */

import { useAuthStore } from "@/stores/dev/auth.store";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

// ── Role → route mapping ──────────────────────────────────────────────────────
const ROLE_ROUTES: Record<string, string> = {
  admin: "/(protected)/admin",
  user: "/(protected)/user",
  // Add more roles here:
  // manager: "/(protected)/manager",
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ProtectedLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
      return;
    }

    const role = user?.role ?? "";
    const targetRoute = ROLE_ROUTES[role];
    const currentGroup = segments[1]; // e.g. "admin" | "user"

    if (!targetRoute) {
      // Unknown role — send back to tabs
      router.replace("/(tabs)/");
      return;
    }

    const expectedGroup = targetRoute.split("/").pop(); // "admin" | "user" …
    if (currentGroup !== expectedGroup) {
      router.replace(targetRoute as any);
    } else {
      setReady(true);
    }
  }, [isAuthenticated, user, segments]);

  if (!isAuthenticated || !ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
