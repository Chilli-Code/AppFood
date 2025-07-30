// app/screens/category-items.tsx
import CartButton from '@/components/CartButton';
import MenuCard from '@/components/MenuCard';
import { images } from "@/constants";
import { getMenu } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { MenuItem } from '@/type';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CategoryItemsScreen() {
    const { t } = useTranslation();
  
  const { categoryId, name } = useLocalSearchParams<{ categoryId: string; name: string }>();
  const router = useRouter();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category: categoryId,  // ← este es el ID de la categoría
      query: '',             // ← obligatorio por el tipo GetMenuParams
    },
  });

  useEffect(() => {
    if (categoryId) {
      refetch({ category: categoryId, query: '' });
    }
  }, [categoryId]);


  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5 pt-6 pb-3 flex-row justify-between items-center mb-11">
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={images.arrowBack}
                  className="size-5"
                  resizeMode="contain"
                />
              </TouchableOpacity>
        <Text className="text-2xl font-bold">{t(name.toLowerCase().replace(/\s+/g, '_'))}</Text>
        <CartButton />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        renderItem={({ item, index }) => (
          <View className={`flex-1 max-w-[48%] ${index % 2 === 0 ? '' : 'mt-10'}`}>
            <MenuCard item={item as MenuItem} />
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && (
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-gray-500">No hay ítems disponibles.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
