/**
 * theme/useTheme.ts
 * ─────────────────────────────────────────────────────────────
 * Returns the correct token set based on the device color scheme.
 * Usage:  const { theme, isDark } = useTheme();
 * ─────────────────────────────────────────────────────────────
 */

import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, radius, spacing } from "./tokens";

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  return { theme, isDark, radius, spacing };
}
