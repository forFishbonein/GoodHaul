/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-14 18:50:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-29 00:25:53
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from "../../features/All"
import Doing from "../../features/Doing"
import Cancel from "../../features/Cancel"
import Complete from "../../features/Complete"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useOrderRedux } from '../../../../store/order/orderSlice';
const TopTab = createMaterialTopTabNavigator();

export default function TopTabOrder({ route, navigation }) {
  const { searchAllOrderAsync } = useOrderRedux();
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(searchAllOrderAsync);
  }, [dispatch])
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <TopTab.Navigator initialRouteName="All" screenOptions={{
        tabBarItemStyle: {
          borderWidth: 0,
          // width: Dimensions.get("window").width / 5
        },
        tabBarContentContainerStyle: {
          // backgroundColor: "#fff7ed",
          backgroundColor: "#ffffff",
        },
        tabBarIndicatorStyle: {
          borderColor: "#f97316",
        },
        // tabBarStyle: {
        //   elevation: 0
        // },
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: "#878788",
        // tabBarScrollEnabled: true,
      }}>
        <TopTab.Screen
          name="All"
          component={All}
          options={{ title: '全部' }}
        />
        <TopTab.Screen
          name="Doing"
          component={Doing}
          options={{ title: '服务中' }}
        />
        <TopTab.Screen
          name="Complete"
          component={Complete}
          options={{ title: '已完成' }}
        />
        <TopTab.Screen
          name="Cancel"
          component={Cancel}
          options={{ title: '已取消' }}
        />
      </TopTab.Navigator>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({})