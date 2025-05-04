import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";
import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";

const CustomBottomSheetImages = ({
  bottomSheetRef,
  handleCancel,
  title,
  children,
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
        <Pressable
          onPress={handleCancel}
          className="size-12 absolute right-0 top-0"
        >
          <X color={colorScheme === "dark" ? "#fff" : "#000"} />
        </Pressable>
        <Text className="text-black dark:text-white font-inter600 text-xl leading-[24.2px] mb-[10px]">
          {title}
        </Text>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CustomBottomSheetImages;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
});
