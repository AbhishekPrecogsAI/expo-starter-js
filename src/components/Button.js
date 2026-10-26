import { Pressable, Text } from "react-native";

const variants = {
  primary: {
    container: "bg-primary active:bg-primary-dark",
    text: "text-white",
  },
  outline: {
    container: "border border-primary bg-transparent active:bg-primary/10",
    text: "text-primary",
  },
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  className = "",
}) {
  const styles = variants[variant] ?? variants.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center rounded-xl px-5 py-3.5 ${styles.container} ${
        disabled ? "opacity-50" : ""
      } ${className}`}
    >
      <Text className={`text-base font-semibold ${styles.text}`}>{title}</Text>
    </Pressable>
  );
}
