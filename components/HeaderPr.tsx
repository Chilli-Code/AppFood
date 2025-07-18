
import CartButton from '@/components/CartButton';
import NotificationButton from '@/components/NotificationButton';
import { images } from '@/constants';

import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export default function HeaderPr() {
  const { t } = useTranslation();


  return (
    <ImageBackground
      source={images.fondohome}
      resizeMode="cover"
      className="w-screen h-[250px] mt-5 mb-8"
      style={{ padding: 20, marginHorizontal: -20 }}
    >
      {/* Top bar */}
      <View className="flex-between flex-row w-full">
        <View>
          <Text className="text-base font-bold text-primary">
           {t('your_location')}
          </Text>

          <TouchableOpacity className="flex-row items-center gap-x-1 mt-0.5">
            <Image source={images.location} className="size-5" resizeMode="contain" />
            <Text className="paragraph-bold text-white-100">New York City</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-x-4">
          <NotificationButton />
          <CartButton />
        </View>
      </View>

      {/* Texto central */}
      <View className="mt-10 w-full items-center">
        <Text className="text-white-100 text-center text-4xl">
          {t('provide_best_food')}
        </Text>
      </View>
    </ImageBackground>
  );
}
