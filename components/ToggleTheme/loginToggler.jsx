import { Pressable, View } from "react-native";
import DarkModeSVG from "../../assets/Auth/darkmode";
import LightModeSVG from "../../assets/Auth/lightmode";
import { useColorScheme } from "../../hooks/useColorScheme";

const LoginToggler = ({ className }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className={`${className} items-end px-4`}>
      <Pressable
        onPress={toggleColorScheme}
        className="w-14 bg-[#E2E2E2] dark:bg-[#2F3E50] rounded-full"
      >
        <View
          className={`${
            colorScheme === "dark" ? "items-end" : "items-start"
          } p-[2px] justify-center`}
        >
          {colorScheme === "dark" ? <DarkModeSVG /> : <LightModeSVG />}
        </View>
      </Pressable>
    </View>
  );
};

export default LoginToggler;
