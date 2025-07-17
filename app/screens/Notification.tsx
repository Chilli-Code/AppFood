import CustomHeader from '@/components/CustomHeader'
import React from 'react'
import { Text, View } from 'react-native'
const Notification = () => {
  return (
    <View>
      <CustomHeader title="Notification" />

      <Text className="text-center text-gray-500 mt-10">No notifications yet</Text>
      <Text>Notification</Text>
    </View>
  )
}

export default Notification