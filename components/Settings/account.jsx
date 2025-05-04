import { Text, TouchableHighlight, View } from "react-native";
import ArrowSVG from "../../assets/Settings/arrow";
import { Link } from "expo-router";

const AccountSettings = () => {
  return (
    <View
      className="border border-white dark:border-borderDark bg-secondaryLight dark:bg-secondaryDark 
         rounded-lg"
    >
      <Option title={"Change Username"} href="/change-username" />
      <Option title={"Change Password"} href="/change-password" />
    </View>
  );
};

export default AccountSettings;

const Option = ({ title, href }) => {
  return (
    <Link href={href}>
      <View className="w-full flex-row p-4 justify-between items-center">
        <Text className="text-black dark:text-white font-inter400 text-base leading-[19.36px]">
          {title}
        </Text>
        <ArrowSVG />
      </View>
    </Link>
  );
};
