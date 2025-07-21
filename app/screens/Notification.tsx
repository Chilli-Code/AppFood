import CustomHeader from '@/components/CustomHeader';
import { getOrdersByUser } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersList() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchOrders = async () => {
    if (!user?.$id) return;
    setLoading(true);
    try {
      const userOrders = await getOrdersByUser(user.$id);
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);



  const handleViewDetails = (orderId: string) => {
    router.push(`/screens/order-detail?orderId=${orderId}`);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-10">
        <Text>{t('no_orders_yet') || "No tienes pedidos aún."}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 px-4 py-5 bg-white">
      <CustomHeader title={t('notifications') || "Pedidos"} rightIcon={false} />

      <FlatList
        data={orders}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="border p-4 mb-3 rounded-lg" style={{ backgroundColor: "#f9f9f9" }}>
            <Text className="font-bold mb-1">Estado: {item.status}</Text>
            <Text>Total: ${item.totalPrice.toFixed(2)}</Text>
            <Text>Dirección: {item.deliveryAddress}</Text>

            <View className="flex-row gap-2 mt-2">
              <TouchableOpacity
                onPress={() => handleViewDetails(item.$id)}
                className="flex-1 bg-blue-500 p-2 rounded"
              >
                <Text className="text-white text-center font-semibold">Ver detalles</Text>
              </TouchableOpacity>


            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
