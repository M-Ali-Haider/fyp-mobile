import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation } from "react-query";
import { toast } from "sonner-native";
import { changeUsername } from "../../api/actions";
import InputField from "../../assets/AccountSettings/InputField";
import BackButton from "../../components/AccountSettings/BackButton";
import LayoutWrapper from "../../components/LayoutWrapper";
import { useAuth } from "../../context/AuthContext";

const ChangeUsername = () => {
  const { token, changeUsername: authChangeUsername } = useAuth();

  const [newUsername, setNewUsername] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (newUsername !== "") {
      setDisabled(false);
    }
  }, [newUsername]);

  const changeUsernameMutation = useMutation(
    () => changeUsername(newUsername, token.doctor_id),
    {
      onSuccess: (data) => {
        authChangeUsername(data.new_username);
        toast.success(data.message || "Username changed successfully");
      },
      onError: (error) =>
        toast.error(error.error || "Error while changing username"),
    }
  );

  const handlePress = () => {
    if (!disabled) {
      Keyboard.dismiss();
      changeUsernameMutation.mutate();
    }
  };

  return (
    <LayoutWrapper>
      <BackButton />
      <View className="px-6 flex-1">
        <View className="mt-6">
          <Text className="mt-2 font-inter500 text-2xl leading-[29.05px] text-black dark:text-white">
            Change Username.
          </Text>
        </View>
        <View className="mt-10">
          <Text
            className={`text-black dark:text-white mb-2 text-sm leading-[16.94px] font-inter500`}
          >
            Current Username:
          </Text>
          <Text
            className={`text-black dark:text-white mb-2 text-sm leading-[16.94px] font-inter500`}
          >
            {token.username}
          </Text>
          <InputField
            type={"Text"}
            title={"New Username"}
            value={newUsername}
            handleChangeText={(e) => setNewUsername(e)}
            otherStyles={"mt-6"}
            placeholder={"Enter new username"}
            labelStyles="font-inter500"
          />
        </View>
        <View className="flex items-center">
          <TouchableOpacity
            disabled={disabled || changeUsernameMutation.isLoading}
            onPress={handlePress}
            className={`${
              disabled ? "opacity-50" : "opacity-100"
            } bg-blueA w-full flex items-center justify-center py-[14px] rounded-lg mt-10`}
          >
            <Text className={`text-sm font-inter500 text-white`}>
              {changeUsernameMutation.isLoading ? (
                <ActivityIndicator color={"#ffffff"} />
              ) : (
                "Change Username"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutWrapper>
  );
};

export default ChangeUsername;
