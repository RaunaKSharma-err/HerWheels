import axios from "axios";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function HomeScreen() {
  
  return <Redirect href={"/(auth)/welcome"} />;
}
