import { useColorScheme as useDeviceColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useColorScheme() {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const deviceColorScheme = useDeviceColorScheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track mount state
    loadThemePreference(isMounted);
    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  const loadThemePreference = async (isMounted) => {
    try {
      const savedTheme = await AsyncStorage.getItem("@theme_preference");
      if (isMounted) {
        setColorScheme(savedTheme ?? deviceColorScheme);
      }
    } catch (error) {
      console.error("Error loading theme preference: ", error);
      if (isMounted) setColorScheme(deviceColorScheme);
    } finally {
      if (isMounted) setIsLoading(false);
    }
  };

  const toggleColorScheme = async () => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    try {
      await AsyncStorage.setItem("@theme_preference", newTheme);
      setColorScheme(newTheme);
    } catch (error) {
      console.error("Error saving theme preference: ", error);
    }
  };

  return {
    colorScheme,
    toggleColorScheme,
    isLoading,
  };
}
