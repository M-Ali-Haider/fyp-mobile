import { Redirect, Tabs } from "expo-router";
import { View } from "react-native";
import HomeSVG from "../../assets/Tabs/home";
import PatientSVG from "../../assets/Tabs/patients";
import SettingSVG from "../../assets/Tabs/settings";
import TabIcon from "../../components/TabIcon";
import { useAuth } from "../../context/AuthContext";
import { PatientProvider } from "../../context/PatientContext";
import { useColorScheme } from "../../hooks/useColorScheme";

const TabsLayout = () => {
  const { token } = useAuth();
  if (!token) {
    return <Redirect href={"/"} />;
  }
  const { colorScheme } = useColorScheme();
  return (
    <PatientProvider>
      <View className="flex-1 bg-bgLight dark:bg-bgDark">
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor:
              colorScheme === "dark" ? "#4B8DFD" : "#FFFFFF",
            tabBarInactiveTintColor:
              colorScheme === "dark" ? "#757575" : "#A2A2A2",
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#19263B" : "#ffffff",
              borderTopWidth: 0.2,
              borderTopColor: colorScheme === "dark" ? "#2F3E50" : "#ffffff",
              height: 84,
            },
            tabBarItemStyle: {
              height: 48,
              alignSelf: "center",
              borderRightWidth: 1,
              borderRightColor: "#7575754D",
            },
          }}
        >
          <Tabs.Screen
            name="patients"
            options={{
              title: "Patients",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  name={"Patients"}
                  Svg={PatientSVG}
                  color={color}
                  focused={focused}
                  width={100}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  name={"Home"}
                  Svg={HomeSVG}
                  color={color}
                  focused={focused}
                  width={90}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  name={"Settings"}
                  Svg={SettingSVG}
                  color={color}
                  focused={focused}
                  width={100}
                />
              ),
            }}
          />
        </Tabs>
      </View>
    </PatientProvider>
  );
};

export default TabsLayout;
