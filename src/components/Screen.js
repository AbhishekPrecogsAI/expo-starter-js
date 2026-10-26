import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ children, className = "" }) {
  return (
    <SafeAreaView className={`flex-1 bg-white px-5 dark:bg-gray-950 ${className}`}>
      {children}
    </SafeAreaView>
  );
}
