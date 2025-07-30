import HeaderPr from '@/components/HeaderPr';
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import cn from 'clsx';
import React, { Fragment, useState } from "react";
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import WelcomeModal from '@/components/WelcomeModal';

import { router } from 'expo-router';

export default function Index() {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  // console.log("USER", JSON.stringify(user, null, 2));


  // 👇 Redirigir si es repartidor
  React.useEffect(() => {
    if (user?.role === "repartidor") {
      router.replace("/(repartidor)/delivery");
    }
  }, [user]);

  // Mostrar modal solo si es cliente
  React.useEffect(() => {
    if (user?.role === "cliente") {
      setShowWelcomeModal(true);
    }
  }, [user]);

  const handleCloseModal = () => setShowWelcomeModal(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          const titleKey = item.title.toLowerCase().replace(/\s+/g, "_"); // ej: SUMMER COMBO → summer_combo
          const translatedTitle = t(titleKey);

          return (
            <View>
              <Pressable
                className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
                onPress={() => {
                  const categoryIdMap: Record<string, string> = {
                    "BURGER BASH": "687710cf00061a280c43",    // Burgers
                    "PIZZA PARTY": "687710cf001ae445bb86",     // Pizzas
                    "BURRITO DELIGHT": "687710cf002fb1348770", // Burritos
                    "SUMMER COMBO": "687710d10006032a5b67",    // Bowls
                  };

                  const id = categoryIdMap[item.title];
                  if (!id) return;

                  router.push({
                    pathname: "/screens/menu-category",
                    params: {
                      categoryId: id,
                      name: item.title,
                    },
                  });
                }}

              >
                {({ pressed }) => (
                  <Fragment>
                    <View className={"h-full w-1/2"}>
                      <Image source={item.image} className={"size-full"} resizeMode={"contain"} />
                    </View>

                    <View className={cn("offer-card__info", isEven ? 'pl-10' : 'pr-10')}>
                      <Text className="h1-bold text-white leading-tight">
                        {translatedTitle}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor="#ffffff"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          )
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => {

          return <HeaderPr />;
        }} />

      {/* Aquí la modal */}
      <WelcomeModal
        visible={showWelcomeModal}
        onClose={handleCloseModal}
        userName={user?.name}
      />
    </SafeAreaView>
  );
}