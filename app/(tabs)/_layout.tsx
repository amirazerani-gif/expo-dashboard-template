import { AppTabBar } from "@/components/navigation/tabbar";
import { Tabs } from "expo-router";
import { Home, Hash } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <AppTabBar
          {...props}
        />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Two",
          tabBarIcon: ({ color }) => <Hash size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
