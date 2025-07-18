import CustomHeader from '@/components/CustomHeader';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notification = () => {
 const { t } = useTranslation();
      const { language, changeLanguage, loaded } = useLanguage();
      
      if (!loaded) return null;
      
  return (
    <SafeAreaView  className="bg-white h-full px-5 py-5" >
      <CustomHeader title={t('notifications')} />

      <Text className="text-center text-gray-500 mt-10">{t('no notifications yet')}</Text>
      
    </SafeAreaView>
  )
}

export default Notification