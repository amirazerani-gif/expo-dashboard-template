import { appFonts } from "@/lib/fonts";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useFonts } from "expo-font";
import { useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";

if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

NetInfo.configure({
  reachabilityUrl: "https://clients3.google.com/generate_204",
  reachabilityTest: async (r) => r.status === 204,
  reachabilityRequestTimeout: 15_000,
  reachabilityShortTimeout: 5_000,
  reachabilityLongTimeout: 60_000,
});

export { ErrorBoundary } from "expo-router";
export const unstable_settings = { initialRouteName: "(tabs)" };

SplashScreen.preventAutoHideAsync();

// ─── Root ─────────────────────────────────────────────────────
export default function RootLayout() {
  const [loaded, error] = useFonts(appFonts);

  useEffect(() => {
    if (error) throw error;
  }, [error]);
  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  return <RootLayoutNav />;
}

// ─── Connectivity guard ───────────────────────────────────────
function useConnectivityGuard() {
  const router = useRouter();
  const segments = useSegments();
  const lastOnlineRoute = useRef<string>("/");

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      if (state.isConnected === null || state.isInternetReachable === null)
        return;

      const isOffline =
        state.isConnected === false || state.isInternetReachable === false;
      const onNoInternet = segments.join("/").includes("no-internet");

      if (isOffline && !onNoInternet) {
        lastOnlineRoute.current = "/" + segments.join("/");
        router.replace("/no-internet");
      }
      if (!isOffline && onNoInternet) {
        router.replace(lastOnlineRoute.current as any);
      }
    });
  }, [segments]);
}

// ─── Nav tree ─────────────────────────────────────────────────
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  useConnectivityGuard();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: "horizontal",
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen
              name="no-internet"
              options={{
                headerShown: false,
                gestureEnabled: false,
                animation: "fade",
              }}
            />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
