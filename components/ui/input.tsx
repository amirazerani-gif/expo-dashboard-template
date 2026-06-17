import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
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
  iconName?: string;
  rightElement?: React.ReactNode;
  showPasswordToggle?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  iconName,
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
        {iconName && (
          <Ionicons
            name={iconName as any}
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
            <Ionicons
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={moderateScale(18)}
              color={theme.textTertiary}
            />
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

interface TextAreaProps extends Omit<InputProps, "showPasswordToggle"> {
  numberOfLines?: number;
}

export function TextArea({
  numberOfLines = 4,
  containerStyle,
  style,
  label,
  error,
  iconName,
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
        {iconName && (
          <Ionicons
            name={iconName as any}
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
  field: { flexDirection: "row", alignItems: "center", borderWidth: 1 },
  input: { flex: 1 },
});
