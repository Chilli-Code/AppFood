import CustomHeader from '@/components/CustomHeader';
import { ChevronRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LanguageModal from '@/components/LanguageModal';
import CustomSwitch from '@/components/ui/CustomSwitch';
import { useLanguage } from '@/hooks/useLanguage';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next'; // <-- Importa el hook

const Setting = () => {
    const { t } = useTranslation(); // <-- Usa el hook

    const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(true);
    const langSheetRef = useRef<BottomSheetModal>(null);

    const { language, changeLanguage, loaded } = useLanguage();
    const [showLanguageModal, setShowLanguageModal] = useState(false);
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
                            onToggle={() => setPushNotificationsEnabled(prev => !prev)}
                        />
                    </View>

                    <View className="flex-row mt-9 items-center justify-between ">
                        <Text className="text-base">{t('location')}</Text>
                        <CustomSwitch
                            value={pushNotificationsEnabled}
                            onToggle={() => setPushNotificationsEnabled(prev => !prev)}
                        />
                    </View>

                    <View className="flex-row mt-9 items-center justify-between ">
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
                <Text className="text-gray-500 text-sm font-medium mb-1">{t('other')}</Text>
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
