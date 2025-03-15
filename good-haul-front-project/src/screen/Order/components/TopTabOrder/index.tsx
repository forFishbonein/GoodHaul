/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-14 18:50:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-28 22:29:40
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from "../../features/All"
import Cancel from "../../features/Cancel"
import Complete from "../../features/Complete"
import Underway from "../../features/Underway"
import WaitPay from "../../features/WaitPay"
import WaitReceive from "../../features/WaitReceive"
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectToken } from "../../../../store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import { useOrderRedux } from '../../../../store/order/orderSlice';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabOrder({ route, navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { searchAllOrderAsync } = useOrderRedux();
  useEffect(() => {
    if (token) { //TODO 有token才查询！否则首次没token就查了，有了就不查了，就没数据！
      //@ts-ignore
      dispatch(searchAllOrderAsync); //触发订单列表查询
    }
  }, [token])
  // let [routeName, setRouteName] = useState("All");
  //下面代码保证跳转过来可以激活对应的tab选项卡
  // useEffect(() => {
  //   if (route.params.screen) {
  //     setRouteName(route.params.screen)
  //     console.log(111)
  //   }
  // }, [route.params])
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <TopTab.Navigator initialRouteName="All" screenOptions={{
        tabBarItemStyle: {
          borderWidth: 0,
          width: Dimensions.get("window").width / 5
        },
        tabBarContentContainerStyle: {
          // backgroundColor: "#ecfeff",
          backgroundColor: "#ffffff",
        },
        tabBarIndicatorStyle: {
          borderColor: "#0891b2",
        },
        // tabBarStyle: {
        //   elevation: 0
        // },
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: "#878788",
        tabBarScrollEnabled: true,
      }}>
        <TopTab.Screen
          name="All"
          component={All}
          options={{ title: '全部' }}
        />
        <TopTab.Screen
          name="WaitPay"
          component={WaitPay}
          options={{ title: '待付款' }}
        />
        <TopTab.Screen
          name="WaitReceive"
          component={WaitReceive}
          options={{ title: '待接单' }}
        />
        <TopTab.Screen
          name="Underway"
          component={Underway}
          options={{ title: '进行中' }}
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