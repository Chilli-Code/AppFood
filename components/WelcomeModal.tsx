import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

interface WelcomeModalProps {
  visible: boolean;
  onClose: () => void;
  userName?: string;
}

export default function WelcomeModal({ visible, onClose, userName }: WelcomeModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
      animationRef.current?.play(); // Iniciar animación
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="none"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={['55%']}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      onDismiss={onClose}
      handleIndicatorStyle="bg-gray-400"
      backgroundStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView className="flex-1 p-5 justify-between items-center">
        <View className="items-center">
          <LottieView
            ref={animationRef}
            source={require('@/assets/animations/welcome.json')}
            autoPlay
            loop={true}
            style={{ width: 200, height: 200 }}
          />
          <Text className="text-xl font-bold mt-2 mb-1 text-center">
            ¡Bienvenido, {userName ?? 'Usuario'}!
          </Text>
          <Text className="text-base text-gray-700 text-center">
            Disfruta de nuestro servicio 🎉
          </Text>
        </View>

        <Pressable
          onPress={() => bottomSheetModalRef.current?.dismiss()}
          className="bg-blue-600 rounded-md py-3 px-6 mt-4 w-full"
        >
          <Text className="text-white text-center font-semibold">Cerrar</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
