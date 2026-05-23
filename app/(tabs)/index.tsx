import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/theme";
import { Mail, Lock, Search } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

export default function ShowcaseScreen() {
  const { theme, isDark, radius, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const simulateLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingHorizontal: spacing.md,
        paddingTop: insets.top + spacing.md,
        paddingBottom: insets.bottom + verticalScale(100),
        gap: spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header — Poppins ─────────────────────────────────── */}
      <View style={{ gap: spacing.xs }}>
        <Text size="xxl" style={{ fontFamily: "Poppins_700Bold" }}>
          Component Kit
        </Text>
        <Text size="sm" dim style={{ fontFamily: "Poppins_400Regular" }}>
          All UI primitives — {isDark ? "Dark" : "Light"} mode
        </Text>
      </View>

      {/* ── Theme toggle ─────────────────────────────────────── */}
      <SectionCard borderColor={theme.border}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 2 }}>
            <Text medium style={{ fontFamily: "Poppins_600SemiBold" }}>
              Dark Mode
            </Text>
            <Text size="xs" dim style={{ fontFamily: "Poppins_400Regular" }}>
              Follows system setting
            </Text>
          </View>
          <Switch
            value={isDark}
            disabled
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor={theme.surface}
          />
        </View>
      </SectionCard>

      {/* ── Typography ───────────────────────────────────────── */}
      <View style={{ gap: spacing.xs }}>
        <Text
          size="xs"
          dim
          style={{ letterSpacing: 1, fontFamily: "Poppins_400Regular" }}
        >
          TYPOGRAPHY
        </Text>
        <SectionCard
          borderColor={theme.border}
          style={{ gap: verticalScale(6) }}
        >
          {/* With font family */}
          <Text size="xxl" style={{ fontFamily: "Poppins_700Bold" }}>
            Heading XXL — Poppins Bold
          </Text>
          <Text size="xl" style={{ fontFamily: "Poppins_600SemiBold" }}>
            Heading XL — Poppins SemiBold
          </Text>
          <Text size="lg" style={{ fontFamily: "Poppins_500Medium" }}>
            Heading LG — Poppins Medium
          </Text>
          {/* No font family — system default */}
          <Text size="md">Body MD — system default</Text>
          <Text size="sm" dim>
            Caption SM — system default
          </Text>
          <Text
            size="sm"
            inverse
            style={{
              fontFamily: "Poppins_600SemiBold",
              backgroundColor: theme.primary,
              paddingHorizontal: scale(8),
              paddingVertical: 4,
              borderRadius: radius.sm,
              alignSelf: "flex-start",
            }}
          >
            Inverse on primary
          </Text>
        </SectionCard>
      </View>

      {/* ── Buttons ──────────────────────────────────────────── */}
      <View style={{ gap: spacing.xs }}>
        <Text
          size="xs"
          dim
          style={{ letterSpacing: 1, fontFamily: "Poppins_400Regular" }}
        >
          BUTTONS
        </Text>
        <SectionCard
          borderColor={theme.border}
          style={{ gap: verticalScale(10) }}
        >
          <Button title="Solid (default)" onPress={() => {}} />
          <Button title="Outline" variant="outline" onPress={() => {}} />
          <Button title="Ghost" variant="ghost" onPress={() => {}} />
          <Button title="Gradient" variant="gradient" onPress={() => {}} />
          <Button
            title="Loading…"
            loading={loading}
            onPress={simulateLoad}
            loadingTitle="Please wait…"
          />
          <Button title="Disabled" disabled onPress={() => {}} />
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button title="SM" size="sm" fullWidth={false} onPress={() => {}} />
            <Button title="MD" size="md" fullWidth={false} onPress={() => {}} />
            <Button title="LG" size="lg" fullWidth={false} onPress={() => {}} />
          </View>
        </SectionCard>
      </View>

      {/* ── Inputs ───────────────────────────────────────────── */}
      <View style={{ gap: spacing.xs }}>
        <Text
          size="xs"
          dim
          style={{ letterSpacing: 1, fontFamily: "Poppins_400Regular" }}
        >
          INPUTS
        </Text>
        <SectionCard
          borderColor={theme.border}
          style={{ gap: verticalScale(12) }}
        >
          <Input
            label="Email"
            placeholder="name@example.com"
            icon={Mail}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="Your password"
            icon={Lock}
            showPasswordToggle
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            label="Search"
            placeholder="Search anything…"
            icon={Search}
            value=""
            onChangeText={() => {}}
          />
          <Input
            label="With error"
            placeholder="Something went wrong"
            value=""
            onChangeText={() => {}}
            error="This field is required"
          />
          <Input
            label="Disabled"
            placeholder="Can't touch this"
            value="Locked value"
            onChangeText={() => {}}
            disabled
          />
          <TextArea
            label="Notes"
            placeholder="Write something…"
            value={note}
            onChangeText={setNote}
            numberOfLines={4}
          />
        </SectionCard>
      </View>

      {/* ── SectionCard variants ─────────────────────────────── */}
      <View style={{ gap: spacing.xs }}>
        <Text
          size="xs"
          dim
          style={{ letterSpacing: 1, fontFamily: "Poppins_400Regular" }}
        >
          SECTION CARDS
        </Text>

        <SectionCard borderColor={theme.border}>
          {/* no font family */}
          <Text medium>Default surface card</Text>
          <Text size="sm" dim>
            Uses theme.surface + optional border
          </Text>
        </SectionCard>

        <SectionCard gradient={[theme.primary, theme.primaryDark]} withCircles>
          <Text inverse style={{ fontFamily: "Poppins_600SemiBold" }}>
            Gradient card
          </Text>
          <Text
            size="sm"
            inverse
            style={{ opacity: 0.75, fontFamily: "Poppins_400Regular" }}
          >
            With decorative circles
          </Text>
        </SectionCard>

        <SectionCard
          gradient={["#E5C37E", "#C6A664"]}
          gradientStart={{ x: 0, y: 0 }}
          gradientEnd={{ x: 1, y: 1 }}
        >
          {/* no font family */}
          <Text medium>Custom gradient</Text>
          <Text size="sm" style={{ opacity: 0.8 }}>
            Any two+ colors
          </Text>
        </SectionCard>

        <SectionCard
          bg={theme.backgroundSecondary}
          borderColor={theme.borderStrong}
        >
          {/* no font family */}
          <Text medium>Custom bg + strong border</Text>
          <Text size="sm" dim>
            bg and borderColor props
          </Text>
        </SectionCard>

        <SectionCard
          gradient={[theme.primary, theme.primaryDark]}
          withCircles
          circleColor="rgba(255,255,255,0.08)"
          padding={spacing.xl}
        >
          <Text size="lg" inverse style={{ fontFamily: "Poppins_700Bold" }}>
            Stat Card
          </Text>
          <Text size="xxl" inverse style={{ fontFamily: "Poppins_700Bold" }}>
            $24,500
          </Text>
          <Text
            size="sm"
            inverse
            style={{ opacity: 0.7, fontFamily: "Poppins_400Regular" }}
          >
            ▲ 12% vs last month
          </Text>
        </SectionCard>
      </View>
    </ScrollView>
  );
}
