/**
 * app/no-internet.tsx
 * Replace this with your real offline screen.
 */
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function NoInternet() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text size="lg" bold>
        No Internet Connection
      </Text>
      <Text dim>Please check your connection and try again.</Text>
    </View>
  );
}
