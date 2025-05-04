import { ScrollView, View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import TopHome from "../../components/Home/top";

const HomeScreen = () => {
  return (
    <LayoutWrapper>
      <View className="mt-[72px] px-4 flex-1">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 36,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TopHome />
        </ScrollView>
      </View>
    </LayoutWrapper>
  );
};

export default HomeScreen;
