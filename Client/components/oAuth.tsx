import { Image, Text, View } from "react-native";
import CustomButton from "./customButton";
import { icons } from "@/constants";

export const Oauth = () => {
  const handleGoogleLogIn = () => {};
  return (
    <View className="w-full items-center">
      <View className="flex flex-row justify-center items-center mt-8 space-x-3">
        <View className="flex-1 h-[5px] bg-slate-800" />
        <Text className="text-lg">--------- Or --------</Text>
        <View className="flex-1 h-[1px] bg-slate-800" />
      </View>
      <CustomButton
        title="Log in with Google"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="mx-5"
            style={{ width: 30, height: 30 }}
          />
        )}
        className="w-[90%] h-16 mt-8 shadow-none border"
        style={{ width: "95%", borderColor: "grey" }}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleLogIn}
      />
    </View>
  );
};
