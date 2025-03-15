import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import TopTabOrder from "./components/TopTabOrder"
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Detail from "./features/Detail"
import { useFocusEffect } from '@react-navigation/native';
import { selectToken } from "../../store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import FeedBack from "./features/FeedBack"
import { useIsFocused } from '@react-navigation/native'; // 导入导航钩子
import { useToast } from "native-base"
import AlertWarning from "../../components/AlertWarning"
const Stack = createNativeStackNavigator();
export default function Order({ navigation }) {
  // const isFocused = useIsFocused(); // 获取当前页面是否处于焦点状态
  // useEffect(() => {
  //   if (isFocused) {
  //     // 当进入当前页面时执行的操作
  //     StatusBar.setBackgroundColor('#ecfeff');
  //   }
  // }, [isFocused]); // 依赖 isFocused 状态的变化
  const token = useSelector(selectToken);
  const toast = useToast();
  // const [loadData, setLoadData] = useState(false);
  // TODO 页面前置路由拦截器，使用 react-navigation 提供的 useFocusEffect 在进入Order页面时执行逻辑
  useFocusEffect(
    () => {
      // 在这里执行您的判断逻辑，比如检查用户是否已登录
      if (!token) {
        let toastOption = {
          status: "warning",
          title: "请先登录！"
        }
        toast.show({
          placement: "top-right", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
        // 如果用户未登录，则跳转到个人主页
        navigation.navigate('Mine', {
          screen: "MineMain"
        });
      }
      // 返回一个清理函数，用于在离开页面时取消订阅或清理资源
      return () => {
        // 清理逻辑
      };
    }
  );
  return (
    <Stack.Navigator initialRouteName="TopTabOrder">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TopTabOrder"
        component={TopTabOrder}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          headerShown: true,
        }}
        name="Detail"
        component={Detail}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          headerShown: true,
        }}
        name="FeedBack"
        component={FeedBack}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})