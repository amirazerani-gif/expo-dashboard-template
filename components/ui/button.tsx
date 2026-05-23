/**
 * components/ui/Button.tsx
 * ─────────────────────────────────────────────────────────────
 * Variants:  solid | outline | ghost
 * Sizes:     sm | md | lg
 * Props:     loading, disabled, leftIcon, rightIcon, fullWidth
 * ─────────────────────────────────────────────────────────────
 */

import { useTheme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Text } from "./text";

type Variant = "solid" | "outline" | "ghost" | "gradient";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  loadingTitle?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  /** Only used when variant="gradient" */
  gradientColors?: [string, string, ...string[]];
}

const HEIGHT_MAP = {
  sm: verticalScale(36),
  md: verticalScale(46),
  lg: verticalScale(54),
};
const RADIUS_MAP = { sm: scale(10), md: scale(14), lg: scale(16) };
const FONT_SIZE = { sm: "sm", md: "md", lg: "lg" } as const;

export function Button({
  title,
  onPress,
  variant = "solid",
  size = "md",
  loading = false,
  loadingTitle,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
  gradientColors,
}: ButtonProps) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  const h = HEIGHT_MAP[size];
  const r = RADIUS_MAP[size];

  const baseContainer: ViewStyle = {
    height: h,
    borderRadius: r,
    overflow: "hidden",
    alignSelf: fullWidth ? "stretch" : "flex-start",
    opacity: isDisabled ? 0.5 : 1,
  };

  const innerRow: ViewStyle = {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(8),
    paddingHorizontal: scale(16),
    backgroundColor:
      variant === "solid"
        ? theme.primary
        : variant === "outline" || variant === "ghost"
          ? "transparent"
          : "transparent",
    borderWidth: variant === "outline" ? 1.5 : 0,
    borderColor: variant === "outline" ? theme.primary : "transparent",
    borderRadius: r,
  };

  const label = loading && loadingTitle ? loadingTitle : title;
  const labelColor =
    variant === "solid" || variant === "gradient"
      ? theme.textInverse
      : theme.primary;

  const content = (
    <View style={innerRow} pointerEvents="none">
      {loading ? (
        <ActivityIndicator size="small" color={labelColor} />
      ) : (
        leftIcon
      )}
      <Text
        size={FONT_SIZE[size]}
        bold
        style={{ color: labelColor, letterSpacing: 0.5 }}
      >
        {label}
      </Text>
      {!loading && rightIcon}
    </View>
  );

  if (variant === "gradient") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={({ pressed }) => [
          baseContainer,
          { opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1 },
          style,
        ]}
      >
        <LinearGradient
          colors={gradientColors ?? [theme.primary, theme.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
        {content}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        baseContainer,
        { opacity: isDisabled ? 0.5 : pressed ? 0.75 : 1 },
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}
