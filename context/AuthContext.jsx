import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  token: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
  changeUsername: (async) => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) {
        setToken(JSON.parse(storedToken));
      }
    } catch (error) {
      console.error("Error checking token: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const signIn = async (newToken) => {
    try {
      await AsyncStorage.setItem("userToken", JSON.stringify(newToken));
      setToken(newToken);
    } catch (error) {
      console.error("Error storing token: ", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setToken(null);
    } catch (error) {
      console.error("Error removing token: ", error);
    }
  };

  const changeUsername = async (newUsername) => {
    try {
      if (!token) return;

      const updatedToken = { ...token, username: newUsername };
      await AsyncStorage.setItem("userToken", JSON.stringify(updatedToken));
      setToken(updatedToken);
    } catch (error) {
      console.error("Error updating username: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, isLoading, signIn, signOut, changeUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
