import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { Copy, CopyCheck } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { useQuery } from "react-query";
import { toast } from "sonner-native";
import { getPrognosisById } from "../api/actions";
import BackButton from "../components/AccountSettings/BackButton";
import LayoutWrapper from "../components/LayoutWrapper";
import Prognosis from "../components/Prognosis";
import { useColorScheme } from "../hooks/useColorScheme";
const PrognosisScreen = () => {
  const { patient_id } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();

  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["prognosis", patient_id],
    queryFn: () => getPrognosisById(patient_id),
  });

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(process.env.COPY_LINK);
      toast.success("Website Link Copied");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Error copying website link");
    }
  };

  return (
    <LayoutWrapper>
      <Provider>
        <BackButton />
        <Portal>
          <Dialog
            style={{
              backgroundColor: colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
            }}
            visible={visible}
            onDismiss={() => setVisible(false)}
          >
            <Dialog.Title>Better Experience Available</Dialog.Title>
            <Dialog.Content className="bg-bgLight dark:bg-bgDark">
              <Text className="text-black dark:text-white font-inter400 text-base">
                For a better experience, please visit our official website.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                textColor={colorScheme === "dark" ? "#fff" : "#000"}
                onPress={() => setVisible(false)}
              >
                Close
              </Button>
              <Button onPress={handleCopyLink}>
                {copied ? (
                  <CopyCheck
                    size={16}
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                  />
                ) : (
                  <Copy
                    size={16}
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                  />
                )}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <ScrollView className="px-4 mt-3">
          {isLoading ? (
            <View>
              <Text className="text-black dark:text-white font-inter500 text-lg">
                Loading Prognosis...
              </Text>
            </View>
          ) : isError ? (
            <View className="h-full items-center justify-center">
              <Text className="text-black dark:text-white font-inter500 text-lg">
                Error fetching prognosis's data
              </Text>
              <Text className="text-black dark:text-white font-inter400 text-base">
                {error?.message || "Something went wrong."}
              </Text>
            </View>
          ) : (
            <Prognosis data={data.data} patient_id={patient_id} />
          )}
        </ScrollView>
      </Provider>
    </LayoutWrapper>
  );
};

export default PrognosisScreen;
