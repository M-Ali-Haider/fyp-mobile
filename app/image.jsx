import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { blurhash } from "../components/Patients/images";
import { X } from "lucide-react-native";
import { ResizingButton } from "../components/Button/resizable";
import { useColorScheme } from "../hooks/useColorScheme";
import CustomBottomSheetImages from "../components/ImageScreen/bottomSheet";
import { useRef } from "react";

const ImageScreen = () => {
  const { id, url, patient_name, uploaded_at, fileName } =
    useLocalSearchParams();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const bottomSheetRef = useRef(null);

  return (
    <>
      <BlurView
        intensity={40}
        className="flex-1 items-center justify-center relative"
      >
        <View className="w-full h-full">
          <Image
            style={styles.image}
            source={url}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
          />
        </View>
        <Pressable
          onPress={() => router.back()}
          className="absolute right-0 top-[6px]
          size-12 rounded-full
          items-center justify-center"
        >
          <X color={colorScheme === "dark" ? "#ffffff" : "#000000"} size={28} />
        </Pressable>
        <ResizingButton
          onPress={() => {
            bottomSheetRef.current?.expand();
          }}
          outerClassName={"absolute bottom-12"}
        >
          <View className="bg-blueA py-2 px-10 rounded-full">
            <Text className="text-white">Details</Text>
          </View>
        </ResizingButton>
      </BlurView>
      <CustomBottomSheetImages
        bottomSheetRef={bottomSheetRef}
        title={"Details"}
        handleCancel={() => {
          bottomSheetRef.current?.close();
        }}
      >
        <View className="gap-y-2">
          <Text className="text-black dark:text-white font-inter400 text-sm leading-[16.94px]">
            <Text className="font-inter500">Patient Name:</Text> {patient_name}
          </Text>
          <Text className="text-black dark:text-white font-inter400 text-sm leading-[16.94px]">
            <Text className="font-inter500">Uploaded At:</Text> {uploaded_at}
          </Text>
          <Text className="text-black dark:text-white font-inter400 text-sm leading-[16.94px]">
            <Text className="font-inter500">File Name:</Text> {fileName}
          </Text>
        </View>
      </CustomBottomSheetImages>
    </>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    // aspectRatio: 16 / 9,
    backgroundColor: "#0553",
    borderRadius: 6,
  },
});
