import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { usePatients } from "../../context/PatientContext";
import Heading from "./heading";
import { useMutation } from "react-query";
import { testNotification } from "../../api/actions";
import { toast } from "sonner-native";
import { useColorScheme } from "../../hooks/useColorScheme";

const TestNotiAPI = () => {
  const { data, isLoading, error } = usePatients();
  const { colorScheme } = useColorScheme();
  return (
    <>
      <Heading
        title={"Testing Notification API"}
        className={"mt-[72px] mb-9"}
      />
      {isLoading ? (
        <View className="justify-center items-center">
          <Text className="my-2 text-white font-inter400">
            Loading Patients...
          </Text>
          <ActivityIndicator
            size={"large"}
            color={colorScheme === "dark" ? "#ffffff" : "#000000"}
          />
        </View>
      ) : error ? (
        <View className="justify-center items-center">
          <Text className="text-lg text-white font-inter400">
            Error fetching conversation
          </Text>
        </View>
      ) : (
        <>
          {data.total_patients > 0 ? (
            <>
              {data.patients.map((item, index) => (
                <TestNotiCard key={index} index={index} item={item} />
              ))}
            </>
          ) : (
            <View
              className="border border-white dark:border-borderDark bg-secondaryLight dark:bg-secondaryDark 
              flex-row p-4 justify-between items-center rounded-lg"
            >
              <Text className="text-black dark:text-white font-inter400 text-base leading-[19.36px]">
                No Patients
              </Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default TestNotiAPI;

const TestNotiCard = ({ item, index }) => {
  const { colorScheme } = useColorScheme();
  const notiMutation = useMutation(() => testNotification(item.patient_id), {
    onSuccess: (data) => {
      toast.success(data.message || "API Successful");
    },
    onError: (error) => {
      toast.error(
        error.error ||
          "Something went wrong with logging in. Please try again later."
      );
    },
  });
  return (
    <TouchableOpacity
      onPress={() => notiMutation.mutate()}
      className={`${
        index !== 0 && "mt-4"
      } border border-white dark:border-borderDark bg-secondaryLight dark:bg-secondaryDark 
      flex-row p-4 items-center rounded-lg ${
        notiMutation.isLoading && "justify-center"
      }`}
    >
      {notiMutation.isLoading ? (
        <ActivityIndicator
          color={colorScheme === "dark" ? "#ffffff" : "#000000"}
        />
      ) : (
        <Text className="text-black dark:text-white font-inter400 text-base leading-[19.36px]">
          {item.name}
        </Text>
      )}
    </TouchableOpacity>
  );
};
