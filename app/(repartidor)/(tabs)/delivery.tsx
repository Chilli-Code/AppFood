import { appwriteConfig, databases } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Query } from "react-native-appwrite";

export default function DeliveryScreen() {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Buscar pedido activo asignado al repartidor
      const activeRes = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        [
          Query.equal("repartidorId", user.$id),
          Query.equal("status", "active"),
        ]
      );
      setActiveOrder(activeRes.documents[0] || null);

      // Pedidos pendientes sin repartidor
      const pendingRes = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        [Query.equal("status", "pending")]
      );
      // Filtrar pedidos sin repartidor asignado
      const pending = pendingRes.documents.filter(
        (o) => !o.repartidorId || o.repartidorId === ""
      );
      setOrders(pending);
    } catch (e) {
      Alert.alert("Error", "No se pudieron cargar los pedidos.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const acceptOrder = async (orderId: string) => {
    if (!user) return;
    if (activeOrder) {
      Alert.alert("Atención", "Ya tienes un pedido activo.");
      return;
    }

    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        orderId,
        {
          repartidorId: user.$id,
          status: "active",
        }
      );
      // Recarga lista y establece pedido activo
      fetchOrders();

      // Aquí ajusta el path si tu archivo map.tsx está en /map o /Map/map
      router.push({ pathname: "/Map/map", params: { orderId } });
    } catch (e) {
      Alert.alert("Error", "No se pudo aceptar el pedido.");
      console.error(e);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        orderId,
        {
          repartidorId: "",
          status: "pending",
        }
      );
      fetchOrders();
    } catch (e) {
      Alert.alert("Error", "No se pudo cancelar el pedido.");
      console.error(e);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-5">
      {activeOrder ? (
        <>
          <Text className="text-xl font-bold mb-4 text-center">
            Pedido en Curso
          </Text>
          <View className="p-4 bg-gray-100 rounded-xl">
            <Text className="text-lg font-semibold mb-2">
              Pedido #{activeOrder.$id}
            </Text>
            <Text>Status: {activeOrder.status}</Text>
            <Text>Total: ${activeOrder.totalPrice.toFixed(2)}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Dirección:{" "}
              {(() => {
                try {
                  const addrObj = JSON.parse(activeOrder.deliveryAddress);
                  return addrObj.address || activeOrder.deliveryAddress;
                } catch {
                  return activeOrder.deliveryAddress;
                }
              })()}
            </Text>

            <TouchableOpacity
              className="mt-4 bg-red-500 px-4 py-2 rounded"
              onPress={() => cancelOrder(activeOrder.$id)}
            >
              <Text className="text-white font-bold text-center">
                Cancelar pedido
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text className="text-xl font-bold mb-4 text-center">
            Pedidos disponibles
          </Text>
          {orders.length === 0 ? (
            <Text className="text-center text-gray-500">
              No hay pedidos para mostrar
            </Text>
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <View className="mb-4 p-4 border rounded-lg bg-white shadow">
                  <Text className="font-semibold text-lg mb-1">
                    Pedido #{item.$id}
                  </Text>
                  <Text>Status: {item.status}</Text>
                  <Text>Total: ${item.totalPrice.toFixed(2)}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    Dirección:{" "}
                    {(() => {
                      try {
                        const addrObj = JSON.parse(item.deliveryAddress);
                        return addrObj.address || item.deliveryAddress;
                      } catch {
                        return item.deliveryAddress;
                      }
                    })()}
                  </Text>

                  <TouchableOpacity
                    className="mt-3 bg-green-500 px-4 py-2 rounded"
                    onPress={() => acceptOrder(item.$id)}
                  >
                    <Text className="text-white text-center font-bold">
                      Aceptar pedido
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}
