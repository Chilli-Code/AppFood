const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig } = require('expo/metro-config');
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

let config = getDefaultConfig(__dirname);

// Primero aplica configuración Sentry, pasándole la config base
config = getSentryExpoConfig(__dirname, config);

// Luego aplica configuración NativeWind encima de la config con Sentry
module.exports = withNativeWind(config, { input: './app/global.css' });
