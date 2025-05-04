import { createContext, useContext, useRef } from "react";
import { useAuth } from "./AuthContext";
import { useMutation } from "react-query";
import { logoutDoctor } from "../api/actions";
import CustomBottomSheet from "../components/Settings/bottomSheet";
import { toast } from "sonner-native";
import { useNotification } from "../context/NotificationContext";

const BottomSheetContext = createContext(null);

export const BottomSheetProvider = ({ children }) => {
  const { token, signOut } = useAuth();
  const { expoPushToken } = useNotification();
  const bottomSheetRef = useRef(null);

  // Mutation
  const logoutMutation = useMutation(
    () => logoutDoctor(token.username, expoPushToken),
    {
      onSuccess: (data) => {
        signOut();
        bottomSheetRef.current?.close();
        toast.success(data.message || "Logout Successful");
      },
      onError: (error) => {
        toast.error(
          error.error ||
            "Something went wrong with logging in. Please try again later."
        );
      },
    }
  );

  // Methods
  const openBottomSheet = () => bottomSheetRef.current?.expand();
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const handleLogoutCancel = () => {
    bottomSheetRef.current?.close();
  };
  return (
    <BottomSheetContext.Provider value={{ openBottomSheet }}>
      {children}
      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        handleButtonPress={handleLogout}
        handleCancel={handleLogoutCancel}
        title={"Logout"}
        desc={"Are you sure you want to logout of this account?"}
        buttonText={"Logout"}
        isLoading={logoutMutation.isLoading}
      />
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);
