// components/OrderProcessingModal.tsx
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

interface OrderProcessingModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function OrderProcessingModal({ visible, onClose }: OrderProcessingModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const animationRef = useRef<LottieView>(null);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
      animationRef.current?.play();
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
      enablePanDownToClose
      onDismiss={onClose}
      handleIndicatorStyle={{ backgroundColor: 'gray' }}
      backgroundStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView className="flex-1 p-5 justify-between items-center">
        <View className="items-center" style={{ width: 200, height: 200 }}>
          <LottieView
            ref={animationRef}
            source={require('@/assets/animations/sendSuccess.json')}
            autoPlay={true}
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>
        <Text className="text-xl font-bold mt-2 mb-1 text-center">
          {t('your_order_is_processing')}
        </Text>
        <Text className="text-base text-gray-700 text-center">
          {t('please_wait')}
        </Text>

        <Pressable
          onPress={onClose}
          className="bg-blue-600 rounded-md py-3 px-6 mt-4 w-full"
        >
          <Text className="text-white text-center font-semibold">{t('close')}</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
