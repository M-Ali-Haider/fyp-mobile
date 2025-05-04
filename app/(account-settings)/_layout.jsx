import { Stack } from "expo-router";
import { useColorScheme } from "../../hooks/useColorScheme";

const AccountSettingsLayout = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
        },
      }}
    >
      <Stack.Screen
        name="change-username"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="change-password"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
};

export default AccountSettingsLayout;
