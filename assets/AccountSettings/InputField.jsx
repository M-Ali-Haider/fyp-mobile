import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import EyeIcon from "../../assets/Auth/eyeicon";
import EyeSlashIcon from "../../assets/Auth/eyeslashicon";
import { useColorScheme } from "../../hooks/useColorScheme";

const InputField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  type,
  labelStyles = "font-inter500",
}) => {
  const { colorScheme } = useColorScheme();
  const [showPassword, setShowPassword] = useState(false);
  const color = colorScheme === "dark" ? "#757575" : "#A2A2A2";
  return (
    <View className={` ${otherStyles}`}>
      <Text
        className={`text-black dark:text-white mb-2 text-sm leading-[16.94px] ${labelStyles}`}
      >
        {title}
      </Text>
      <View
        className={`bg-secondaryLight dark:bg-secondaryDark 
        border border-borderLight dark:border-borderDark
        w-full h-[45px] flex flex-row items-center 
        rounded-lg px-[14px]`}
      >
        <TextInput
          className="flex-1 text-sm font-inter400 text-black dark:text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={color}
          onChangeText={handleChangeText}
          secureTextEntry={type === "Password" && !showPassword}
          keyboardType={type}
          autoCapitalize="none"
        />
        {type === "Password" && (
          <TouchableOpacity
            className="w-[18px] h-[18px]"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon color={"#C7C9D9"} />
            ) : (
              <EyeSlashIcon color={"#C7C9D9"} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
