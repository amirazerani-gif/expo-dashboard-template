/**
 * components/ui/SectionCard.tsx
 * ─────────────────────────────────────────────────────────────
 * Flexible card component.
 *
 * Props:
 *   bg           — solid color string  (default: theme.surface)
 *   gradient     — [string, string, ...string[]]  (overrides bg)
 *   gradientStart/End — LinearGradient direction
 *   borderRadius — number (default: theme radius.lg)
 *   padding      — number (default: theme spacing.md)
 *   withCircles  — show decorative blurred circles
 *   circleColor  — color of the decorative circles
 *   borderColor  — adds a visible border
 *   style        — extra ViewStyle overrides
 * ─────────────────────────────────────────────────────────────
 *
 * Usage:
 *   <SectionCard gradient={["#FF6B6B","#FF8E53"]}>...</SectionCard>
 *   <SectionCard withCircles circleColor="rgba(255,255,255,0.15)">
 *   <SectionCard bg={theme.surface} borderColor={theme.border}>
 */

import { useTheme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface SectionCardProps {
  children: React.ReactNode;
  bg?: string;
  gradient?: [string, string, ...string[]];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  borderRadius?: number;
  padding?: number;
  withCircles?: boolean;
  circleColor?: string;
  borderColor?: string;
  style?: ViewStyle;
}

export function SectionCard({
  children,
  bg,
  gradient,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  borderRadius,
  padding,
  withCircles = false,
  circleColor = "rgba(255,255,255,0.12)",
  borderColor,
  style,
}: SectionCardProps) {
  const { theme, radius, spacing } = useTheme();

  const br = borderRadius ?? radius.lg;
  const p = padding ?? spacing.md;
  const bg_ = bg ?? theme.surface;

  const cardStyle: ViewStyle = {
    borderRadius: br,
    padding: p,
    overflow: "hidden",
    borderWidth: borderColor ? 1 : 0,
    borderColor: borderColor ?? "transparent",
    backgroundColor: gradient ? "transparent" : bg_,
    ...style,
  };

  const inner = (
    <>
      {withCircles && (
        <>
          <View
            style={[
              s.circle,
              s.circleTop,
              { backgroundColor: circleColor, borderRadius: 9999 },
            ]}
            pointerEvents="none"
          />
          <View
            style={[
              s.circle,
              s.circleBottom,
              { backgroundColor: circleColor, borderRadius: 9999 },
            ]}
            pointerEvents="none"
          />
        </>
      )}
      {children}
    </>
  );

  if (gradient) {
    return (
      <LinearGradient
        colors={gradient}
        start={gradientStart}
        end={gradientEnd}
        style={cardStyle}
      >
        {inner}
      </LinearGradient>
    );
  }

  return <View style={cardStyle}>{inner}</View>;
}

const s = StyleSheet.create({
  circle: {
    position: "absolute",
    width: 160,
    height: 160,
  },
  circleTop: {
    top: -50,
    right: -40,
  },
  circleBottom: {
    bottom: -60,
    left: -40,
  },
});
