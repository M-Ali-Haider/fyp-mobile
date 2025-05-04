import { ScrollView, View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import AccountSettings from "../../components/Settings/account";
import Heading from "../../components/Settings/heading";
import Logout from "../../components/Settings/logout";
import TestNotiAPI from "../../components/Settings/testNotiAPI";
import SettingsToggleTheme from "../../components/Settings/toggleTheme";

const SettingScreen = () => {
  return (
    <>
      <LayoutWrapper>
        <View className="px-4 mt-24">
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 36,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Heading title={"Display Settings"} className={"mb-9"} />
            <SettingsToggleTheme />
            <Heading title={"Account Settings"} className={"mt-[72px] mb-9"} />
            <AccountSettings />
            <Heading title={"Others"} className={"mt-[72px] mb-9"} />
            <Logout />

            {/* Remove After Testing */}
            <TestNotiAPI />
          </ScrollView>
        </View>
      </LayoutWrapper>
    </>
  );
};

export default SettingScreen;
