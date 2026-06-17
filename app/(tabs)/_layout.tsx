import { AppTabBar } from "@/components/navigation/tabbar";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Two",
          tabBarIcon: ({ color }) => <Ionicons name="arrow-back-circle" size={22} color={color}/>,
        }}
      />
    </Tabs>
  );
}
