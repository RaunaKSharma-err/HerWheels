import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View>
      <Text className="text-3xl">{ride.driver.first_name}</Text>
    </View>
  );
};

export default RideCard;

const styles = StyleSheet.create({});
