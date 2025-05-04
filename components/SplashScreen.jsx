import { ScrollView, StatusBar, Text, View } from "react-native";
import Animated, { SlideOutLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "../hooks/useColorScheme";
export default function CustomSplashScreen() {
  const { colorScheme } = useColorScheme();
  return (
    <Animated.View exiting={SlideOutLeft}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#0E1828" : "#E3EEFF"}
      />
      <SafeAreaView className={`h-full bg-bgLight dark:bg-bgDark`}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full h-full justify-center items-center px-5">
            <Text className="text-white text-xs leading-[14.52px] ml-[3.5px] font-inter400">
              Getting Ready...
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
