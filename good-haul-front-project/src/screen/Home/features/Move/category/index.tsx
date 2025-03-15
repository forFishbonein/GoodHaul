// import {
//   NativeStackScreenProps,
// } from '@react-navigation/native-stack';
import { useEffect } from "react";
import React, { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { Image, Tooltip } from "native-base"
import getRouteNameString from "../../../../../utils/getRouteNameString"
import { useSelector, useDispatch } from 'react-redux';
import { setMoveType, selectMoveType } from '../../../../../store/route/routeSlice.js';
import { selectCompleteFlag } from '../../../../../store/address/addressSlice';
import PriceEmitter from '../../../emitter/PriceEmitter';
export default function Category({ route, navigation }) {
  const completeFlag = useSelector(selectCompleteFlag);
  const dispatch = useDispatch();
  const selectedMove = useSelector(selectMoveType);
  //监听toptab点击，存储参数
  useEffect(() => {
    //注意：这个navigation.addListener需要写在被进入的组件里面，而不是写在它们的父组件中！
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // console.log(getRouteNameString(e.target))
      // e.preventDefault(); //阻止了就进不来了！
      dispatch(setMoveType(getRouteNameString(e.target)));
      // if (completeFlag) {
      //   // 发布事件
      //   PriceEmitter.emit('reCountPrice',getRouteNameString(e.target));
      // }
    });
    return unsubscribe;
  }, [navigation]);

  // let image = null; //注意：require("")是不允许的，会报错
  let labelString: Array<string> = [];
  switch (route.name) {
    case "Small":
      labelString = ["1.8~2.4", "0.5~0.8", "2.4~4.0"];
      break;
    case "Middle":
      labelString = ["2.4~3.2", "0.8~1.2", "3.7~6.1"];
      break;
    case "STruck":
      labelString = ["2.0~3.7", "1.0~1.5", "4.2~9.6"];
      break;
    case "MTruck":
      labelString = ["3.8~4.3", "1.5~2.0", "12.3~19.8"];
      break;
    case "FiveTwo":
      labelString = ["5.2", "2.0~6.0", "21.0~28.6"];
      break;
    case "SixEight":
      labelString = ["6.8", "6.4~7.2", "35.3~43.2"];
      break;
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ width: 110 }}></View>
        <SelectImage name={route.name} />
        <View style={{ width: 110, justifyContent: "center" }}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>厢长:</Text>{labelString[0]}米 {'\n'}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>载重:</Text>{labelString[1]}吨 {'\n'}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>载方:</Text>{labelString[2]}方
          </Text>
        </View>
      </View>

    </View>
  );
}
function SelectImage({ name }) {
  switch (name) {
    case "Small":
      return <Image source={require("./image/transparency/xiaomian.png")} size="xl" style={{ width: 190 }} alt="小面" />;
    case "Middle":
      return <Image source={require("./image/transparency/zhongmian.png")} size="xl" style={{ width: 190 }} alt="中面" />;
    case "STruck":
      return <Image source={require("./image/transparency/xiaohuo.png")} size="xl" style={{ width: 190 }} alt="小货" />;
    case "MTruck":
      return <Image source={require("./image/transparency/zhonghuo.png")} size="xl" style={{ width: 190 }} alt="中货" />;
    case "FiveTwo":
      return <Image source={require("./image/transparency/5mi2.png")} size="xl" style={{ width: 190 }} alt="5米2" />;
    case "SixEight":
      return <Image source={require("./image/transparency/6mi8.png")} size="xl" style={{ width: 190 }} alt="6米8" />;
    default:
      return null;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    padding: 16,
    width: '90%',
    maxWidth: 400,
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#0ac'
  },
});
