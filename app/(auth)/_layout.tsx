import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
export default function AuthLayout() {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) return <Redirect href="/" />

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25 }}>
                    <ImageBackground
                        source={images.loginGraphic}
                        className="size-full rounded-b-lg" resizeMode="stretch">

                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
                            style={{
                                flex: 1,
                                borderBottomLeftRadius: 26,
                                borderBottomRightRadius: 26,
                                bottom: 30,
                            }}
                        />
                        <View className="absolute top-32 left-0 right-0 rounded-t-lg p-5">
                            <Text className="text-center text-4xl text-white-100 font-bold">{t('get_started')}</Text>
                            <Text className="text-center mt-6 text-white-100 text-base font-light ">{t('create_explore')}</Text>
                        </View>

                    </ImageBackground>
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" />
                </View>
                <Slot />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}