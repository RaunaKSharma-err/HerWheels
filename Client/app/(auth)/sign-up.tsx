import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/inputFeilds";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import { Oauth } from "@/components/oAuth";
import ReactNativeModal from "react-native-modal";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const SignUp = () => {
  const data = {
    fullName: "test",
    email: "test@gmail.com",
    password: "test12345",
  };

  useEffect(() => {
    const test = async () => {
      const response = await axios.post(
        "http://192.168.254.4:5000/api/auth/signup",
        data
      );
      console.log("user created");

      console.log(response.data);
    };
    test();
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, authUser } = useAuthStore();

  const [verification, setVerification] = useState({
    state: "default",
  });

  const handleSignUp = () => {
    signup(form);
    if (!authUser) {
      setVerification({ state: "success" });
    } else {
      Alert.alert("Error", "Failed to create new account");
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
            Create Your Account
          </Text>
        </View>
        <View className="flex-1 w-full mx-5 gap-2 ">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            containerStyle="p-2 bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 mx-6 h-[60px]"
            value={form.fullName}
            onChangeText={(value) => setForm({ ...form, fullName: value })}
            iconStyle="h-7 w-7 mx-3"
            labelStyle="m-5  text-xl ml-8"
            inputStyle="w-[50%]"
          />
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
          <CustomButton
            style={{ width: "95%" }}
            title="SignUp"
            className="mx-4 w-[90%] mt-12 h-16"
            onPress={handleSignUp}
          />
          <Oauth />
          <Link href={"/(auth)/sign-in"} className="text-center text-lg mt-10">
            <Text>Already have an Account? </Text>
            <Text className="text-blue-600">Login</Text>
          </Link>
        </View>

        {/* <ReactNativeModal
          isVisible={verification.state === "pending"}
          // onBackdropPress={() =>
          //   setVerification({ ...verification, state: "default" })
          // }
          onModalHide={() => {
            //   if (verification.state === "success") {
            //     setShowSuccessModal(true);
            //   }
            // }}
            setVerification({ ...verification, state: "default" });
          }}
        > */}
        {/* <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text
              className="font-bold mb-2"
              style={{ fontSize: 25, marginBottom: 5 }}
            >
              Verification
            </Text>
            <Text className="font-Jakarta mb-5" style={{ marginBottom: 15 }}>
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
              iconStyle="h-7 w-7 mx-3"
              labelStyle="mb-6s"
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onVerifyPress}
              className="mt-8 "
              style={{ height: 50 }}
            />
          </View>
        </ReactNativeModal> */}

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
              You have succesfully verified your account.
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

export default SignUp;

const styles = StyleSheet.create({});
