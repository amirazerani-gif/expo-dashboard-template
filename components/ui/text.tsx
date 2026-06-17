/**
 * components/ui/Text.tsx
 */

import { useTheme } from "@/theme";
import React from "react";
import type { TextProps as RNTextProps } from "react-native";
import { Text as RNText, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const SIZE_MAP = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

const LINE_HEIGHT_MULTIPLIER = 1.45;

type SizeKey = keyof typeof SIZE_MAP;

interface TextProps extends RNTextProps {
  size?: SizeKey;
  bold?: boolean;
  medium?: boolean;
  dim?: boolean;
  inverse?: boolean;
}

export const Text = React.forwardRef<RNText, TextProps>(
  ({ size, bold, medium, dim, inverse, style, ...props }, ref) => {
    const { theme } = useTheme();

    const flat = StyleSheet.flatten(style) ?? {};

    const baseSize = SIZE_MAP[size ?? "md"];
    const scaled = moderateScale(baseSize, 0.3);

    // Resolve font size — inline style wins over size prop
    const resolvedFontSize: number =
      typeof flat.fontSize === "number" ? flat.fontSize : scaled;

    // Line height tracks resolved font size unless explicitly overridden
    const resolvedLineHeight: number =
      typeof flat.lineHeight === "number"
        ? flat.lineHeight
        : Math.round(resolvedFontSize * LINE_HEIGHT_MULTIPLIER);

    const color = inverse
      ? theme.textInverse
      : dim
        ? theme.textSecondary
        : theme.textPrimary;

    // fontFamily comes entirely from style — never hardcoded here
    const resolvedStyle = {
      color: typeof flat.color === "string" ? flat.color : color,
      ...flat,
      // Stamp last so flat never overwrites the computed values
      fontSize: resolvedFontSize,
      lineHeight: resolvedLineHeight,
    };

    return (
      <RNText
        ref={ref}
        allowFontScaling={false}
        style={resolvedStyle}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";
