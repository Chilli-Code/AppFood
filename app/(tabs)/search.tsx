
// import seed from '@/lib/seed'; // Adjust the import path as necessary
//import { Button, Text } from 'react-native';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// <Button title="Search" onPress={() => seed().catch((error) => console.log('Faild to seed the database', error))}  />
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from '@/lib/useAppwrite';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

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

  console.log(data);
  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList data={data} renderItem={({ item, index }) => {
        return(
          <View className='flex-1 max-w-[48%]'>
            <Text>Menu Card</Text>
          </View>
        )
      }} />
    </SafeAreaView>
  )
}

export default Search;