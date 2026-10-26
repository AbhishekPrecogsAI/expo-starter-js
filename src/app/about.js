import { Text, View } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/Screen";
import Button from "@/components/Button";

export default function AboutScreen() {
  return (
    <Screen>
      <View className="flex-1 justify-center gap-4">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">
          About
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
          This screen lives at src/app/about.js, so its route is /about.
        </Text>
        <Button title="Back" variant="outline" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
