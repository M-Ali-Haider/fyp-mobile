import { View, Text } from "react-native";

const Heading = ({ title, className }) => {
  return (
    <Text
      className={`${className} text-black dark:text-white text-2xl font-inter500 leading-[29.05px] `}
    >
      {title}
    </Text>
  );
};

export default Heading;
