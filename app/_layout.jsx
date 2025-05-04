import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { DMSans_600SemiBold } from "@expo-google-fonts/dm-sans";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner-native";
import CustomSplashScreen from "../components/SplashScreen";
import { AuthProvider } from "../context/AuthContext";
import { BottomSheetProvider } from "../context/LogoutBottomSheetContext";
import { NotificationProvider } from "../context/NotificationContext";
import "../global.css";
import { useColorScheme } from "../hooks/useColorScheme";

// Keep the splash screen visible while we fetch the resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isLoading: themeLoading, colorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    DMSans_600SemiBold,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded && !themeLoading) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady, fontsLoaded, themeLoading]);

  if (!appIsReady || !fontsLoaded || themeLoading) {
    return <CustomSplashScreen />;
  }
  return (
    <NotificationProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
            backgroundColor={colorScheme === "dark" ? "#0E1828" : "#E3EEFF"}
          />
          <Animated.View
            className="flex-1 bg-bgLight dark:bg-bgDark"
            entering={FadeIn}
            onLayout={onLayoutRootView}
          >
            <GestureHandlerRootView
              style={{
                flex: 1,
                backgroundColor: colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
              }}
            >
              <BottomSheetProvider>
                <Stack
                  screenOptions={{
                    contentStyle: {
                      backgroundColor:
                        colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
                    },
                  }}
                >
                  <Stack.Screen
                    name="index"
                    options={{
                      headerShown: false,
                      animation: "ios_from_left",
                      navigationBarColor:
                        colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
                    }}
                  />
                  <Stack.Screen
                    name="(home)"
                    options={{
                      headerShown: false,
                      animation: "ios_from_left",
                      navigationBarColor:
                        colorScheme === "dark" ? "#19263B" : "#ffffff",
                    }}
                  />
                  <Stack.Screen
                    name="(account-settings)"
                    options={{
                      headerShown: false,
                      animation: "ios_from_left",
                      navigationBarColor:
                        colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
                    }}
                  />
                  <Stack.Screen
                    name="patient"
                    options={{
                      headerShown: false,
                      animation: "ios_from_left",
                      navigationBarColor:
                        colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
                    }}
                  />
                  <Stack.Screen
                    name="prognosis"
                    options={{
                      headerShown: false,
                      animation: "ios_from_left",
                      navigationBarColor:
                        colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
                    }}
                  />
                  <Stack.Screen
                    name="image"
                    options={{
                      headerShown: false,
                      presentation: "transparentModal",
                      animation: "fade",
                      navigationBarColor:
                        colorScheme === "dark" ? "#0E1828" : "#E3EEFF",
                    }}
                  />
                </Stack>
                <Toaster
                  position="bottom-center"
                  duration={3000}
                  swipToDismissDirection="up"
                  maxToasts={4}
                  theme="light"
                  richColors={true}
                />
              </BottomSheetProvider>
            </GestureHandlerRootView>
          </Animated.View>
        </QueryClientProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default RootLayout;
