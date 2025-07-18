import CustomHeader from '@/components/CustomHeader';
import { ChevronRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LanguageModal from '@/components/LanguageModal';
import CustomSwitch from '@/components/ui/CustomSwitch';
import { useLanguage } from '@/hooks/useLanguage';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message'; // ✅ Importa el Toast


const Setting = () => {
  const { t } = useTranslation();
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const langSheetRef = useRef<BottomSheetModal>(null);
  const { language, changeLanguage, loaded } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);


  const handleToggleLocation = async () => {
    if (!locationEnabled) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('location_permission_denied'), t('location_permission_error'));
        return;
      }
      setLocationEnabled(true);
      Toast.show({
        type: 'success',
        text1: t('location_enabled'),
        position: 'top',
        visibilityTime: 2000,
      });
    } else {
      setLocationEnabled(false);
      Toast.show({
        type: 'info',
        text1: t('location_disabled'),
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };


  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      Toast.show({
        type: 'success',
        text1: 'Notificaciones activadas',
        position: 'top',
        visibilityTime: 2000,
      });
      return true;
    } else {
      Alert.alert('Permiso denegado', 'No se pudo activar las notificaciones');
      return false;
    }
  };
  const handleTogglePushNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setPushNotificationsEnabled(true);
    } else {
      setPushNotificationsEnabled(false);
    }
  };
  if (!loaded) return null;

  return (
    <SafeAreaView className="bg-white h-full px-5 py-5">
      <CustomHeader title={t('setting')} rightIcon={false} />

      <View className="px-4 mt-4">
        <Text className="text-gray-500 text-sm font-medium mb-1">{t('profile')}</Text>

        <View className="bg-white rounded-lg">
          <View className="flex-row mt-4 items-center justify-between py-2">
            <Text className="text-base">{t('push_notification')}</Text>
            <CustomSwitch
              value={pushNotificationsEnabled}
              onToggle={handleTogglePushNotifications}
            />
          </View>

          <View className="flex-row mt-9 items-center justify-between">
            <Text className="text-base">{t('location')}</Text>
            <CustomSwitch
              value={locationEnabled}
              onToggle={handleToggleLocation}
            />
          </View>

          <View className="flex-row mt-9 items-center justify-between">
            <Text className="text-base">{t('appearance')}</Text>
            <CustomSwitch
              value={locationEnabled}
              onToggle={() => setLocationEnabled(prev => !prev)}
            />
          </View>

          <View className="py-2 mt-7 flex-row items-center justify-between">
            <Text className="text-base mb-2">{t('language')}</Text>

            <View className="bg-white rounded-lg">
              <TouchableOpacity
                onPress={() => setShowLanguageModal(true)}
                className="flex-row items-center gap-2 justify-between py-4"
              >
                <Text className="text-base font-medium">{language}</Text>
                <ChevronRight className="text-orange-500" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View className="px-4 mt-4">
        <Link href={"/screens/Map"} >
          <Text className="text-gray-500 text-sm font-medium mb-1">{t('other')}</Text>
        </Link>
      </View>

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onSelect={changeLanguage}
        selectedLanguage={language}
      />
    </SafeAreaView>
  );
};

export default Setting;