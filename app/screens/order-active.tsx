import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import { getActiveOrderByUser } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderActive() {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !user.$id) {
        console.warn("⛔ No hay user.$id cargado aún", user);
        return;
      }
      console.log("🔍 Buscando pedido para user.accountId:", user.accountId);

      try {
        const activeOrder = await getActiveOrderByUser(user.$id);


        console.log("✅ Pedido encontrado:", activeOrder);
        setOrder(activeOrder);
      } catch (error) {
        console.error("❌ Error buscando pedido activo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user]);


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center px-10">
        <Text className="text-lg text-center text-gray-700">
          No tienes pedidos activos por el momento.
        </Text>
      </View>
    );
  }


  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <CustomHeader title="Tus Pedidos" />
      <Text className="text-xl font-bold text-center my-5">Tu Pedido en Curso</Text>

      <View className="bg-gray-100 rounded-xl p-4 mb-4">
        <Text className="text-gray-700 font-semibold mb-1">Estado:</Text>
        <Text className="text-black mb-2">{order.status}</Text>

        <Text className="text-gray-700 font-semibold mb-1">Total:</Text>
        <Text className="text-black mb-2">${order.totalPrice.toFixed(2)}</Text>

        <Text className="text-gray-700 font-semibold mb-1">Dirección:</Text>
        <Text className="text-black">{order.deliveryAddress}</Text>
      </View>

      {order.repartidorId && (
        <View className="bg-gray-100 rounded-xl p-4">
          <Text className="text-gray-700 font-semibold mb-2">Tu repartidor</Text>
          <View className="flex-row items-center gap-3">
            <Image
              source={images.avatar}
              className="w-12 h-12 rounded-full"
              resizeMode="cover"
            />
            <Text className="text-black">Repartidor asignado</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
