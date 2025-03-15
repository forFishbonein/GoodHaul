import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Move from "../../features/Move";
import Run from "../../features/Run";

const TopTab = createMaterialTopTabNavigator();
export default function TopTabHome() {

  return (
    // <SafeAreaView style={{
    //   flex: 1,
    // }}>
    <>
      <TopTab.Navigator
        initialLayout={{
          width: Dimensions.get('window').width,
          height: 60
        }}
        screenOptions={{
          tabBarGap: 5,
          tabBarActiveTintColor: "#ffffff",
          tabBarLabelStyle: {
            fontWeight: 'bold',
            height: 30
          },
          tabBarItemStyle: {
            backgroundColor: "#0891b2",
            width: Dimensions.get("window").width / 4,
            borderWidth: 2,
            borderColor: '#0891b2',
            borderRadius: 10,
            margin: 5,
            padding: 0,
            height: 30,
          },
          tabBarContentContainerStyle: {
            // backgroundColor: "#ecfeff",
            backgroundColor: "#ffffff",
            elevation: 0,
            alignItems: "center",
          },
          tabBarIndicatorStyle: {
            width: 0,
          },
          tabBarAndroidRipple: { borderless: false }, //允许自定义 Android 波纹效果
        }} initialRouteName="Move">
        <TopTab.Screen
          name="Move"
          component={Move}
          options={{ title: '搬家' }}
        />
        <TopTab.Screen
          name="Run"
          component={Run}
          options={{ title: '跑腿' }}
        />
      </TopTab.Navigator>
    </>

    // </SafeAreaView >
  )
}

const styles = StyleSheet.create({})