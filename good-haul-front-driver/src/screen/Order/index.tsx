import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopTabOrder from "./components/TopTabOrder"
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Detail from "./features/Detail"

const Stack = createNativeStackNavigator();
export default function Order() {
  return (
    <>
      <Stack.Navigator initialRouteName="TopTabOrder">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TopTabOrder"
          component={TopTabOrder}
        />
        <Stack.Screen
          options={{
            animation: 'fade',
            headerShown: true,
          }}
          name="Detail"
          component={Detail}
        />
      </Stack.Navigator>
    </>
  )
}

const styles = StyleSheet.create({})