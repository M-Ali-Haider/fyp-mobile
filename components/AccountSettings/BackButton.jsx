import { router } from "expo-router";
import { View } from "react-native";
import ChevronLeftIcon from "../../assets/AccountSettings/chevronlefticon";
import { useColorScheme } from "../../hooks/useColorScheme";
import { ResizingButton } from "../Button/resizable";

const BackButton = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="w-full flex flex-row items-center px-6 py-4">
      <ResizingButton
        scale={0.85}
        onPress={() => router.back()}
        className="h-9 w-9 flex items-center justify-center rounded-lg 
        border border-borderLight dark:border-borderDark bg-secondaryLight dark:bg-secondaryDark"
      >
        <ChevronLeftIcon color={colorScheme === "dark" ? "white" : "black"} />
      </ResizingButton>
    </View>
  );
};

export default BackButton;
