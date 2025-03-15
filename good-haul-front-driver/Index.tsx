import React, { useEffect, useState, useRef } from 'react';

import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import BottomTab from './src/components/BottomTab';
import { NativeBaseProvider, Button, extendTheme } from "native-base";
import TokenUtil from './src/utils/token';
import Login from './src/features/Login';
import useAxios from './src/request/index';


import { selectToken } from "./src/store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import ChatContent from "./src/screen/Chat/features/ChatContent"
const Stack = createNativeStackNavigator();
function Index() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#FD9900',
        500: '#fb923c',
        600: '#f97316',
        700: '#ea580c',
        800: '#c2410c',
        900: '#9a3412',
      },
    },
  });
  const navigationRef = useRef(null);
  const { setNavigationRef } = useAxios(); //TODO 因为这里用了useAxios，里面有关于redux的，但是app.tsx又没有包裹Provider，所以必须在外面加一层！
  const token = useSelector(selectToken);
  const checkIfHaveToken = async () => {
    try {
      // const tokenUtil = new TokenUtil();
      // const token = await tokenUtil.getToken();
      console.log('当前应用的token：', token);
      if (token) {
        //@ts-ignore
        navigationRef?.current?.navigate('BottomTab');
      } else {
        //@ts-ignore
        navigationRef?.current?.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking JWT token from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    // 将导航引用传递给 Axios
    setNavigationRef(navigationRef.current);
    checkIfHaveToken();
    console.log("启动应用！")
  }, [])

  return (
    <>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <Stack.Navigator>
            {/*
                  TODO 注意：只有司机端是这样直接判断之后导航的，因为司机端进入是必须登录的，
                  但是用户端不登录也是可以进入首页的，但是如果点击订单就需要路由拦截器了，拦截到登录页面！
              */}
            {
              //TODO 注意：要注意条件渲染问题：这里必须要通过token判断一下再渲染，
              //TODO 否则Home页面上来就进行查询但是这个时候还没有token是查询不到的，然后导致home在登录之后不查了就没有数据了！
            }
            {
              token ? <><Stack.Screen
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
                    headerShadowVisible: false, // 不显示阴影边
                    // headerStyle: {
                    //   backgroundColor: '#EDEDED', // 设置头部背景颜色
                    // },
                  }}
                  name="ChatContent"
                  component={ChatContent}
                />
              </>
                : <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Login"
                  component={Login}
                />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Index;
