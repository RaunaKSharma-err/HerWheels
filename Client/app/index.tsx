import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function HomeScreen() {
  const { checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!authUser) {
    return <Redirect href={"/(auth)/welcome"} />;
  }
  return <Redirect href={"/(root)/(tabs)/home"} />;
}
