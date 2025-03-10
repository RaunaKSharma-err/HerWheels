import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/inputFeilds";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import { Oauth } from "@/components/oAuth";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignIn = () => {};

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
          onPress={handleSignIn}
        />
        <Oauth />
        <Link href={"/(auth)/sign-up"} className="text-center text-lg mt-10">
          <Text>Don't have an Account? </Text>
          <Text className="text-blue-600">SignUp</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
