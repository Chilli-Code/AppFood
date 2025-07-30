// components/IntroScreen.tsx
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const IntroScreen = ({ onAnimationFinish }: { onAnimationFinish: () => void }) => {
  return (
    <View style={styles.container}>
      <View className="flex justify-center mt-11 items-center">
        <Text className="text-dark-100 text-3xl font-bold">
          Chilly Food
        </Text>
      </View>
      <LottieView
        source={require('@/assets/animations/introFood.json')} // Ruta a tu JSON
        autoPlay
        loop={false} // Para que termine y siga adelante
        onAnimationFinish={onAnimationFinish} // Cuando termina, llama a esta función
        resizeMode="contain"
        style={{
          flex: 1,
          width: "100%"
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fondo blanco u otro color
  },
});

export default IntroScreen;