import { Text, View } from "react-native";
import { Link } from "expo-router";

import Screen from "@/components/Screen";

export default function NotFoundScreen() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center gap-3">
        <Text className="text-xl font-semibold text-gray-900 dark:text-white">
          Page not found
        </Text>
        <Link href="/" className="text-primary">
          Go home
        </Link>
      </View>
    </Screen>
  );
}
