/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-14 18:50:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-20 01:07:04
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import Category from "./category/index.tsx"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import getRouteNameString from "../../../../utils/getRouteNameString"
import { useSelector, useDispatch } from 'react-redux';
import { setServiceType } from '../../../../store/route/routeSlice.js';
import { useIsFocused } from '@react-navigation/native'; // 导入导航钩子
const TopTab = createMaterialTopTabNavigator();

export default function Move({ navigation }) {
  const dispatch = useDispatch();
  //监听toptab点击，存储参数
  useEffect(() => {
    //注意：这个navigation.addListener需要写在被进入的组件里面，而不是写在它们的父组件中！
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // console.log(getRouteNameString(e.target))
      // e.preventDefault(); //阻止了就进不来了！
      dispatch(setServiceType(getRouteNameString(e.target)))
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <TopTab.Navigator initialRouteName="Small" screenOptions={{
      tabBarItemStyle: {
        borderWidth: 0,
        width: Dimensions.get("window").width / 5
      },
      tabBarContentContainerStyle: {
        backgroundColor: "#F2F2F2",
      },
      tabBarIndicatorStyle: {
        borderColor: "#0891b2",
      },
      tabBarStyle: {
        elevation: 0
      },
      tabBarActiveTintColor: '#0891b2',
      tabBarInactiveTintColor: "#878788",
      tabBarScrollEnabled: true,
    }}>
      <TopTab.Screen
        name="Small"
        component={Category}
        options={{ title: '小面' }}
      />
      <TopTab.Screen
        name="Middle"
        component={Category}
        options={{ title: '中面' }}
      />
      <TopTab.Screen
        name="STruck"
        component={Category}
        options={{ title: '小货' }}
      />
      <TopTab.Screen
        name="MTruck"
        component={Category}
        options={{ title: '中货' }}
      />
      <TopTab.Screen
        name="FiveTwo"
        component={Category}
        options={{ title: '5米2' }}
      />
      <TopTab.Screen
        name="SixEight"
        component={Category}
        options={{ title: '6米8' }}
      />
    </TopTab.Navigator>
  )
}

const styles = StyleSheet.create({})