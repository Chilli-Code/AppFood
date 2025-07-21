import StepProgressBar from "@/components/Progress";
import { appwriteConfig, databases } from "@/lib/appwrite";
import polyline from "@mapbox/polyline";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const orderStates = [
  { key: "taken", label: "Pedido tomado", icon: "🛎️" },
  { key: "packed", label: "Pedido empacado", icon: "📦" },
  { key: "on_the_way", label: "En camino", icon: "🚚" },
  { key: "delivered", label: "Entregado", icon: "✅" },
];

// Coordenadas fijas de la tienda (Cl. 74 #5635, Barranquilla)
const tiendaCoords = { lat: 10.968091, lng: -74.789503 };
type LatLng = { lat: number; lng: number };

const fetchRoute = async (
  origin: LatLng,
  destination: LatLng
): Promise<Array<{ latitude: number; longitude: number }>> => {
  const originStr = `${origin.lat},${origin.lng}`;
  const destStr = `${destination.lat},${destination.lng}`;

  const apiKey =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_MAPS_KEY ??
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY ??
    "";

  if (!apiKey) throw new Error("No API key configurada");
  console.log("Usando API Key:", apiKey);

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destStr}&key=${apiKey}`
  );
  const json = await res.json();

  console.log("Respuesta Google Directions API:", json);

  if (json.status !== "OK") {
    console.error("Google Directions API error:", json.status, json.error_message);
    throw new Error("No se encontró la ruta");
  }

  const points = json.routes[0]?.overview_polyline?.points;
  if (!points) throw new Error("No se encontró la ruta");

  const decoded = polyline.decode(points);
  return decoded.map(([latitude, longitude]) => ({ latitude, longitude }));
};

export default function DeliveryMap() {
  const params = useLocalSearchParams();
  const orderId = params.orderId as string | undefined;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [orderStateIndex, setOrderStateIndex] = useState(0);
  const [routeCoords, setRouteCoords] = useState<
    Array<{ latitude: number; longitude: number }>
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!orderId) {
      Alert.alert("Error", "No se encontró el ID del pedido");
      router.back();
      return;
    }

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.ordersCollectionId,
          orderId
        );
        setOrder(res);

        if (res.deliveryAddress) {
          try {
            const addrObj = JSON.parse(res.deliveryAddress);
            if (addrObj?.lat && addrObj?.lng) {
              setCoords({ lat: addrObj.lat, lng: addrObj.lng });
            } else {
              setCoords(null);
            }
          } catch {
            setCoords(null);
          }
        }

        const idx = orderStates.findIndex((s) => s.key === res.status);
        setOrderStateIndex(idx >= 0 ? idx : 0);
      } catch (e) {
        Alert.alert("Error", "No se pudo cargar el pedido");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  useEffect(() => {
    if (!coords) return;

    fetchRoute(tiendaCoords, coords)
      .then(setRouteCoords)
      .catch(() => {
        Alert.alert("Error", "No se pudo obtener la ruta");
        setRouteCoords([]);
      });
  }, [coords]);

  useEffect(() => {
    if (routeCoords.length === 0) return;
    if (currentIndex >= routeCoords.length - 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= routeCoords.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [routeCoords, currentIndex]);

  useEffect(() => {
    if (routeCoords.length === 0) return;

    const coord = routeCoords[currentIndex];
    mapRef.current?.animateToRegion(
      {
        latitude: coord.latitude,
        longitude: coord.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500
    );
  }, [currentIndex, routeCoords]);

  const updateOrderState = async () => {
    if (!order) return;

    if (orderStateIndex >= orderStates.length - 1) {
      Alert.alert("Pedido completado", "Has completado todos los pasos del pedido.");
      return;
    }

    const nextStateIndex = orderStateIndex + 1;
    const nextState = orderStates[nextStateIndex].key;

    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        order.$id,
        { status: nextState }
      );
      setOrderStateIndex(nextStateIndex);
      setOrder((prev: any) => ({ ...prev, status: nextState }));
      Alert.alert(
        "Estado actualizado",
        `Pedido marcado como "${orderStates[nextStateIndex].label}"`
      );
    } catch (e) {
      Alert.alert("Error", "No se pudo actualizar el estado del pedido");
      console.error(e);
    }
  };

  const cancelOrder = async () => {
    if (!order) return;

    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        order.$id,
        {
          repartidorId: "",
          status: "pending",
        }
      );
      router.replace("/delivery");
    } catch (e) {
      Alert.alert("Error", "No se pudo cancelar el pedido");
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

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text>No se encontró el pedido</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {routeCoords.length > 0 ? (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: routeCoords[0].latitude,
            longitude: routeCoords[0].longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
        >
          {/* Tienda */}
          <Marker
            coordinate={{ latitude: tiendaCoords.lat, longitude: tiendaCoords.lng }}
            title="Tienda"
            description="Sucursal La Troja"
          />

          {/* Repartidor animado */}
          <Marker
            coordinate={routeCoords[currentIndex]}
            title="Repartidor"
            description="En camino"
          />

          {/* Ruta */}
          <Polyline coordinates={routeCoords} strokeColor="#FE8C00" strokeWidth={4} />
        </MapView>
      ) : (
        <View className="flex-1 justify-center items-center p-5">
          <Text>Cargando ruta...</Text>
        </View>
      )}

      {/* Info pedido + botones */}
      <View className="p-4 bg-gray-100">
        <Text className="text-lg font-semibold mb-1">Pedido #{order.$id}</Text>
        <Text>
          Status: {orderStates[orderStateIndex].icon} {orderStates[orderStateIndex].label}
        </Text>
        <Text>Total: ${order.totalPrice.toFixed(2)}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          Dirección:{" "}
          {(() => {
            try {
              const addrObj = JSON.parse(order.deliveryAddress);
              return addrObj.address || "";
            } catch {
              return order.deliveryAddress;
            }
          })()}
        </Text>

        <TouchableOpacity
          className="mt-3 bg-red-500 py-2 rounded"
          onPress={cancelOrder}
        >
          <Text className="text-white text-center font-bold">Cancelar pedido</Text>
        </TouchableOpacity>

        <View className="mt-3">
          <StepProgressBar status={order.status} />
        </View>

        <TouchableOpacity
          className="mt-4 bg-blue-600 py-3 rounded"
          onPress={updateOrderState}
          disabled={orderStateIndex === orderStates.length - 1}
        >
          <Text className="text-white text-center font-bold">
            {orderStateIndex === orderStates.length - 1
              ? "Pedido completado"
              : `Siguiente estado: ${orderStates[orderStateIndex + 1].label}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
