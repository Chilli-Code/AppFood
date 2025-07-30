// app/_layout.tsx (o donde tengas el código que compartiste)
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import i18n from '@/lib/i18n';
import useAuthStore from "@/store/auth.store";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';
import { I18nextProvider } from 'react-i18next';

import IntroScreen from '@/components/ui/IntroScreen'; // 👈 Importa tu intro
import Toast, { BaseToast } from 'react-native-toast-message';
import './global.css';

Sentry.init({
  dsn: 'https://2c32f1dad1bc3a3be0ef4323f1e90542@o4509662689820672.ingest.de.sentry.io/4509662977130576',
  sendDefaultPii: true,
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745', backgroundColor: '#6cd484' }}
      text1Style={{ color: 'white', fontSize: 15 }}
      text2Style={{ color: 'white', fontSize: 15 }}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#dc3545', backgroundColor: '#dc3545' }}
      text1Style={{ color: 'white', fontSize: 15 }}
      text2Style={{ color: 'white', fontSize: 15 }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#a5e6e2', backgroundColor: '#adaaaa' }}
      text1Style={{ color: 'white', fontSize: 15 }}
      text2Style={{ color: 'white', fontSize: 15 }}
    />
  ),
};

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  const [fontsLoaded, fontError] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  const [showIntro, setShowIntro] = useState(true); // Mostrar intro al inicio
  const [appReady, setAppReady] = useState(false);

  // Ocultar splash cuando termina la animación Lottie
  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  // Cuando todo esté listo, marca como listo
  useEffect(() => {
    if (!showIntro && fontsLoaded && !fontError) {
      setAppReady(true);
      SplashScreen.hideAsync();
    }
  }, [showIntro, fontsLoaded, fontError]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // Mientras se carga:
  if (showIntro) {
    return <IntroScreen onAnimationFinish={handleIntroFinish} />;
  }

  if (!appReady) return null; // Puedes poner un fallback si quieres

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast config={toastConfig} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
});