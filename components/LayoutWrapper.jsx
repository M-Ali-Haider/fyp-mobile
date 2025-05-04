import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LayoutWrapper = ({ children }) => {
  return (
    <SafeAreaView className="h-full bg-bgLight dark:bg-bgDark">
      <ScrollView
        contentContainerStyle={{ height: "100%" }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LayoutWrapper;
