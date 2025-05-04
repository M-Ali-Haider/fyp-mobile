import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";
import { getImagesPatientById, getPatientById } from "../api/actions";
import BackButton from "../components/AccountSettings/BackButton";
import LayoutWrapper from "../components/LayoutWrapper";
import PatientGraphs from "../components/Patients/images";
import PatientOptions, {
  SkeletonPatientOptions,
} from "../components/Patients/options";
import StrokeHistory, {
  SkeletonStrokeHistory,
} from "../components/Patients/strokeHistory";
const PatientScreen = () => {
  const { patient_id } = useLocalSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patient", patient_id],
    queryFn: () => getPatientById(patient_id),
  });

  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isError: isImagesError,
    error: imagesError,
  } = useQuery({
    queryKey: ["patientImages", patient_id],
    queryFn: () => getImagesPatientById(patient_id),
  });

  return (
    <LayoutWrapper>
      <BackButton />
      <ScrollView className="px-4 mt-3">
        {isLoading ? (
          <>
            <SkeletonPatientOptions />
            <SkeletonStrokeHistory />
          </>
        ) : isError ? (
          <View className="h-full items-center justify-center">
            <Text className="text-black dark:text-white font-inter500 text-lg">
              Error fetching patient's data
            </Text>
            <Text className="text-black dark:text-white font-inter400 text-base">
              {error?.message || "Something went wrong."}
            </Text>
          </View>
        ) : (
          <>
            <PatientOptions
              name={data?.patient.name}
              id={patient_id}
              phone={data?.patient?.phone_number}
            />
            <StrokeHistory strokeHistory={data?.patient?.stroke_history} />
          </>
        )}
        {isImagesLoading ? (
          <>
            <Text className="mt-9 mb-4 text-black dark:text-white font-inter500 text-2xl leading-[29.05px]">
              Graphs
            </Text>
            <ActivityIndicator />
          </>
        ) : isImagesError ? (
          <View className="h-full items-center justify-center">
            <Text className="text-black dark:text-white font-inter500 text-lg">
              Error fetching patient's images data
            </Text>
            <Text className="text-black dark:text-white font-inter400 text-base">
              {imagesError?.message || "Something went wrong."}
            </Text>
          </View>
        ) : (
          <PatientGraphs patient_id={patient_id} imagesData={imagesData} />
        )}
      </ScrollView>
    </LayoutWrapper>
  );
};

export default PatientScreen;
