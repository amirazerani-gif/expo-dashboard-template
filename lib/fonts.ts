/**
 * lib/fonts.ts
 * ─────────────────────────────────────────────────────────────
 * All fonts loaded via useFonts() in the root layout.
 * Import from @expo-google-fonts — no .ttf files needed.
 *
 * Install: npx expo install @expo-google-fonts/poppins
 * ─────────────────────────────────────────────────────────────
 */

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export const appFonts = {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} as const;
