import { Text, View } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/Screen";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { APP_NAME } from "@/constants/app";

export default function HomeScreen() {
  return (
    <Screen>
      <View className="flex-1 justify-center gap-6">
        <View className="gap-2">
          <Text className="text-4xl font-bold text-gray-900 dark:text-white">
            {APP_NAME}
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400">
            Expo + Expo Router + NativeWind (Tailwind) in plain JavaScript.
          </Text>
        </View>

        <Card>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            Start building
          </Text>
          <Text className="mt-1 text-gray-500 dark:text-gray-400">
            Add screens in src/app and shared UI in src/components.
          </Text>
        </Card>

        <Button title="Go to About" onPress={() => router.push("/about")} />
      </View>
    </Screen>
  );
}
