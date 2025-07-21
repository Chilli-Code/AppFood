import 'dotenv/config';

export default {
  expo: {
    name: "FoodAPP",
    slug: "FoodAPP",
    android: {
      package: "com.chillicode.FoodAPP",
      // otras configuraciones android (si quieres)
    },
    ios: {
      bundleIdentifier: "com.chillicode.FoodAPP",
      // otras configuraciones ios (si quieres)
    },
    extra: {
      eas: {
        projectId: "2fdedd7c-6889-43ff-af52-d51f869ed4b2"
      },
      EXPO_PUBLIC_GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
      SENTRY_DSN: process.env.SENTRY_DSN,
    },
  }
};
