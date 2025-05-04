import { Redirect, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { toast } from "sonner-native";
import { registerDoctor } from "../api/actions";
import PasswordSVG from "../assets/Auth/password";
import UsernameSVG from "../assets/Auth/username";
import InputField from "../components/Auth/InputField";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import LayoutWrapper from "../components/LayoutWrapper";
import LoginToggler from "../components/ToggleTheme/loginToggler";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { ResizingButton } from "../components/Button/resizable";

const App = () => {
  const { signIn, token } = useAuth();
  if (token) {
    return <Redirect href={"home"} />;
  }
  const { expoPushToken } = useNotification();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const passwordInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const validateForm = () => {
    const { username, password } = form;
    const areAllFieldsFilled = username !== "" && password !== "";
    setDisabled(!areAllFieldsFilled);
  };
  useEffect(() => {
    validateForm();
  }, [form]);

  const loginMutation = useMutation(
    () => registerDoctor(form.username, form.password, expoPushToken),
    {
      onSuccess: (data) => {
        console.log(data.doctor);
        signIn(data.doctor);
        router.replace("home");
      },
      onError: (error) => {
        toast.error(
          error.error ||
            "Something went wrong with logging in. Please try again later."
        );
        if (passwordInputRef.current && usernameInputRef.current) {
          if (error.error === "Invalid username") {
            usernameInputRef.current.focus();
          } else {
            passwordInputRef.current.focus();
          }
        }
      },
    }
  );

  const handleLogin = () => {
    if (!disabled && expoPushToken) {
      Keyboard.dismiss();
      loginMutation.mutate();
    }
  };

  return (
    <LayoutWrapper>
      <View className="flex-1">
        <LoginToggler className={`mt-9`} />
        <View className="mt-24 px-4 flex-1 justify-between">
          <View>
            <InputField
              label={"Username"}
              placeholder={"Username"}
              Svg={UsernameSVG}
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              inputRef={usernameInputRef}
            />
            <InputField
              label={"Password"}
              placeholder={"Password"}
              className={"mt-9"}
              Svg={PasswordSVG}
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              inputRef={passwordInputRef}
              type={"Password"}
            />
          </View>
          <View className="mb-9 items-center">
            <ResizingButton
              isDisabled={disabled || loginMutation.isLoading}
              onPress={handleLogin}
              className={`${
                disabled ? "opacity-50" : "opacity-100"
              } w-[205px] h-10 bg-blueA items-center justify-center rounded-lg`}
            >
              {loginMutation.isLoading ? (
                <CustomActivityIndicator />
              ) : (
                <Text className="text-[#F5F5F5] font-inter400">Login</Text>
              )}
            </ResizingButton>
          </View>
        </View>
      </View>
    </LayoutWrapper>
  );
};

export default App;
