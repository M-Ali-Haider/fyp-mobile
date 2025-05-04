import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import pfp from "../../assets/patient1.png";
import { blurhash } from "../../components/Patients/images";
import { useAuth } from "../../context/AuthContext";
import GreenDotSVG from "../../assets/Home/green-dot";
import { usePatients } from "../../context/PatientContext";

const TopHome = () => {
  const { token } = useAuth();
  const { data } = usePatients();

  const onlinePatients =
    data?.patients?.filter((patient) => patient.online)?.length || 0;

  return (
    <View>
      <View
        className="p-6  
        border border-borderLight dark:border-borderDark rounded-3xl
        bg-secondaryLight dark:bg-secondaryDark"
      >
        <Text className="text-2xl font-dmSans600 text-black dark:text-white">
          Your Profile
        </Text>
        <View className="mt-3 flex-row items-center gap-x-3">
          <View className="size-[82px] rounded-xl">
            <Image
              style={styles.image}
              source={pfp}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
            />
          </View>
          <View className="gap-y-[6px]">
            <MainCardText label={"Name"} value={token.name} />
            <MainCardText label={"ID"} value={token.doctor_id} />
            <MainCardText label={"Phone"} value={token.phone_number} />
          </View>
        </View>
      </View>
      <View className="mt-3 flex-row gap-x-3">
        <View
          className="flex-1 p-6 border border-borderLight dark:border-borderDark rounded-3xl
          bg-secondaryLight dark:bg-secondaryDark"
        >
          <Text className="text-2xl font-dmSans600 text-black dark:text-white">
            Total Patients
          </Text>
          <Text className="mt-6 text-5xl font-dmSans600 text-[#ADADAD]">
            {token.total_patients}
          </Text>
        </View>
        <View
          className="w-[144px] p-6 border border-borderLight dark:border-borderDark rounded-3xl
          bg-secondaryLight dark:bg-secondaryDark"
        >
          <View className="flex-row gap-x-2 items-center">
            <GreenDotSVG />
            <Text className="text-2xl font-dmSans600 text-black dark:text-white">
              Online
            </Text>
          </View>
          <Text className="mt-6 text-5xl text-[#ADADAD] font-dmSans600">
            {onlinePatients}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopHome;

const MainCardText = ({ label, value }) => {
  return (
    <View className="flex-row gap-x-1">
      <Text className="text-sm dark:text-white font-inter600">{label}:</Text>
      <Text className="text-sm dark:text-[#ADADAD]">{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0553",
    borderRadius: 6,
  },
});
