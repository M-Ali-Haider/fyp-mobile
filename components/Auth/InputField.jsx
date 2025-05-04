import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useState } from "react";
import EyeIcon from "../../assets/Auth/eyeicon";
import EyeSlashIcon from "../../assets/Auth/eyeslashicon";
const InputField = ({
  label,
  placeholder,
  className,
  labelStyles,
  Svg,
  handleChangeText,
  value,
  inputRef,
  type = "Text",
}) => {
  const { colorScheme } = useColorScheme();
  const [showPassword, setShowPassword] = useState(false);
  const color = colorScheme === "dark" ? "#757575" : "#A2A2A2";
  return (
    <View className={`${className}`}>
      <Text
        className={`${labelStyles} text-black dark:text-white font-inter400 text-2xl leading-[29.05px] mb-[11px]`}
      >
        {label}
      </Text>
      <View className="border border-borderLight dark:border-borderDark rounded-lg flex-row items-center px-4">
        <View className="pr-1 py-[9.5px]">
          <Svg />
        </View>
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          className="flex-1 text-base leading-[19.36px] font-inter400 text-black dark:text-white"
          placeholderTextColor={color}
          value={value}
          onChangeText={handleChangeText}
          autoCapitalize="none"
          keyboardType={type}
          secureTextEntry={type === "Password" && !showPassword}
        />
        {type === "Password" && (
          <TouchableOpacity
            className="w-[18px] h-[18px]"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon color={color} />
            ) : (
              <EyeSlashIcon color={color} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
