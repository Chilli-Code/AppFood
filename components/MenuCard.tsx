import { appwriteConfig } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { useRouter } from "expo-router";
import { useTranslation } from 'react-i18next';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';

const MenuCard = ({ item: { $id, image_url, name, price } }: { item: MenuItem }) => {
      const { t } = useTranslation();

    const router = useRouter();
    const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;
    const { addItem } = useCartStore();

    return (
        <TouchableOpacity
          className="menu-card"
          style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787' } : {}}
          onPress={() => router.push(`/screens/${$id}`)} 
        >
            <Image source={{ uri: imageUrl }} className="size-32 absolute -top-10" resizeMode="contain" />
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <Text className="body-regular text-gray-200 mb-4">{t('from')} ${price}</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation(); // Evita que el click en "Add to Cart" dispare la navegación
                addItem({ id: $id, name, price,  image_url: imageUrl, customizations: [] });
              }}
            >
                <Text className="paragraph-bold text-primary">{t('add_to_cart')} +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard;
