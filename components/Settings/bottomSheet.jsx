import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useColorScheme } from "../../hooks/useColorScheme";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useMemo } from "react";

const CustomBottomSheet = ({
  bottomSheetRef,
  handleCancel,
  handleButtonPress,
  title,
  desc,
  buttonText,
  isLoading = false,
}) => {
  const { colorScheme } = useColorScheme();
  const snapPoints = useMemo(() => [225], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  return (
    <BottomSheet
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
      }}
      handleIndicatorStyle={{
        backgroundColor: colorScheme === "dark" ? "#fff" : "#000",
      }}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text className="text-black dark:text-white font-inter600 text-xl leading-[24.2px] mb-[10px]">
          {title}
        </Text>
        <Text className="text-black dark:text-white font-inter400 text-sm leading-[16.94px]">
          {desc}
        </Text>
        <View className="flex-row mt-10">
          <TouchableOpacity
            onPress={handleCancel}
            className="flex-1 bg-borderDark rounded-[10px]"
          >
            <Text className="text-white font-inter500 text-sm leading-[16.94px] text-center py-[14px]">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleButtonPress}
            className="flex-1 ml-[15px] bg-redError rounded-[10px] justify-center items-center"
          >
            <Text className="text-white font-inter500 text-sm leading-[16.94px] text-center py-[14px]">
              {isLoading ? (
                <ActivityIndicator color={"#fff"} size={"small"} />
              ) : (
                buttonText
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
