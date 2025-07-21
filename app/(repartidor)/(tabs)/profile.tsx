import { images } from '@/constants';
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function RepartidorProfile() {
    const { t } = useTranslation();

    const { isAuthenticated, isLoading, user } = useAuthStore();
    const logout = useAuthStore((state) => state.logout);


  const avatarUrl = user?.avatar;

    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/sign-in");
    };
    const editinfo = () => {
      router.push('/screens/EditProfile'); 
    };

    return (
 <SafeAreaView className="bg-[#FAFAFA] flex-1">
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
        }}
      >

        {/* Profile Picture and Edit Icon */}
        <View className="flex items-center mb-6">
          <View className="relative">
            <Image
              source={{ uri: user?.avatar }}
              className="w-24 h-24 rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute border border-white-100 bottom-0 right-2 bg-white-200 rounded-full p-1">
              <Image source={images.pencil} className="w-4 h-4" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View className="bg-white rounded-xl p-2 shadow-md">
          <View className="mb-5 rounded-lg p-3 flex-row items-center">
            <View className="flex items-center justify-center mr-2.5 w-12 h-12 rounded-full p-4"
              style={{
                paddingLeft: 17,
                paddingRight: 17,
                backgroundColor: 'rgba(254, 184, 0, 0.05)'
              }}>
              <Image source={images.user} className="w-6 h-6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-100 text-left font-[400]">{t('lbfullname')}</Text>
              <Text className="text-dark-100 font-semibold text-left mt-1">{user?.name}</Text>
            </View>
          </View>
          <View className="mb-5  rounded-lg p-3 flex-row items-center">
            <View className="flex items-center justify-center mr-2.5 w-12 h-12 rounded-full p-4"
              style={{
                paddingLeft: 17,
                paddingRight: 17,
                backgroundColor: 'rgba(254, 184, 0, 0.05)'
              }}>
              <Image source={images.envelope} className="w-6 h-6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-100 text-left font-[400]">{t('lbemail')}</Text>
              <Text className="text-dark-100 font-semibold text-left mt-1">{user?.email}</Text>
            </View>
          </View>
          <View className="mb-5 rounded-lg p-3 flex-row items-center">
            <View className="flex items-center justify-center mr-2.5 w-12 h-12 rounded-full p-4"
              style={{
                paddingLeft: 17,
                paddingRight: 17,
                backgroundColor: 'rgba(254, 184, 0, 0.05)'
              }}>
              <Image source={images.phone} className="w-6 h-6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-100 text-left font-[400]">{t('lblphone')}</Text>
              <Text className="text-dark-100 font-semibold text-left mt-1">{user?.phone?.trim() ? user.phone : 'No agregado'}</Text>
            </View>
          </View>

        </View>

        {/* Buttons */}
        <View className="mt-6">
          <TouchableOpacity
            className="border border-primary bg-primary bg-opacity-5 py-3 mb-3"
            onPress={editinfo}
            style={{ backgroundColor: 'rgba(254, 184, 0, 0.05)', borderRadius: 100 }}
          >
            <Text className="text-center text-primary font-semibold">{t('bteditprofile')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row justify-center items-center border border-error bg-error bg-opacity-5 rounded-lg py-3 mb-3"
            style={{ backgroundColor: 'rgba(241, 65, 65, 0.05)', borderRadius: 100 }}
          >
            <Image source={images.logout} className="w-6 h-6 mx-1" />
            <Text className="text-center text-error font-semibold">{t('log_out')}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
    );
}
