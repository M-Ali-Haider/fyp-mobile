import { View, Text, Pressable } from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";

const SettingsToggleTheme = () => {
  const { toggleColorScheme, colorScheme } = useColorScheme();
  return (
    <View
      className="border border-white dark:border-borderDark bg-secondaryLight dark:bg-secondaryDark 
        flex-row p-4 justify-between items-center rounded-lg"
    >
      <Text className="text-black dark:text-white font-inter400 text-base leading-[19.36px]">
        Dark Mode
      </Text>
      <Pressable
        onPress={toggleColorScheme}
        className={`${
          colorScheme === "dark" ? "items-end" : "items-start"
        } w-[51px] h-[32px] px-[3px] bg-blueA rounded-full justify-center`}
      >
        <View className="w-[27px] h-[27px] rounded-full bg-white" />
      </Pressable>
    </View>
  );
};

export default SettingsToggleTheme;
