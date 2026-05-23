/**
 * components/ui/Input.tsx
 * ─────────────────────────────────────────────────────────────
 * Input   — single line
 * TextArea — multiline (same API)
 *
 * Props:
 *   label, error, icon (lucide), rightElement,
 *   showPasswordToggle — show the eye/eye-off button (opt-in)
 *   disabled, containerStyle
 * ─────────────────────────────────────────────────────────────
 */

import { useTheme } from "@/theme";
import { Eye, EyeOff, LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Text } from "./text";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  /** Lucide icon component e.g. icon={Mail} */
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
  /** Renders the eye / eye-off toggle — use with secureTextEntry */
  showPasswordToggle?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  icon: Icon,
  rightElement,
  showPasswordToggle = false,
  disabled = false,
  containerStyle,
  style,
  secureTextEntry,
  ...props
}: InputProps) {
  const { theme, radius } = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const borderColor = error
    ? theme.error
    : focused
      ? theme.primary
      : theme.border;

  const isSecure = showPasswordToggle ? hidePassword : secureTextEntry;

  return (
    <View style={[{ gap: verticalScale(6) }, containerStyle]}>
      {label && (
        <Text
          size="xs"
          bold
          style={{ color: theme.textSecondary, letterSpacing: 1.2 }}
        >
          {label.toUpperCase()}
        </Text>
      )}

      <View
        style={[
          s.field,
          {
            height: verticalScale(48),
            borderRadius: radius.md,
            borderColor,
            backgroundColor: disabled
              ? theme.backgroundSecondary
              : theme.surface,
            paddingHorizontal: scale(14),
          },
        ]}
      >
        {Icon && (
          <Icon
            size={moderateScale(18)}
            color={theme.textTertiary}
            style={{ marginRight: scale(8) }}
          />
        )}

        <TextInput
          {...props}
          editable={!disabled}
          multiline={false}
          numberOfLines={1}
          secureTextEntry={isSecure}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          placeholderTextColor={theme.textTertiary}
          style={[
            s.input,
            {
              color: theme.textPrimary,
              fontSize: moderateScale(14),
              height: verticalScale(48),
              paddingVertical: 0,
            },
            style,
          ]}
        />

        {showPasswordToggle && (
          <Pressable onPress={() => setHidePassword((p) => !p)} hitSlop={8}>
            {hidePassword ? (
              <EyeOff size={moderateScale(18)} color={theme.textTertiary} />
            ) : (
              <Eye size={moderateScale(18)} color={theme.textTertiary} />
            )}
          </Pressable>
        )}

        {!showPasswordToggle && rightElement}
      </View>

      {error && (
        <Text size="xs" style={{ color: theme.error }}>
          {error}
        </Text>
      )}
    </View>
  );
}

// ─── TextArea ─────────────────────────────────────────────────────────────────

interface TextAreaProps extends Omit<InputProps, "showPasswordToggle"> {
  numberOfLines?: number;
}

export function TextArea({
  numberOfLines = 4,
  containerStyle,
  style,
  label,
  error,
  icon: Icon,
  disabled = false,
  ...props
}: TextAreaProps) {
  const { theme, radius } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? theme.error
    : focused
      ? theme.primary
      : theme.border;

  return (
    <View style={[{ gap: verticalScale(6) }, containerStyle]}>
      {label && (
        <Text
          size="xs"
          bold
          style={{ color: theme.textSecondary, letterSpacing: 1.2 }}
        >
          {label.toUpperCase()}
        </Text>
      )}

      <View
        style={[
          s.field,
          {
            height: verticalScale(numberOfLines * 28),
            borderRadius: radius.md,
            borderColor,
            backgroundColor: disabled
              ? theme.backgroundSecondary
              : theme.surface,
            paddingHorizontal: scale(14),
            paddingVertical: verticalScale(10),
            alignItems: "flex-start",
          },
        ]}
      >
        {Icon && (
          <Icon
            size={moderateScale(18)}
            color={theme.textTertiary}
            style={{ marginRight: scale(8), marginTop: 2 }}
          />
        )}

        <TextInput
          {...props}
          editable={!disabled}
          multiline
          numberOfLines={numberOfLines}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          placeholderTextColor={theme.textTertiary}
          textAlignVertical="top"
          style={[
            s.input,
            {
              color: theme.textPrimary,
              fontSize: moderateScale(14),
              flex: 1,
            },
            style,
          ]}
        />
      </View>

      {error && (
        <Text size="xs" style={{ color: theme.error }}>
          {error}
        </Text>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  input: {
    flex: 1,
  },
});
