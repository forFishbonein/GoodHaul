/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
//@ts-ignore
import type { Node } from 'react';
import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import BottomTab from './src/components/BottomTab';
import { NativeBaseProvider } from "native-base";
import ConfirmOrder from './src/screen/Home/features/ConfirmOrder';
import Pay from './src/features/Pay';
import Login from './src/features/Login';
import ChatContent from './src/screen/Chat/features/ChatContent';
import useAxios from './src/request/index';
import TokenUtil from './src/utils/token';
import { selectToken } from "./src/store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import { useMyNavigation } from "./src/utils/hooks/navigationHook"
const Stack = createNativeStackNavigator();
function Index() {
  const navigationRef = useRef(null); //TODO 如果想在App里面使用navigation就必须获取ref才行！
  const { setNavigationRef } = useMyNavigation();
  // const { setAxiosNavigationRef } = useAxios(); //TODO 因为这里用了useAxios，里面有关于redux的，但是app.tsx又没有包裹Provider，所以必须在外面加一层！
  // const checkIfHaveToken = async () => {
  //   try {
  //     const token = await TokenUtil.getToken();
  //     console.log('当前应用的token：', token);
  //     if (token) {
  //       //@ts-ignore
  //       navigationRef?.current?.navigate('BottomTab');
  //     } else {
  //       //@ts-ignore
  //       navigationRef?.current?.navigate('Login');
  //     }
  //   } catch (error) {
  //     console.error('Error checking JWT token from AsyncStorage:', error);
  //   }
  // };

  useEffect(() => {
    if (navigationRef?.current) {
      // 将导航引用传递给 Axios
      setNavigationRef(navigationRef?.current);
    }
  }, [navigationRef])
  useEffect(() => {
    console.log("启动应用！")
  }, [])

  // TODO 这里是故意导航的，所以可能不用取消那个重复登录的限制
  // useEffect(() => {
  //   if (navigationRef?.current) {
  //     //@ts-ignore
  //     navigationRef?.current?.navigate("Login")
  //   }
  // }, [navigationRef])

  //下面这种路由拦截器不可行！会导致死循环
  // const token = useSelector(selectToken);

  // const handleNavigationStateChange = (currentState) => {
  //   console.log(currentState.routes[currentState.index])
  //   console.log(currentState.routes[currentState.index].routes)
  //   console.log(currentState)
  //   if (currentState?.routes[0]?.state?.index == 0 || currentState?.routes[0]?.state?.index == 1) {
  //     setStatusColor("#ecfeff")
  //   } else {
  //     setStatusColor("#ffffff")
  //   }
  // }

  return (
    <>
      <NativeBaseProvider>
        {/*  onStateChange={handleNavigationStateChange} */}
        <NavigationContainer ref={navigationRef}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <Stack.Navigator initialRouteName="BottomTab"
          >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="BottomTab"
              component={BottomTab}
            />
            <Stack.Screen
              options={{
                animation: 'fade',
                headerShown: true,
              }}
              name="ConfirmOrder"
              component={ConfirmOrder}
            />
            <Stack.Screen
              options={{
                animation: 'fade',
                headerShown: true,
              }}
              name="Pay"
              component={Pay}
            />
            <Stack.Screen
              options={{
                animation: 'fade',
                headerShown: true,
                headerShadowVisible: false, // 不显示阴影边
                // headerStyle: {
                //   backgroundColor: '#EDEDED', // 设置头部背景颜色
                // },
              }}
              name="ChatContent"
              component={ChatContent}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={Login}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
});

export default Index;
