import { View, Text } from "react-native";

const TabIcon = ({ Svg, color, name, focused, width }) => {
  return (
    <View
      style={{ width: width, height: 43.5 }}
      className={`${
        focused && "bg-blueA dark:bg-[#2F3E504D]"
      } rounded-lg items-center justify-center flex-row mt-[10px]`}
    >
      <Svg fill={color} />
      <Text
        className={`ml-2 text-xs leading-[14.52px] font-inter500`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
