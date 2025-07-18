import CartItems from '@/components/CartItems';
import CustomButton from '@/components/CustomButton';
import CustomHeader from '@/components/CustomHeader';
import { images } from '@/constants';
import { useCartStore } from '@/store/cart.store';
import { PaymentInfoStripeProps } from '@/type';
import cn from "clsx";
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
const { items, getTotalItems } = useCartStore();
const totalItems = getTotalItems();
const totalPrice = getTotalItems();
const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView className="bg-white h-full ">
      <FlatList 
        data={items}
        renderItem={({ item }) => <CartItems item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => <CustomHeader title={t('your_cart')} rightIcon={images.setting} onRightPress={() => router.push("/screens/Setting")} />}
        ListEmptyComponent={() => <Text>{t('cartitem')}</Text>}
        ListFooterComponent={() => (
          <View className="gap-5">
            <View className="mt-6 border border-gray-200 p-6 rounded-2xl">
              <Text className="h3-bold text-dark-100 mb-5">
                {t('payment_summary')}
                </Text>

                <PaymentInfoStripe 
                label={t('total_items', { count: totalItems })}
                value={`$${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe 
                label={t('delivery_fee')}
                value={`$5.00`}
                />               
                 <PaymentInfoStripe 
                label={t('discount')} 
                value={`- $0.50`}
                valueStyle="!text-success"
                />               

                <View className="border-t border-gray-100 my-2" />
                <PaymentInfoStripe 
                label={t('total')}
                value={`$${(totalPrice + 5 - 0.50).toFixed(2)}`}
                labelStyle="base-bold !text-dark-100"
                valueStyle="base-bold !text-dark-100 !text-right"
                />

                <CustomButton title={t('order_now')} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Cart;