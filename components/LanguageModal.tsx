import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (lang: string) => void; // Aquí recibimos el idioma elegido
  selectedLanguage: string;         // Idioma actualmente seleccionado (para mostrar)
}

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian',
  'Portuguese', 'Russian', 'Japanese', 'Korean',
  'Chinese', 'Arabic', 'Hindi', 'Turkish', 'Polish',
  'Dutch', 'Swedish', 'Greek', 'Thai', 'Vietnamese',
];

const FLAGS: Record<string, string> = {
  English: 'us',
  Spanish: 'es',
  French:  'fr',
  German:  'de',
  Italian: 'it',
  Portuguese: 'pt',
  Russian: 'ru',
  Japanese: 'jp',
  Korean:  'kr',
  Chinese: 'cn',
  Arabic:  'sa',
  Hindi:   'in',
  Turkish: 'tr',
  Polish:  'pl',
  Dutch:   'nl',
  Swedish: 'se',
  Greek:   'gr',
  Thai:    'th',
  Vietnamese: 'vn',
};

const screenHeight = Dimensions.get('window').height;

export default function LanguageModal({
  visible,
  onClose,
  onSelect,
  selectedLanguage,
}: LanguageModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['55%'], []);

  // Estado temporal para el idioma que se está seleccionando en el modal
  const [tempLang, setTempLang] = useState(selectedLanguage);

  // Cuando se abra/cierre el modal o cambie el idioma seleccionado desde afuera
  useEffect(() => {
    setTempLang(selectedLanguage);
    if (visible) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.dismiss();
  }, [visible, selectedLanguage]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      onDismiss={onClose}
      handleIndicatorStyle={{ backgroundColor: '#ccc' }}
      backgroundStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
          Select Language
        </Text>

        <BottomSheetScrollView
          style={{ maxHeight: screenHeight * 0.45 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => setTempLang(lang)} // Cambiar idioma temporal seleccionado
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                padding: 16,
                borderRadius: 10,
                marginBottom: 12,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: lang === tempLang ? '#f97316' : '#EAEAEA',
              }}
            >
              <View className="bg-[#F3F6FB]  rounded-full p-2">
              <Image
                source={{ uri: `https://flagcdn.com/w40/${FLAGS[lang]}.png` }}
                style={{ width: 15, height: 13, borderRadius: 4 }}
                resizeMode="stretch"
              />

              </View>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: lang === tempLang ? '#f97316' : '#222',
                }}
              >
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>

        <Pressable
          onPress={() => {
            onSelect(tempLang); // Avisamos al padre el idioma seleccionado
            onClose();          // Cerramos el modal
          }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            padding: 15,
            borderRadius: 16,
            backgroundColor: '#f97316', // color naranja para botón
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              },
              android: {
                elevation: 5,
              },
            }),
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Select
          </Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
