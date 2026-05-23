/**
 * components/ui/Text.tsx
 */

import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, Text as RNText } from "react-native";
import type { TextProps as RNTextProps } from "react-native";
import { moderateScale } from "react-native-size-matters";

const SIZE_MAP = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

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

    const color = inverse
      ? theme.textInverse
      : dim
        ? theme.textSecondary
        : theme.textPrimary;

    const resolvedStyle = {
      fontSize: flat.fontSize ?? scaled,
      lineHeight: flat.lineHeight ?? Math.round(scaled * 1.4),
      color: flat.color ?? color,
      // fontFamily comes entirely from style — never hardcoded here
      ...flat,
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
