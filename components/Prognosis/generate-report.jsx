import React from "react";
import { Text, View } from "react-native";
import { ResizingButton } from "../Button/resizable";
import { useMutation } from "react-query";
import { getLLMReport } from "../../api/actions";
import { toast } from "sonner-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import CustomActivityIndicator from "../CustomActivityIndicator";

const GenerateReport = ({ patient_id }) => {
  const reportMutation = useMutation({
    mutationFn: () => getLLMReport(patient_id),
    onSuccess: async (data) => {
      try {
        const pdfUrl = data?.report;
        const fileName = pdfUrl.split("/").pop().split("?")[0];
        const downloadPath = FileSystem.documentDirectory + fileName;

        const { uri } = await FileSystem.downloadAsync(pdfUrl, downloadPath);
        toast.success(`PDF downloaded to: ${uri}`);

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          toast.error("Sharing is not available on this device");
        }

        // Cleanup: delete the file after sharing
        await FileSystem.deleteAsync(uri, { idempotent: true });
        console.log("Deleted file:", uri);
      } catch (error) {
        toast.error("Error downloading PDF:", error);
      }
    },
    onError: (error) => {
      toast.error(
        error.error ||
          "Something went wrong with generating report. Please try again later."
      );
    },
  });
  return (
    <View className="my-12 items-center">
      <ResizingButton
        isDisabled={reportMutation.isLoading}
        onPress={() => reportMutation.mutate()}
        isLoading={reportMutation.isLoading}
        className={`w-[205px] h-10 bg-blueA items-center justify-center rounded-lg`}
      >
        {reportMutation.isLoading ? (
          <CustomActivityIndicator />
        ) : (
          <Text className="text-[#F5F5F5] font-inter400">
            Generate LLM Report
          </Text>
        )}
      </ResizingButton>
    </View>
  );
};

export default GenerateReport;
