import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native'
import React from 'react';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import PasswordLogin from './features/PasswordLogin';
import CodeLogin from './features/CodeLogin';
import InputCode from './features/InputCode';
const Stack = createNativeStackNavigator();
export default function Login({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="CodeLogin">
      <Stack.Screen
        options={{
          animation: 'fade',
          headerShown: true,
          headerShadowVisible: false, // 不显示阴影边
        }}
        name="CodeLogin"
        component={CodeLogin}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          headerShown: true,
          headerShadowVisible: false, // 不显示阴影边
        }}
        name="InputCode"
        component={InputCode}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          headerShown: true,
          headerShadowVisible: false, // 不显示阴影边
        }}
        name="PasswordLogin"
        component={PasswordLogin}
      />
    </Stack.Navigator>

  )
}

const styles = StyleSheet.create({

})