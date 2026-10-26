import { View } from "react-native";

export default function Card({ children, className = "" }) {
  return (
    <View
      className={`rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {children}
    </View>
  );
}
