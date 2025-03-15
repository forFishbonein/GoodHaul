import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import MineMain from './features/MineMain';
import { useIsFocused } from '@react-navigation/native'; // 导入导航钩子
const Stack = createNativeStackNavigator();
export default function Mine({ navigation }) {
  // const isFocused = useIsFocused(); // 获取当前页面是否处于焦点状态
  // useEffect(() => {
  //   if (isFocused) {
  //     // 当进入当前页面时执行的操作
  //     StatusBar.setBackgroundColor('#F2F2F2');
  //   }
  // }, [isFocused]); // 依赖 isFocused 状态的变化
  return (
    <Stack.Navigator initialRouteName="MineMain">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MineMain"
        component={MineMain}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})