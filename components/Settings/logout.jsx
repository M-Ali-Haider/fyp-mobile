import { Pressable, Text } from "react-native";
import LogoutSVG from "../../assets/Settings/logout";
import { useBottomSheet } from "../../context/LogoutBottomSheetContext";
import { ResizingButton } from "../Button/resizable";

const Logout = () => {
  const { openBottomSheet } = useBottomSheet();
  return (
    <ResizingButton
      onPress={openBottomSheet}
      className="border border-white dark:border-borderDark bg-secondaryLight dark:bg-secondaryDark 
      flex-row p-4 justify-between items-center rounded-lg"
    >
      <Text className="text-black dark:text-white font-inter400 text-base leading-[19.36px]">
        Log Out
      </Text>
      <LogoutSVG />
    </ResizingButton>
  );
};

export default Logout;
