/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-13 23:26:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-30 15:00:00
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { useEffect, useState } from "react";
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from "../../screen/Home";
import Order from "../../screen/Order";
import Chat from "../../screen/Chat";
import Mine from "../../screen/Mine";
import { StyleSheet } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector, useDispatch } from 'react-redux';
import { getLocationAsync } from "../../store/locate/locateSlice"
const Tab = createBottomTabNavigator();
export default function BottomTab() {
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(getLocationAsync); //触发定位查询
  }, [dispatch])
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#f97316',
          tabBarLabelStyle: { fontSize: 13 },
        }}>
        <Tab.Screen name="Home" component={Home} options={{
          title: '首页', tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Order" component={Order} options={{
          title: '订单', tabBarIcon: ({ color, size }) => (
            <AntDesign name="menufold" color={color} size={size} />
          )
        }} />
        <Tab.Screen name="Chat" component={Chat} options={{
          title: '聊天', tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" color={color} size={size} />
          )
        }} />
        <Tab.Screen name="Mine" component={Mine} options={{
          title: '我的', tabBarIcon: ({ color, size }) => (
            <Entypo name="github" color={color} size={size} />
          )
        }} />
      </Tab.Navigator>
    </>
  );
}
const styles = StyleSheet.create({

});