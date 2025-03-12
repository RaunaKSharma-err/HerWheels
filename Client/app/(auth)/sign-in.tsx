import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/inputFeilds";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import { Oauth } from "@/components/oAuth";
import { useAuthStore } from "@/store/authStore";
import ReactNativeModal from "react-native-modal";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn, authUser } = useAuthStore();

  const [verification, setVerification] = useState({
    state: "default",
  });

  const handleLogIn = () => {
    login(form);
    if (!isLoggingIn && authUser != null) {
      setVerification({ state: "success" });
    } else {
      Alert.alert("Error", "Invalid Credentials");
    }
  };
  return (
    <ScrollView className="flex-1 bg-white ">
      <View className="flex-1 w-full justify-center items-center">
        <View className="flex-1 w-full ">
          <Image
            source={images.signUpCar}
            resizeMode="contain"
            className="w-full h-[300px]"
          />
          <Text className="absolute bottom-5 left-8 text-3xl font-bold">
            Welcome Back 👋
          </Text>
        </View>
        <View className="flex-1 w-full mx-5 gap-2">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            containerStyle="p-2 bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 h-[60px] mx-6"
            iconStyle="h-7 w-7 mx-3"
            labelStyle="m-5 text-xl ml-8"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            containerStyle="p-2 bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 mx-6 h-[60px]"
            iconStyle="h-7 w-7 mx-3"
            labelStyle="m-5 text-xl ml-8"
          />
        </View>
        <CustomButton
          style={{ width: "95%" }}
          title="Sign In"
          className="mx-2 w-[90%] mt-12 h-16"
          onPress={handleLogIn}
        />
        <Oauth />
        <Link href={"/(auth)/sign-up"} className="text-center text-lg mt-10">
          <Text>Don't have an Account? </Text>
          <Text className="text-blue-600">SignUp</Text>
        </Link>
        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="h-[110px] w-[110px] mx-auto my-5"
            />
            <Text
              className="text-black text-center font-bold"
              style={{ fontSize: 30 }}
            >
              Verified
            </Text>
            <Text
              className="text-black text-center"
              style={{ fontSize: 15, marginTop: 6 }}
            >
              You have succesfully logged In.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                router.replace("/(root)/(tabs)/home");
              }}
              style={{ marginTop: 20, height: 50 }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
