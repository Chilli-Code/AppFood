// app/components/DeliveryMap.tsx


import MapViewSection from '@/components/DeliveryMap';
import { images } from '@/constants';
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DeliveryMap = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // hooks
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%",], []);

  // callbacks


  return (
    <View className="flex-1">
      {/* ---------- MAPA ---------- */}
      <MapViewSection />


      {/* ---------- PANEL DE INFORMACIÓN ---------- */}
      <GestureHandlerRootView style={{ ...StyleSheet.absoluteFillObject, zIndex: 11, }}>
        <View className="absolute top-9 w-full flex-row justify-between items-center px-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white-200 rounded-full"
          >
            <Image source={images.arrowBack} resizeMode="center" />
          </TouchableOpacity>
          <View className="flex justify-center">
            <Text className="text-dark-100 text-center font-semibold text-xl">Delivered your order</Text>
          </View>
          <View className="flex justify-center"></View>
        </View>


        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}

          handleIndicatorStyle={{
            backgroundColor: 'orange',  // aquí el color que quieras

          }}

        >
          <View className=" w-full">
            <View className="bg-[#101010]">
              <View className="bg-white mx-6 my-5 rounded-full px-3 py-3 flex-row justify-between">
                <View className="flex-row items-center gap-2 justify-between">
                  <View className="flex justify-center items-center">
                    <Image source={images.avatar} resizeMode="stretch" className="w-11 h-11" />
                  </View>
                  <View className="flex justify-center items-center flex-row">
                    <Text className="text-dark-100 font-semibold">Cristopert Dastin</Text>
                  </View>
                </View>

                <View className="flex-row gap-2 justify-between">
                  <Image source={images.message} className="w-11 h-11" resizeMode="cover" />
                  <Image source={images.callMapa} className="w-11 h-11" resizeMode="cover" />
                </View>
              </View>

            </View>

            <View className="mt-4 p-5">
              <Text className="text-dark-100 font-semibold">Su plazo de entrega</Text>
              <Text className="text-gray-200 font-light">Estimated 8:30 - 9:15 PM</Text>
            </View>

            <View className="flex justify-center items-center mt-5 pr-3 pl-1">
              
            </View>
            <View className="mt-5 p-5">
              <Text className="text-dark-100 font-semibold">Order</Text>
              <View className="flex-row justify-between">
                <Text className="text-gray-200 font-light">2 Burger With Meat</Text>
                <Text className="text-gray-200 font-light">$283</Text>
              </View>
            </View>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,



  },
  contentContainer: {
    flex: 1,

    alignItems: 'center',
  },
  bg: {
    backgroundColor: '#000',
  }
});

export default DeliveryMap;