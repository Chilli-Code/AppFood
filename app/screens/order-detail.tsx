import CustomHeader from '@/components/CustomHeader';
import DeleteOrderModal from '@/components/ui/DeleteOrderModal'; // Ajusta la ruta si es necesario
import { deleteOrderById, getOrderById } from '@/lib/appwrite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Text, View } from 'react-native';

export default function OrderDetailScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!orderId) return;
    (async () => {
      try {
        const data = await getOrderById(orderId as string);
        setOrder(data);
      } catch (e) {
        Alert.alert('Error', t('could_not_load_order'));
      }
    })();
  }, [orderId]);

  const handleDelete = async () => {
    try {
      await deleteOrderById(orderId as string);
      setModalVisible(true); // mostrar modal en lugar de Alert
    } catch (e) {
      Alert.alert('Error', t('could_not_delete_order'));
    }
  };

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    router.back(); // vuelve atrás al cerrar modal
  }, [router]);

  if (!order) return <Text>{t('loading')}...</Text>;

  return (
    <View className="flex-1 p-4 mt-5 bg-white">
      <CustomHeader title={t('details')} rightIcon={false} />
      <Text className="text-xl font-bold mb-4">{t('order_detail')}</Text>
      <Text>{t('status')}: {order.status}</Text>
      <Text>{t('total')}: ${order.totalPrice.toFixed(2)}</Text>
      <Text>{t('address')}: {order.deliveryAddress}</Text>

      <Button title={t('view_route')} onPress={() => Alert.alert(t('not_implemented_yet'))} />

      <View className="mt-4">
        <Button title={t('delete_order')} color="red" onPress={handleDelete} />
      </View>

      <DeleteOrderModal visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}
