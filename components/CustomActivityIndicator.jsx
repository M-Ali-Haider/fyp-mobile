import { ActivityIndicator } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";

const CustomActivityIndicator = () => {
  const { colorScheme } = useColorScheme();
  return (
    <ActivityIndicator color={colorScheme === "dark" ? "#ffffff" : "#000000"} />
  );
};

export default CustomActivityIndicator;
