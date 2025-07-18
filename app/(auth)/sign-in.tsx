import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Alert, Text, View } from "react-native";


const SignIn = () => {
        const { t } = useTranslation();
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const fetchAuthenticatedUser = useAuthStore((state) => state.fetchAuthenticatedUser);


    const submit = async () => {
        const { email, password } = form;

        if (!email || !password) return Alert.alert('Error', 'Please enter valid email address');

        setIsSubmitting(true)

        try {
            await signIn({ email, password });
            await fetchAuthenticatedUser();
            router.replace("/");
        } catch (error: any) {
            Alert.alert('Error', error.message);
            Sentry.captureEvent(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">


            <CustomInput
                placeholder={t('enter_email')}
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                label={t('lbemail')}
                keyboardType="email-address"
            />
            <CustomInput
                placeholder={t('enter_password')}
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                label={t('lbpassword')}
                secureTextEntry={true}
            />
            <CustomButton
                title={t('sign_in')}
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    {t('dont_have_account')}
                </Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    {t('sign_up')}
                </Link>
            </View>
        </View>
    )
}

export default SignIn;