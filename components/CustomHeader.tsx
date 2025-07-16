import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants";
import { CustomHeaderProps } from "@/type";

const CustomHeader = ({
  title,
  showRightIcon = true,
  rightIcon = images.search,
  onRightPress,
}: CustomHeaderProps) => {
  const router = useRouter();

  
  return (
    <View className="custom-header">
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={images.arrowBack}
          className="size-5"
          resizeMode="contain"
        />
      </TouchableOpacity>

      {title && <Text className="text-1xl font-bold text-dark-100">{title}</Text>}

      {showRightIcon ? (
        <TouchableOpacity onPress={onRightPress}>
            <Image source={rightIcon} className="size-5" resizeMode="contain" />
        </TouchableOpacity>
      ) : (
        <View className="size-5" />
      )}
    </View>
  );
};

export default CustomHeader;
