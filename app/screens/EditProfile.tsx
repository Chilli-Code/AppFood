import CustomHeader from '@/components/CustomHeader';
import { account, getCurrentUser, updateProfile } from "@/lib/appwrite";
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
  const setUser = useAuthStore((s) => s.setUser);
  const isRepartidor = user?.role === "repartidor";

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [address, setAddress] = useState(user?.addresses ? JSON.parse(user.addresses)[0]?.address || '' : '');
  const [locationLoading, setLocationLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

  const hasGender = !!user?.gender;
  const [addresses, setAddresses] = useState(() => {
    if (user?.addresses) {
      try {
        return JSON.parse(user.addresses);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Para la actualización de contraseña:
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

      const [placemark] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const formattedAddress = `${placemark?.street || ''}, ${placemark?.city || ''}, ${placemark?.region || ''}`;

      setAddress(formattedAddress);

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
    // Validación básica
    if (!name.trim()) {
      Alert.alert('Error', 'Completa el nombre');
      return;
    }

    if (isRepartidor) {
      if (!email.trim()) {
        Alert.alert('Error', 'El correo es obligatorio');
        return;
      }

      // Si se quiere cambiar email o contraseña, debe ingresar la contraseña actual
      const isEmailChanged = email !== user?.email;
      const wantsPasswordChange = newPassword || confirmPassword;

      if ((isEmailChanged || wantsPasswordChange) && !currentPassword.trim()) {
        Alert.alert('Error', 'Debes ingresar tu contraseña actual');
        return;
      }

      // Validación de cambio de contraseña
      if (wantsPasswordChange) {
        if (newPassword !== confirmPassword) {
          Alert.alert('Error', 'Las contraseñas no coinciden');
          return;
        }
        if (newPassword.length < 6) {
          Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
          return;
        }
      }
    }

    try {
      // Si es repartidor, actualiza email o contraseña si corresponde
      if (isRepartidor) {
        if (email !== user?.email) {
          await account.updateEmail(email, currentPassword); // requiere contraseña actual
        }

        if (newPassword && newPassword === confirmPassword) {
          await account.updatePassword(newPassword, currentPassword); // requiere contraseña actual
        }
      }

      // Actualizamos datos comunes
      await updateProfile({
        name,
        phone,
        gender: hasGender ? user?.gender : gender,
        addresses: isRepartidor ? user?.addresses : addresses,
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
      Alert.alert('Error al actualizar perfil', String(e));
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <CustomHeader title={t('titleeditinfo')} rightIcon={false} />


      <View className="flex-1 px-6">
        {/* Campos para usuarios normales */}
        {!isRepartidor && (
          <>
            <Text className="text-sm text-gray-600 mb-1">{t('lbfullname')}</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder={t('lbfullname')}
            />
            <Text className="text-sm text-gray-600 mb-1">{t('lblgender')}</Text>
            <View className="border border-gray-300 rounded-lg mb-4 p-0">
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                enabled={!hasGender} // deshabilita si ya tiene género
              >
                <Picker.Item label={t('select_gender_placeholder')} value="" />
                <Picker.Item label={t('select_genderM')} value="male" />
                <Picker.Item label={t('select_genderF')} value="female" />
              </Picker>
            </View>
            <Text className="text-sm text-gray-600 mb-1">{t('lbphone')}</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder={t('lbphone')}
              keyboardType="phone-pad"
            />

            <Text className="text-sm text-gray-600 mb-1">{t('lbladdress')}</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder={t('lbladdress')}
            />

            <TouchableOpacity
              onPress={getLocation}
              className="bg-primary py-2 rounded-full mb-4 flex-row justify-center gap-2 w-52 self-start"
              disabled={locationLoading}
            >
              <LocateFixed size={20} color="#fff" />
              <Text className="text-white text-center font-semibold">
                {locationLoading ? t('location_loading') : t('locationactual')}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Campos para repartidores: email y password */}
        {isRepartidor && (
          <>
            <Text className="text-sm text-gray-600 mb-1">{t('lbphone')}</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder={t('lbphone')}
              keyboardType="phone-pad"
            />
                        <Text className="text-sm text-gray-600 mb-1">{t('lblgender')}(solo se puede modificar 1 sola vez)</Text>
            <View className="border border-gray-300 rounded-lg mb-4 p-0">
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                enabled={!hasGender} // deshabilita si ya tiene género
              >
                <Picker.Item label={t('select_gender_placeholder')} value="" />
                <Picker.Item label={t('select_genderM')} value="male" />
                <Picker.Item label={t('select_genderF')} value="female" />
              </Picker>
            </View>
            <Text className="text-sm text-gray-600 mb-1">{t('lbemail')}</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder={t('lbemail')}
              keyboardType="email-address"
            />


            <Text className="text-sm text-gray-600 mb-1">{t('lbcurrentpassword')}</Text>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder={t('enter_current_password')}
              secureTextEntry
            />

            <Text className="text-sm text-gray-600 mb-1">{t('lbnewpassword')}</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder={t('enter_new_password')}
              secureTextEntry
            />

            <Text className="text-sm text-gray-600 mb-1">{t('lbconfirmpassword')}</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder={t('enter_confirm_password')}
              secureTextEntry
            />

          </>
        )}
      </View>

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
