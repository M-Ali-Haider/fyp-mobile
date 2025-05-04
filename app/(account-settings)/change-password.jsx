import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import BackButton from "../../components/AccountSettings/BackButton";
import InputField from "../../assets/AccountSettings/InputField";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "react-query";
import { changePassword } from "../../api/actions";
import { toast } from "sonner-native";

const ChangePassword = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    oldPassword: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  const validateForm = () => {
    const { oldPassword, password } = form;
    const areAllFieldsFilled = oldPassword !== "" && password !== "";
    setDisabled(!areAllFieldsFilled);
  };
  useEffect(() => {
    validateForm();
  }, [form]);

  const changePasswordMutation = useMutation(
    () => changePassword(form.oldPassword, form.password, token.doctor_id),
    {
      onSuccess: (data) =>
        toast.success(data.message || "Password changed successfully"),
      onError: (error) =>
        toast.error(error.error || "Error while changing password"),
    }
  );

  const handlePress = () => {
    if (!disabled) {
      Keyboard.dismiss();
      changePasswordMutation.mutate();
    }
  };

  return (
    <LayoutWrapper>
      <BackButton />
      <View className="px-6 flex-1">
        <View className="mt-6">
          <Text className="mt-2 font-inter500 text-2xl leading-[29.05px] text-black dark:text-white">
            Create New Password.
          </Text>
        </View>
        <View className="mt-10">
          <InputField
            type={"Password"}
            title={"Current Password"}
            value={form.oldPassword}
            handleChangeText={(e) => setForm({ ...form, oldPassword: e })}
            otherStyles={""}
            placeholder={"••••••••••••"}
            labelStyles="text-yellow font-inter500"
          />
          <InputField
            type={"Password"}
            title={"New Password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={"mt-6"}
            placeholder={"••••••••••••"}
            labelStyles="text-yellow font-inter500"
          />
        </View>
        <View className="flex items-center">
          <TouchableOpacity
            disabled={disabled || changePasswordMutation.isLoading}
            onPress={handlePress}
            className={`${
              disabled ? "opacity-50" : "opacity-100"
            } bg-blueA w-full flex items-center justify-center py-[14px] rounded-lg mt-10`}
          >
            <Text className={`text-sm font-inter500 text-white`}>
              {changePasswordMutation.isLoading ? (
                <ActivityIndicator color={"#ffffff"} />
              ) : (
                "Change Password"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutWrapper>
  );
};

export default ChangePassword;
