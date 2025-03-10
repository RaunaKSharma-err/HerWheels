import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onBoardingContent } from "@/constants";
import CustomButton from "@/components/customButton";
import axios from "axios";

const onBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastIndex = activeIndex === onBoardingContent.length - 1;
  return (
    <SafeAreaView className="flex justify-between w-full h-full items-center bg-white">
      <TouchableOpacity
        className="flex w-full justify-end items-end p-5 mt-16 mb-8"
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        <Text className="text-black text-md font-bold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => {
          setActiveIndex(index);
        }}
        className=""
      >
        {onBoardingContent.map((item) => (
          <View
            className="flex w-full items-center justify-center"
            key={item.id}
          >
            <Image
              source={item.image}
              resizeMode="contain"
              className="h-[400px] w-full"
            />
            <View className="flex flex-row justify-center items-center w-full mt-10">
              <Text
                className="text-center font-bold mx-10"
                style={{ fontSize: 30, marginHorizontal: 80 }}
              >
                {item.title}
              </Text>
            </View>
            <Text
              className="text-center font-md text-[#858585] mx-10"
              style={{ fontSize: 17, marginHorizontal: 80, marginTop: 10 }}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastIndex ? "Get Started" : "Next"}
        onPress={() => {
          isLastIndex
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1);
        }}
        className="h-16 mb-10 mt-8 text-white"
        style={{ width: "95%" }}
      />
    </SafeAreaView>
  );
};

export default onBoarding;

const styles = StyleSheet.create({});
