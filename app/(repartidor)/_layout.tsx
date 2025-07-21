import useAuthStore from "@/store/auth.store";
import { Slot } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function RepartidorLayout() {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) return <ActivityIndicator size="large" />;

  if (!isAuthenticated || user?.role !== "repartidor") {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No autorizado</Text>
      </View>
    );
  }

  return <Slot />;
}
