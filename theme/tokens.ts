/**
 * theme/tokens.ts
 * ─────────────────────────────────────────────────────────────
 * Central color + radius + spacing tokens.
 * Edit these values to reskin the entire app.
 * ─────────────────────────────────────────────────────────────
 */

export const palette = {
  // ── Brand ────────────────────────────────────────────────────
  primary: "#2d4a5a",
  primaryLight: "#3d6070",
  primaryDark: "#1e3340",

  secondary: "#E5C37E",
  secondaryLight: "#EDD49A",
  secondaryDark: "#C6A664",

  // ── Semantic ─────────────────────────────────────────────────
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // ── Neutrals ─────────────────────────────────────────────────
  white: "#FFFFFF",
  black: "#000000",
} as const;

export type ColorScheme = "light" | "dark";

interface ThemeTokens {
  // backgrounds
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSecondary: string;

  // text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // borders
  border: string;
  borderStrong: string;

  // brand
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  // semantic
  success: string;
  warning: string;
  error: string;
  info: string;

  // tab bar
  tabBarBg: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
}

export const lightTheme: ThemeTokens = {
  background: "#F8FAFC",
  backgroundSecondary: "#F1F5F9",
  surface: "#FFFFFF",
  surfaceSecondary: "#F8FAFC",

  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textTertiary: "#94A3B8",
  textInverse: "#FFFFFF",

  border: "#E2E8F0",
  borderStrong: "#CBD5E1",

  primary: palette.primary,
  primaryLight: palette.primaryLight,
  primaryDark: palette.primaryDark,
  secondary: palette.secondary,
  secondaryLight: palette.secondaryLight,
  secondaryDark: palette.secondaryDark,

  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,

  tabBarBg: "#ffffffec",
  tabBarBorder: "#EFEFEF",
  tabBarActive: "#1A1A1A",
  tabBarInactive: "#ADADAD",
};

export const darkTheme: ThemeTokens = {
  background: "#0F172A",
  backgroundSecondary: "#1E293B",
  surface: "#1E293B",
  surfaceSecondary: "#263347",

  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",
  textTertiary: "#64748B",
  textInverse: "#0F172A",

  border: "#334155",
  borderStrong: "#475569",

  primary: palette.primaryLight,
  primaryLight: "#4d7080",
  primaryDark: palette.primary,
  secondary: palette.secondary,
  secondaryLight: palette.secondaryLight,
  secondaryDark: palette.secondaryDark,

  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,

  tabBarBg: "#1E293Bec",
  tabBarBorder: "#334155",
  tabBarActive: "#F8FAFC",
  tabBarInactive: "#64748B",
};

/** Border radii — edit once, applies everywhere */
export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

/** Spacing scale — edit once, applies everywhere */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;
