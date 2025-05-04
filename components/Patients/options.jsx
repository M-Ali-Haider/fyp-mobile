import * as SMS from "expo-sms";
import { Image, Linking, Text, View } from "react-native";
import { toast } from "sonner-native";
import src from "../../assets/patient1.png";
import CallSVG from "../../assets/Patients/call";
import MessageSVG from "../../assets/Patients/message";
import { ResizingButton } from "../Button/resizable";

const PatientOptions = ({ name, id, phone }) => {
  const checkSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      Linking.openURL(`sms:${phone}`);
    } else {
      toast.error("SMS's are not availble in this device");
    }
  };

  return (
    <View className="p-4 border border-white dark:border-borderDark bg-white dark:bg-secondaryDark rounded-md">
      <View className="flex-row">
        <Image source={src} resizeMode="contain" className="w-12 h-12" />
        <View className="ml-4">
          <Text className="text-black dark:text-white font-inter400 text-xl leading-[24.2px]">
            {name}
          </Text>
          <Text className="text-black dark:text-white mt-1 font-inter400 text-base leading-[19.36px]">
            {id}
          </Text>
        </View>
      </View>
      <View className="mt-6 flex-row">
        <OptionsButton
          Svg={CallSVG}
          onPress={() => Linking.openURL(`tel:${phone}`)}
          label={"Call"}
        />
        <OptionsButton
          Svg={MessageSVG}
          onPress={checkSMS}
          label={"Text"}
          className={"ml-4"}
        />
      </View>
    </View>
  );
};

export default PatientOptions;

const OptionsButton = ({ onPress, label, Svg, className }) => {
  return (
    <ResizingButton
      onPress={onPress}
      outerClassName={`${className} flex-1`}
      className={
        "w-full dark:bg-[#202E41] border border-blueA dark:border-borderDark items-center py-4 rounded-lg"
      }
    >
      <View className="w-8 h-8 items-center justify-center">
        <Svg />
      </View>
      <Text className="text-black dark:text-white text-xs leading-[14.52px] font-inter400">
        {label}
      </Text>
    </ResizingButton>
  );
};

export const SkeletonPatientOptions = () => {
  return (
    <View className="p-4 border border-white dark:border-borderDark bg-white dark:bg-secondaryDark rounded-md">
      <View className="flex-row">
        <View className="size-12 bg-gray-200 animate-pulse rounded-lg"></View>
        <View className="ml-4">
          <Text className="text-transparent bg-gray-200 rounded-md animate-pulse font-inter400 text-xl leading-[24.2px]">
            Ralph Edwards
          </Text>
          <Text className="text-transparent bg-gray-200 rounded-md animate-pulse mt-1 font-inter400 text-base leading-[19.36px]">
            01-134212-169
          </Text>
        </View>
      </View>
      <View className="mt-6 flex-row">
        <SkeletonOptionsButton label={"Call"} />
        <SkeletonOptionsButton label={"Text"} className={"ml-4"} />
      </View>
    </View>
  );
};

export const SkeletonOptionsButton = ({ label, className }) => {
  return (
    <View
      className={`bg-gray-200 animate-pulse border border-blueA dark:border-borderDark items-center flex-1 py-4 rounded-lg ${className}`}
    >
      <View className="w-8 h-8 items-center justify-center"></View>
      <Text className="text-transparent text-xs leading-[14.52px] font-inter400">
        {label}
      </Text>
    </View>
  );
};
