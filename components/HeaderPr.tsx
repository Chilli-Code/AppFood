import CartButton from '@/components/CartButton';
import { images } from '@/constants';
import React, { Component } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import NotificationButton from './NotificationButton';
export class HeaderPr extends Component {
    render() {
        return (
<ImageBackground
  source={images.fondohome}
  resizeMode="cover"
  className="w-screen h-[250px] mt-5 mb-8"
  style={{
    padding: 20,
    marginHorizontal: -20,
    position: 'relative', 
  }}
>
  {/* Top: ubicación y botones */}
  <View className="flex-between flex-row w-full">
    <View className="flex-start">
      <Text className="text-base font-bold text-primary">Your Location</Text>
      <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
        <Image source={images.location} className="size-5" resizeMode="contain" />
        <Text className="paragraph-bold text-white-100">New York City</Text>
      </TouchableOpacity>
    </View>

    <View className="flex-end flex-row gap-x-4">
      <NotificationButton />
      <CartButton />
    </View>
  </View>

  {/* Bottom: texto alineado al fondo con margin */}
  <View
  className="mt-10 w-full flex justify-center items-center"
  >
    <Text className="text-white-100 text-center  text-4xl">
      Proporcionarte los mejores  alimentos
    </Text>
  </View>
</ImageBackground>


        )
    }
}

export default HeaderPr;