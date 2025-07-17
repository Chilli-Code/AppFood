import { images } from '@/constants';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH / 3.2;

const INGREDIENTS = [
  { image: images.bacon, label: 'bacon' },
  { image: images.tomatoes, label: 'tomatoes' },
  { image: images.cheese, label: 'cheese' },
  { image: images.onions, label: 'onions' },
  { image: images.salad, label: 'salad' },
];

const IngredientCard = ({
  image,
  label,
}: {
  image: any;
  label: string;
}) => (
  <View
    className="bg-[#3C2F2F] rounded-2xl shadow-md mx-1.5 overflow-hidden"
    style={{ width: 84, height: 99 }}
  >
    <View className="flex p-3 bg-white justify-center items-center" style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15, height: 61, width: 84 }}>
    <Image
      source={image}
      resizeMode="center"
      className="w-16 h-20"
      />
    </View>
     
    

    <View className="flex-row mt-2   items-center justify-between px-2 pt-1">
      <Text className="text-xs font-medium text-white-100">{label}</Text>
      <TouchableOpacity className="items-center justify-center">
        <Image
          source={images.add}
          className=""
          resizeMode="contain"
          />
      </TouchableOpacity>
    </View>
  </View>
);

const IngredientSlider = () => (
  <FlatList
    data={INGREDIENTS}
    horizontal
    keyExtractor={(item) => item.label}
    renderItem={({ item }) => (
      <IngredientCard image={item.image} label={item.label} />
    )}
    showsHorizontalScrollIndicator={false}
    snapToInterval={CARD_WIDTH + 12}
    decelerationRate="fast"
    contentContainerStyle={{ paddingHorizontal: 10, }}
  />
);

export default IngredientSlider;
