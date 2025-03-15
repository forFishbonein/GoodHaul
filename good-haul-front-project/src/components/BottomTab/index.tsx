/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-13 23:26:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-29 17:38:39
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { useEffect, useState } from "react";
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from "../../screen/Home";
import Order from "../../screen/Order";
import Mine from "../../screen/Mine";
import Chat from "../../screen/Chat";
import { StyleSheet, StatusBar } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  const navigation = useNavigation();

  // 获取当前路由信息
  // @ts-ignore
  // const currentRoute = navigation.getState();
  // const [statusColor, setStatusColor] = useState("#ecfeff");
  // useEffect(() => {
  //   console.log(currentRoute)
  // }, [currentRoute])
  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#ffffff" /> */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#0891b2',
          tabBarLabelStyle: { fontSize: 13 },
        }}>
        <Tab.Screen name="Home" component={Home} options={{
          title: '首页', tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Order" component={Order} options={{
          title: '订单', tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="form-select" color={color} size={size} />
          )
        }} />
        <Tab.Screen name="Chat" component={Chat} options={{
          title: '聊天', tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" color={color} size={size} />
          )
        }} />
        <Tab.Screen name="Mine" component={Mine} options={{
          title: '我的', tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          )
        }} />
      </Tab.Navigator>
    </>
  );
}
const styles = StyleSheet.create({

});