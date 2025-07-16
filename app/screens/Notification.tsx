import CustomHeader from '@/components/CustomHeader';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export class Notification extends Component {
  render() {
    return (
      <SafeAreaView className="bg-white h-full">
        <View className="pb-28 px-5 pt-5">
        <CustomHeader title="Notifications" />

        </View>
        <Text>Notification</Text>
      </SafeAreaView>
    )
  }
}

export default Notification;