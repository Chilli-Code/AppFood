import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

interface DeleteOrderModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DeleteOrderModal({ visible, onClose }: DeleteOrderModalProps) {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const animationRef = React.useRef<LottieView>(null);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
      animationRef.current?.play();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="none" />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={['45%']}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      onDismiss={onClose}
      handleIndicatorStyle={{ backgroundColor: 'gray' }}
      backgroundStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView className="flex-1 p-5 justify-between items-center">
        <View style={{ width: 200, height: 200 }} className="items-center">
          <LottieView
            ref={animationRef}
            source={require('@/assets/animations/delete.json')} // Ruta a tu animación delete
            autoPlay={true}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <Text className="text-xl font-bold mt-2 mb-1 text-center">{t('order_deleted')}</Text>
        

        <Pressable
          onPress={() => bottomSheetModalRef.current?.dismiss()}
          className="bg-red-600 rounded-md py-3 px-6 mt-4 w-full"
        >
          <Text className="text-white text-center font-semibold">{t('close')}</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
