import { Tabs } from "expo-router";
import { router, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useRef, useState, ComponentProps } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ACTIVE_COLOR = "#1A1A1A";
const INACTIVE_COLOR = "#ADADAD";
const CENTER_COLOR = "#1A1A1A";

// Derive props type directly from expo-router's Tabs — no version mismatch possible
type ExpoTabBarProps =
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]> extends (
    props: infer P,
  ) => any
    ? P
    : never;

export interface ExtraTab {
  href: string;
  icon: (color: string) => React.ReactNode;
  position: "left" | "right";
  title: string;
}

interface AppTabBarProps extends ExpoTabBarProps {
  extraTabs?: ExtraTab[];
}

export function AppTabBar({
  state,
  navigation,
  descriptors,
  extraTabs = [],
}: AppTabBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isExpandedRef = useRef(false);

  const expandAnim = useRef(new Animated.Value(0)).current;
  const catBounce = useRef(new Animated.Value(1)).current;
  const pulse1 = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(400),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const toggleMenu = useCallback(
    (forceExpand?: boolean) => {
      const next = forceExpand !== undefined ? forceExpand : !isExpanded;
      isExpandedRef.current = next;
      setIsExpanded(next);
      Animated.spring(expandAnim, {
        toValue: next ? 1 : 0,
        friction: 8,
        tension: 40,
        useNativeDriver: false,
      }).start();
    },
    [isExpanded],
  );

  const handleCentrePress = useCallback(() => {
    Animated.sequence([
      Animated.spring(catBounce, {
        toValue: 0.85,
        useNativeDriver: true,
        speed: 60,
        bounciness: 0,
      }),
      Animated.spring(catBounce, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 12,
      }),
    ]).start();
    toggleMenu();
  }, [toggleMenu]);

  const visibleRoutes = state.routes.filter(
    (route: any) => descriptors[route.key]?.options?.tabBarIcon,
  );

  const leftExtras = extraTabs.filter((t) => t.position === "left");
  const rightExtras = extraTabs.filter((t) => t.position === "right");
  const totalSlots = visibleRoutes.length + extraTabs.length;
  const half = Math.floor(totalSlots / 2);
  const leftRouteCount = half - leftExtras.length;
  const leftRoutes = visibleRoutes.slice(0, leftRouteCount);
  const rightRoutes = visibleRoutes.slice(leftRouteCount);

  const renderExtraTab = useCallback(
    (tab: ExtraTab) => {
      const isFocused = pathname.startsWith(tab.href);
      return (
        <Pressable
          key={tab.href}
          onPress={() => {
            if (isExpandedRef.current) toggleMenu(false);
            router.push(tab.href as any);
          }}
          style={s.tabButton}
        >
          <View style={s.tabInner}>
            <View style={s.iconWrap}>
              {tab.icon(isFocused ? ACTIVE_COLOR : INACTIVE_COLOR)}
            </View>
            <Text style={s.tabLabel}>{tab.title}</Text>
          </View>
        </Pressable>
      );
    },
    [pathname, toggleMenu],
  );

  const renderRoute = useCallback(
    (route: any) => {
      const { options } = descriptors[route.key];
      const realIndex = state.routes.indexOf(route);
      const isFocused = state.index === realIndex;

      return (
        <Pressable
          key={route.key}
          onPress={() => {
            if (isExpandedRef.current) toggleMenu(false);
            navigation.navigate(route.name);
          }}
          style={s.tabButton}
        >
          <View style={s.tabInner}>
            <View style={s.iconWrap}>
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR,
                size: 22,
              })}
            </View>
            <Text
              style={[
                s.tabLabel,
                { color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR },
              ]}
            >
              {options.title}
            </Text>
          </View>
        </Pressable>
      );
    },
    [state.index, state.routes, descriptors, toggleMenu, navigation],
  );

  const expandHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 450],
  });
  const iconRotate = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  const pulseOpacity = pulse1.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0, 0.35, 0],
  });
  const pulseScale = pulse1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={s.container}
      pointerEvents="box-none"
    >
      <Animated.View style={[s.mainWrapper, { height: expandHeight }]}>
        {/* ── Drop your drawer component here ─────────────────────
            <YourDrawerContent expandAnim={expandAnim} />
        ──────────────────────────────────────────────────────── */}

        <View style={s.tabContainer}>
          {leftRoutes.map(renderRoute)}
          {leftExtras.map(renderExtraTab)}

          <View style={s.centreBtnWrapper}>
            <Animated.View
              style={[
                s.pulseRing,
                { opacity: pulseOpacity, transform: [{ scale: pulseScale }] },
              ]}
            />
            <Animated.View style={{ transform: [{ scale: catBounce }] }}>
              <Pressable onPress={handleCentrePress} style={s.centreBtn}>
                <Animated.View style={{ transform: [{ rotate: iconRotate }] }}>
                  <Ionicons name ="grid-outline" color="white" size={18} strokeWidth={2.5} />
                </Animated.View>
              </Pressable>
            </Animated.View>
          </View>

          {rightRoutes.map(renderRoute)}
          {rightExtras.map(renderExtraTab)}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 14,
    right: 14,
    zIndex: 100,
  },
  mainWrapper: {
    backgroundColor: "#ffffffec",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    overflow: "hidden",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 10,
  },
  tabContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#F3F3F3",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  tabInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 9,
    color: INACTIVE_COLOR,
  },
  iconWrap: {
    width: 40,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  centreBtnWrapper: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  pulseRing: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CENTER_COLOR,
  },
  centreBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CENTER_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
});
