import CustomHeader from '@/components/CustomHeader';
import { getCurrentUser, updateProfile } from '@/lib/appwrite'; // 👈
import useAuthStore from '@/store/auth.store';
import { User } from '@/type';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { LocateFixed } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const EditProfile = () => {
  const { t } = useTranslation();

  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser); // 👈 para actualizar el store
  const [name, setName] = useState(user?.name || '');

  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState(user?.gender || ''); // Puede ser un select o texto simple
  const [address, setAddress] = useState(user?.addresses ? JSON.parse(user.addresses)[0]?.address || '' : '');
  const [locationLoading, setLocationLoading] = useState(false);

  // Para las direcciones, recuerda que en la base de datos las guardas como JSON string, aquí las manejamos como array:
  const [addresses, setAddresses] = useState<Array<{ type: string; address: string; lat: number; lng: number }>>(() => {
    if (user?.addresses) {
      try {
        return JSON.parse(user.addresses);
      } catch {
        return [];
      }
    }
    return [];
  });
  const getLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Permiso para acceder a la ubicación fue denegado');
        setLocationLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      if (!location) throw new Error('No se pudo obtener ubicación');

      // Puedes obtener la dirección textual con reverse geocode:
      const [placemark] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const formattedAddress = `${placemark?.street || ''}, ${placemark?.city || ''}, ${placemark?.region || ''}`;

      setAddress(formattedAddress);

      // Actualiza también en addresses:
      setAddresses([{
        type: 'hogar',
        address: formattedAddress,
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }]);

    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    } finally {
      setLocationLoading(false);
    }
  };



  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Completa el nombre');
      return;
    }

    try {
      await updateProfile({
        name,
        phone,
        gender,
        addresses
      });

      const updatedUser = await getCurrentUser();

      setUser(updatedUser as unknown as User);
            Toast.show({
              type: 'success',
              text1: t('message_update_profile'),
              position: 'top',
              visibilityTime: 2000,
            });
     
      router.back();
    } catch (e) {
      Alert.alert('Error', String(e));
    }
  };



  return (
<SafeAreaView className="flex-1 bg-white p-4">
  <CustomHeader title={t('titleeditinfo')} rightIcon={false} />

  <View className="flex-1 px-6">
    {/* Campos del formulario */}
    <Text className="text-sm text-gray-600 mb-1">{t('lbfullname')}</Text>
    <TextInput
      value={name}
      onChangeText={setName}
      className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
      placeholder={t('lbfullname')}
    />

    {/* Más campos... */}
    
    <Text className="text-sm text-gray-600 mb-1">{t('lblgender')}</Text>
    <View className="border border-gray-300 rounded-lg mb-4 p-0">
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        className=""
      >
        <Picker.Item label={t('select_gender_placeholder')} value="" />
        <Picker.Item label={t('select_genderM')} value="male" />
        <Picker.Item label={t('select_genderF')} value="female" />
      </Picker>
    </View>

    {/* Dirección y botón de ubicación */}
    <Text className="text-sm text-gray-600 mb-1">{t('lbladdress')}</Text>
    <TextInput
      value={address}
      onChangeText={setAddress}
      className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
      placeholder={t('lbladdress')}
    />

    <TouchableOpacity
      onPress={getLocation}
      className="bg-primary py-2 rounded-full mb-4 flex-row justify-center gap-2 w-52 self-start r"
      disabled={locationLoading}
    >
      <LocateFixed size={20} color="#fff" />
      <Text className="text-white text-center font-semibold">
        {locationLoading ? t('location_loading') : t('locationactual')}
      </Text>
    </TouchableOpacity>
  </View>

  {/* Botón fijo en la parte inferior */}
  <TouchableOpacity
    onPress={handleSave}
    className="bg-primary py-3 rounded-full mx-5 mb-3"
  >
    <Text className="text-white text-center font-semibold">{t('saveInfo')}</Text>
  </TouchableOpacity>
</SafeAreaView>
  );
};

export default EditProfile;
