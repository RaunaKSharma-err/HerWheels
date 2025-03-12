import RideCard from "@/components/rideCard";
import { FlatList, Text, View } from "react-native";

const recentRides = [
  {
    origin_address: "Kathmandu Durbar Square, Kathmandu, Nepal",
    destination_address: "Tribhuvan International Airport, Kathmandu, Nepal",
    origin_latitude: 27.7041,
    origin_longitude: 85.3096,
    destination_latitude: 27.6988,
    destination_longitude: 85.357,
    ride_time: 25,
    fare_price: 1200,
    payment_status: "Paid",
    driver_id: 101,
    user_email: "user1@example.com",
    created_at: "2025-03-12T08:30:00Z",
    driver: {
      first_name: "Rajesh",
      last_name: "Shrestha",
      car_seats: 4,
    },
  },
  {
    origin_address: "Pokhara Lakeside, Pokhara, Nepal",
    destination_address: "Sarangkot View Tower, Pokhara, Nepal",
    origin_latitude: 28.2096,
    origin_longitude: 83.9856,
    destination_latitude: 28.2669,
    destination_longitude: 83.9685,
    ride_time: 35,
    fare_price: 1800,
    payment_status: "Unpaid",
    driver_id: 102,
    user_email: "user2@example.com",
    created_at: "2025-03-12T10:15:00Z",
    driver: {
      first_name: "Suman",
      last_name: "Gurung",
      car_seats: 4,
    },
  },
  {
    origin_address: "Patan Durbar Square, Lalitpur, Nepal",
    destination_address: "Boudhanath Stupa, Kathmandu, Nepal",
    origin_latitude: 27.673,
    origin_longitude: 85.325,
    destination_latitude: 27.7215,
    destination_longitude: 85.3611,
    ride_time: 40,
    fare_price: 1500,
    payment_status: "Paid",
    driver_id: 103,
    user_email: "user3@example.com",
    created_at: "2025-03-12T12:00:00Z",
    driver: {
      first_name: "Bikash",
      last_name: "Maharjan",
      car_seats: 6,
    },
  },
  {
    origin_address: "Bhaktapur Durbar Square, Bhaktapur, Nepal",
    destination_address: "Nagarkot View Tower, Nagarkot, Nepal",
    origin_latitude: 27.6725,
    origin_longitude: 85.4289,
    destination_latitude: 27.7256,
    destination_longitude: 85.5123,
    ride_time: 50,
    fare_price: 2200,
    payment_status: "Paid",
    driver_id: 104,
    user_email: "user4@example.com",
    created_at: "2025-03-12T14:45:00Z",
    driver: {
      first_name: "Hari",
      last_name: "Dahal",
      car_seats: 4,
    },
  },
];

export default function Page() {
  return (
    <View className="w-full flex justify-center items-center text-orange text-3xl">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
      />
    </View>
  );
}
