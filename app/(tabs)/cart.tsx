import CartItems from '@/components/CartItems';
import CustomButton from '@/components/CustomButton';
import CustomHeader from '@/components/CustomHeader';
import OrderProcessingModal from '@/components/ui/OrderProcessingModal';
import { images } from '@/constants';
import { createOrder } from '@/lib/appwrite';
import useAuthStore from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import cn from 'clsx';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}) => (
  <View className="flex-between flex-row my-1">
    <Text className={cn('paragraph-medium text-gray-200', labelStyle)}>{label}</Text>
    <Text className={cn('paragraph-bold text-dark-100', valueStyle)}>{value}</Text>
  </View>
);

const EmptyCartAnimation = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 justify-center items-center" style={{ height: 300 }}>
      <LottieView
        source={require('@/assets/animations/no_Item_Found.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Text className="mt-4 text-center text-gray-500 text-lg">{t('your_cart_is_empty')}</Text>
    </View>
  );
};

export default function Cart() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const router = useRouter();
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

  const [modalVisible, setModalVisible] = useState(false);

  const handleOrderNow = async () => {
    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    try {
      const userAddresses = user.addresses ? JSON.parse(user.addresses) : [];
      const firstAddress = userAddresses.length > 0 ? userAddresses[0] : null;
      const deliveryAddress = firstAddress ? JSON.stringify(firstAddress) : '';

      const orderData = {
        userId: user.$id,
        repartidorId: null,
        status: 'pending',
        totalPrice: totalPrice + 5 - 0.5,
        deliveryAddress,
        items: JSON.stringify(items),
      };

      await createOrder(orderData);
      clearCart();

      setModalVisible(true);

    } catch (e) {
      Alert.alert('Error al crear pedido', String(e));
    }
  };

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    router.push('/screens/Notification');
  }, [router]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItems item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => (
          <CustomHeader
            title={t('your_cart')}
            rightIcon={images.setting}
            onRightPress={() => router.push('/screens/Setting')}
          />
        )}
        ListEmptyComponent={EmptyCartAnimation}
        ListFooterComponent={() => (
          <View className="gap-5">
            <View className="mt-6 border border-[#EDEDED] p-6 rounded-2xl">
              <Text className="h3-bold text-dark-100 mb-5">{t('payment_summary')}</Text>

              <PaymentInfoStripe label={t('total_items', { count: totalItems })} value={`$${totalPrice.toFixed(2)}`} />
              <PaymentInfoStripe label={t('delivery_fee')} value={`$5.00`} />
              <PaymentInfoStripe label={t('discount')} value={`- $0.50`} valueStyle="!text-success" />

              <View className="border-t border-gray-100 my-2" />
              <PaymentInfoStripe
                label={t('total')}
                value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                labelStyle="base-bold !text-dark-100"
                valueStyle="base-bold !text-dark-100 !text-right"
              />

              <CustomButton title={t('order_now')} onPress={handleOrderNow} />
            </View>
          </View>
        )}
      />

      <OrderProcessingModal visible={modalVisible} onClose={handleCloseModal} />
    </SafeAreaView>
  );
}
