import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View, Linking } from "react-native";
import { Divider, Menu } from "react-native-paper";
import DotsSVG from "../../assets/Home/dots";
import src from "../../assets/patient1.png";
import { useColorScheme } from "../../hooks/useColorScheme";
import { ResizingButton } from "../Button/resizable";
import * as SMS from "expo-sms";

const Card = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { colorScheme } = useColorScheme();

  const checkSMS = async (phone) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      Linking.openURL(`sms:${phone}`);
    } else {
      toast.error("SMS's are not availble in this device");
    }
  };

  return (
    <View className="py-4 pl-4 pr-[14px] bg-white dark:bg-secondaryDark mt-[18px] flex-row justify-between rounded-lg">
      <ResizingButton
        onPress={() =>
          router.push({
            pathname: "patient",
            params: { patient_id: item.patient_id },
          })
        }
        className="flex-row"
      >
        <View className="flex-row items-center h-12">
          <View
            className={`${
              item.online ? "bg-green-500" : "bg-red-500"
            } size-2 rounded-full mr-1`}
          />
          <Image source={src} resizeMode="contain" className="w-12 h-12" />
        </View>
        <View className="ml-2">
          <Text className="font-inter400 text-black dark:text-white text-lg leading-[21.78px] mb-1">
            {item.name}
          </Text>
          <Text className="font-inter400 text-black dark:text-white text-base leading-[19.36px] mb-2">
            P.Id: {item.patient_id}
          </Text>
          <View>
            <Text className="text-blueA underline text-sm leading-[16.94px]">
              View Details
            </Text>
          </View>
        </View>
      </ResizingButton>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Pressable
            onPress={openMenu}
            className="items-center justify-center w-6 h-6 bg-grayC dark:bg-borderDark rounded"
          >
            <DotsSVG />
          </Pressable>
        }
        contentStyle={{
          borderRadius: 12,
          backgroundColor: colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
        }}
      >
        <Menu.Item
          titleStyle={{ color: colorScheme === "dark" ? "#fff" : "#000" }}
          onPress={() => Linking.openURL(`tel:${item.phone_number}`)}
          title="Call"
        />
        <Divider />
        <Menu.Item
          titleStyle={{ color: colorScheme === "dark" ? "#fff" : "#000" }}
          onPress={() => checkSMS(item.phone_number)}
          title="Message"
        />
      </Menu>
    </View>
  );
};

export default Card;

// const Card = ({ item }) => {
//   return (
//     <ResizingButton
//       onPress={() =>
//         router.push({
//           pathname: "patient",
//           params: { patient_id: item.patient_id },
//         })
//       }
//       className="py-4 pl-4 pr-[14px] bg-white dark:bg-secondaryDark mt-[18px] flex-row justify-between rounded-lg"
//     >
//       <View className="flex-row">
//         <View className="flex-row items-center h-12">
//           <View
//             className={`${
//               item.online ? "bg-green-500" : "bg-red-500"
//             } size-2 rounded-full mr-1`}
//           />
//           <Image source={src} resizeMode="contain" className="w-12 h-12" />
//         </View>
//         <View className="ml-2">
//           <Text className="font-inter400 text-black dark:text-white text-lg leading-[21.78px] mb-1">
//             {item.name}
//           </Text>
//           <Text className="font-inter400 text-black dark:text-white text-base leading-[19.36px] mb-2">
//             P.Id: {item.patient_id}
//           </Text>
//           <Pressable>
//             <Text className="text-blueA underline text-sm leading-[16.94px]">
//               View Details
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//       <View className="items-center justify-center w-6 h-6 bg-grayC dark:bg-borderDark rounded">
//         <DotsSVG />
//       </View>
//     </ResizingButton>
//   );
// };

// export default Card;
