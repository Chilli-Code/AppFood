// utils/entrega.ts
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';

export const reproducirSonido = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('@/assets/sounds/notification.mp3')
  );
  await sound.playAsync();
};

export const enviarNotificacion = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '¡Entrega completada!',
      body: 'El repartidor ha llegado a la tienda.',
    },
    trigger: null,
  });
};
