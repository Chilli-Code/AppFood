import CustomHeader from "@/components/CustomHeader";
import IngredientSelector from "@/components/IngredientSelector";
import { images } from "@/constants";
import { appwriteConfig, getMenuItemById } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

export default function MenuDetail() {
const { i18n, t } = useTranslation();
  const currentLang = i18n.language; 

  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();          // <── IMPORTANTE
  const [menuItem, setMenuItem] = useState<MenuItem & { image_url: string } | null>(null);

  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (!id) return;
    async function fetchMenuItem() {
      setLoading(true);
      try {
        const item = await getMenuItemById(id);
        setMenuItem((item as MenuItem) ?? null);
        console.log("Image URL desde Appwrite:", item?.image_url);
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
        <Text className="text-lg font-semibold text-center">Item no encontrado</Text>
      </View>
    );
  }



  return (
    <SafeAreaView className="bg-white flex-1">
      {/* El ScrollView solo contiene el contenido scrollable */}
      <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 100 }}>
        <CustomHeader title={t('Detalles')} rightIcon={false} />

        {/* Resto del contenido que ya tenías */}
        <View className="flex flex-row gap-2">
          <View className="w-[50%] px-4 flex-col">
            <View className="mt-5">
              <Text className="h1-bold text-dark-100 font-semibold mb-2">{menuItem.name}</Text>
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
              <Text className="text-base text-center text-gray-200 font-normal mb-2">
                {t('calories')}:{"\n"}
                <Text className="text-dark-100 font-semibold">{menuItem.calories} Call</Text>
              </Text>
              <Text className="text-base text-center text-gray-200 font-normal mb-2">
                 {t('protein')}:{"\n"}
                <Text className="text-dark-100 font-semibold text-center">{menuItem.protein}g</Text>
              </Text>
            </View>

            <View className="mt-3">
              <Text className="text-base text-gray-200 font-normal">
                Bun Type{"\n"}
                <Text className="text-dark-100 font-semibold text-center">Whole Wheat</Text>
              </Text>
            </View>
          </View>

          <View className="w-[50%] flex items-center shadow-md p-2">
            <Image 
            source={{ uri: `${menuItem.image_url}?project=${appwriteConfig.projectId}` }}
            className="w-[290px] h-[305px]"
            resizeMode="contain"
            />
          </View>
        </View>

        {/* Más contenido… */}
        <View className="bg-custom-orange-transparent p-2 rounded-[100px]">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center justify-between">
              <Image source={images.dollar} resizeMode="contain" className="size-6" />
              <Text className="text-sm font-semibold text-dark-100">{t('freedeliver')}</Text>
            </View>
            <View className="flex-row items-center">
              <Image source={images.clock} resizeMode="contain" className="size-4 mr-2" />
              <Text className="text-sm font-semibold text-dark-100">20 - 30 mins</Text>
            </View>
            <View className="flex-row items-center">
              <Image source={images.star} resizeMode="contain" className="size-5 mr-2" />
              <Text className="text-sm font-semibold text-dark-100">4.5</Text>
            </View>
          </View>
        </View>

        <View className="mt-3 p-4">
          <Text className="text-base font-normal text-[#6A6A6A]">{menuItem.description}</Text>
        </View>

        <View className="flex-col justify-between mb-1 p-4">
          <Text className="text-lg font-semibold text-dark-100">Toppings</Text>
        </View>
        <IngredientSelector />

        <View className="flex-col justify-between mt-6 p-4">
          <Text className="text-lg font-semibold text-dark-100">Side options</Text>
        </View>
        <IngredientSelector />
      </ScrollView>

      {/* FOOTER FIJO (ahora está fuera del ScrollView) */}
      <View
        style={[
          styles.footer,
          { marginBottom: insets.bottom },   // respeta la zona segura
        ]}
        className="absolute bottom-0 left-0 right-0 p-5 flex-row justify-between items-center"
      >
        <View className="flex flex-row items-center gap-x-4">
          <TouchableOpacity
            className="cart-item__actions"
            onPress={() => setQuantity(prev => Math.max(1, prev - 1))}
          >
            <Image source={images.minus} className="size-1/2" resizeMode="contain" tintColor={"#FF9C01"} />
          </TouchableOpacity>

          <Text className="base-bold text-dark-100">{quantity}</Text>

          <TouchableOpacity
            className="cart-item__actions"
            onPress={() => setQuantity(prev => prev + 1)}
          >
            <Image source={images.plus} className="size-1/2" resizeMode="contain" tintColor={"#FF9C01"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-primary flex-row gap-2 items-center px-5 py-4 rounded-[100px] shadow-lg"
          onPress={() => {
            addItem({
              id: `item-${menuItem.$id}`,
              name: menuItem.name,
              price: menuItem.price,
              image_url: menuItem.image_url ?? menuItem.imageUrl ?? '',
              quantity: quantity,
              customizations: [],
            });
            console.log(addItem);
            Toast.show({
              type: 'success',
              text1: t('added_to_cart'),
              text2: `${menuItem.name}`,
              position: 'top',
              visibilityTime: 2000,
            });
          }}
        >
          <Image source={images.bag} className="size-5" resizeMode="contain" />
          <Text className="text-white text-center font-normal text-sm">{t('add_cart')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginHorizontal: 20,
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});