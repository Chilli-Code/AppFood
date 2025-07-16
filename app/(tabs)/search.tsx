
// import seed from '@/lib/seed'; // Adjust the import path as necessary
//import { Button, Text } from 'react-native';
// <Button title="Search" onPress={() => seed().catch((error) => console.log('Faild to seed the database', error))}  />
import CartButton from '@/components/CartButton';
import Filter from '@/components/Filter';
import MenuCard from '@/components/MenuCard';
import Searchbar from '@/components/SearchBar';
import { images } from "@/constants";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from '@/lib/useAppwrite';
import { MenuItem } from '@/type';
import cn from "clsx";
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const { category, query } = useLocalSearchParams<{query: string; category: string}>();

  const { data, refetch, loading } = useAppwrite({
    fn:getMenu,
    params: {
      category,
      query, 
      limit: 6,
    },
  })

  const { data: categories } = useAppwrite({fn: getCategories});

  useEffect( () =>{
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  // console.log("DATA:", JSON.stringify(data, null, 2));

  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList 
      data={data} 
      renderItem={({ item, index }) => {
        const isFirstRightColItem = index % 2 === 0;
        return(
           <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? 'mt-10': 'mt-0')}>
            <MenuCard item={item as MenuItem} />
          </View>
        )
      }}
      
      keyExtractor={(item) => item.$id}
      numColumns={2}
      columnWrapperClassName="gap-7"
      contentContainerClassName="gap-7 px-5 pb-32"
      ListHeaderComponent={ () => (
        <View className="my-5 gap-5">
          <View className="flex-between flex-row w-full">
            <View className="flex-start">
              <Text className="small-bold uppercase text-primary">Search</Text>
              <View className="flex-start flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
              </View>
            </View>
            <CartButton />
          </View>
          <Searchbar />
           <Filter categories={categories!} />
        </View>
      )}
      ListEmptyComponent={() => !loading ? (
        <View className="flex-1 items-center justify-center">
          <Image source={images.emptyState} className="size-72" resizeMode="contain" />
          <Text className="text-dark-100 text-lg font-semibold">Nothing matched your search</Text>
          <Text className="text-gray-200 font-medium">Try a different search term or check for typos.</Text>
          </View>
          ) : null
        }
      />
      
    </SafeAreaView>
  )
}

export default Search;


// <Button title="Search" onPress={() => seed().catch((error) => console.log('Faild to seed the database', error))}  />












 // import seed from '@/lib/seed'; // Adjust the import path as necessary
//import { Button, Text } from 'react-native';

// import { Button } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';


// const Search = () => {

//   return (
//     <SafeAreaView className='bg-white h-full'>
//       <Button title="Search" onPress={() => seed().catch((error) => console.log('Faild to seed the database', error))}  />
// 
//     </SafeAreaView>
//  )
// }

// export default Search;