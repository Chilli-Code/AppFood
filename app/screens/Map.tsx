// app/components/DeliveryMap.tsx
import { images } from "@/constants";
import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // ← importa así

import BottomSheet from '@gorhom/bottom-sheet';

const DeliveryMap = () => {
      const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <View className="flex-1">
      {/* ---------- MAPA ---------- */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.015,   // un poquito más de zoom
          longitudeDelta: 0.015,
        }}
        showsUserLocation                                   // muestra la posición del usuario (si das permisos)
      >
        {/* Marcador del local */}
        <Marker
          coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
          title="Restaurante"
          description="Tu comida sale de aquí"
        />

        {/* Marcador del repartidor */}
        <Marker
          coordinate={{ latitude: 37.7849, longitude: -122.4194 }}
          pinColor="#FBBF24"         // amarillo Tailwind → rgb(251 191 36)
          title="Repartidor"
          description="En camino"
        />
      </MapView>

      {/* ---------- PANEL DE INFORMACIÓN ---------- */}
        <BottomSheet
        ref={bottomSheetRef}
        index={1}
        
              snapPoints={['55%']}

        backgroundStyle={{ backgroundColor: 'red', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        {/* Rider */}
        <View className="flex-row items-center">
          <Image
            source={images.avatar}   // pon aquí la URL real del avatar
            className="w-12 h-12 rounded-full mr-3"
          />
          <View>
            <Text className="font-semibold text-base">Cristopert Dastin</Text>
            <Text className="text-gray-500 text-xs">ID 213752</Text>
          </View>
        </View>

        {/* Hora estimada */}
        <Text className="mt-3 text-gray-500">Your delivery time</Text>
        <Text className="font-bold text-lg">Estimated 8:30 – 9:15 PM</Text>

        {/* Pedido */}
        <View className="flex-row items-center mt-4">
          <Text className="mr-2 text-gray-500">Order:</Text>
          <Text className="font-semibold">2 Burger with Meat</Text>
        </View>

        {/* Importe */}
        <Text className="font-bold text-xl mt-2">$283</Text>

        {/* Botón llamar */}
        <TouchableOpacity className="mt-4 bg-yellow-600 py-3 rounded-full active:opacity-80">
          <Text className="text-white text-center font-semibold">Call</Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
};

export default DeliveryMap;
