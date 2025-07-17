import { images } from "@/constants";
import { getMenuItemById } from "@/lib/appwrite";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import CustomHeader from "@/components/CustomHeader";
import IngredientSelector from "@/components/IngredientSelector";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchMenuItem() {
      setLoading(true);
      try {
        const item = await getMenuItemById(id);
        setMenuItem((item as MenuItem) ?? null);
      } catch (error) {
        console.error(error);
        setMenuItem(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItem();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!menuItem) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-lg font-semibold text-center">
          Item no encontrado
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white flex-1 ">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
      <CustomHeader title="Detalles" rightIcon={false} />
      <View className="flex flex-row">
        {/* Text Section (Left) */}
        <View className="w-[50%] px-4 flex-col">
          <View className="mt-5">
            <Text className="h1-bold text-dark-100 font-semibold   mb-2">{menuItem.name}</Text>

          </View>
          <View className="flex-row items-center mt-4">
            <Image source={images.starts} resizeMode="contain" className="w-24 h-5 mb-2 mr-2" />
            <Text className="text-gray-500 mb-2">{menuItem.rating}</Text>
          </View>
          <Text className="text-[18px] font-semibold mb-4 mt-3">
            <Text className="text-primary">$</Text>
            {menuItem.price}
          </Text>
          <View className="flex-row gap-4 items-center mt-5">
            <Text className="text-base text-center text-gray-200 font-normal mb-2">Calorías:{"\n"}
              <Text className="text-dark-100 font-semibold">
                {menuItem.calories} Call
              </Text>
            </Text>
            <Text className="text-base text-center text-gray-200 font-normal mb-2">Proteína:{"\n"}
              <Text className="text-dark-100 font-semibold text-center">
                {menuItem.protein}g
              </Text>

            </Text>

          </View>
          <View className="mt-3">
            <Text className="text-base text-gray-200 font-normal">Bun Type {"\n"}
              <Text className="text-dark-100 font-semibold text-center">
                Whole Wheat
              </Text>
            </Text>
          </View>
        </View>

        {/* Image Section (Right) */}
        <View className="w-[50%] flex  items-center shadow-md p-2">
          <Image
            source={images.detail}
            className="w-[300px] h-[305px]"
            resizeMode="contain"
          />
        </View>
      </View>


      <View className="bg-custom-orange-transparent p-2 rounded-[100px]" >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between">
            <Image source={images.dollar} resizeMode="contain" className="size-6" />
            <Text className="text-sm font-semibold text-dark-100">
              Free Delivery
            </Text>
          </View>
          <View className="flex-row items-center ">
            <Image source={images.clock} resizeMode="contain" className="size-4 mr-2 " />
            <Text className="text-sm font-semibold text-dark-100">20 - 30 mins</Text>
          </View>
          <View className="flex-row items-center">
            <Image source={images.star} resizeMode="contain" className="size-5 mr-2" />
            <Text className="text-sm font-semibold text-dark-100">4.5</Text>
          </View>
        </View>
      </View>
      <View className="mt-3 p-4">
        <Text className="text-base font-normal  text-[#6A6A6A]">{menuItem.description}</Text>
      </View>
      <View className="flex-col justify-between mb-1 p-4">
        <View className="flex-row items-center w-full">
          <Text className="text-lg font-semibold text-dark-100">Toppings</Text>
        </View>
      </View>
      <IngredientSelector />
      <View className="flex-col justify-between mt-6 p-4">
        <View className="flex-row items-center w-full">
          <Text className="text-lg font-semibold text-dark-100">Side options</Text>
        </View>
      </View>
      <IngredientSelector />
    </ScrollView>
    </SafeAreaView >
  );
}
