import { images } from "@/constants";

import { router } from "expo-router";
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const NotificationButton = () => {



    return (
        <TouchableOpacity className="cart-btn" onPress={() => router.push('/screens/Notification')}>
            <Image source={images.notification} className="size-10" resizeMode="contain" />

            
                <View className="cart-badge">
                    <Text className="small-bold text-white">1</Text>
                </View>
            
        </TouchableOpacity>
    )
}
export default NotificationButton;