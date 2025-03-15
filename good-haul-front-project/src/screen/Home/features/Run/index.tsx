import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Image, Tooltip } from "native-base"
import getRouteNameString from "../../../../utils/getRouteNameString"
import { useSelector, useDispatch } from 'react-redux';
import { setServiceType } from '../../../../store/route/routeSlice.js';

export default function Run({ navigation }) {
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require("./image/diandongche.png")} size="sm" style={{ width: 100, height: 90 }} alt="车型" />
      <Text style={{ fontSize: 18, marginTop: 5 }}><Text style={{ fontWeight: "bold", color: "#be185d" }}>最大</Text> 20公斤</Text>
    </View>
  )
}

const styles = StyleSheet.create({})