/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-13 22:39:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-25 16:30:00
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { StyleSheet, Text, View, Dimensions, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import TopTabHome from './components/TopTabHome'
import { Center, Box, Button, Actionsheet, useDisclose } from "native-base";
import MapSelectAddress from './components/MapSelectAddress';
import AddressForm from './features/AddressForm';
import TopLocation from '../../components/TopLocation';
import SlideShow from "../../components/SlideShow"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useIsFocused } from '@react-navigation/native'; // 导入导航钩子
//注意：只有在component属性里面的组件，上面才有navigation对象！！
export default function Home({ navigation }) {
  // const isFocused = useIsFocused(); // 获取当前页面是否处于焦点状态
  // useEffect(() => {
  //   if (isFocused) {
  //     // 当进入当前页面时执行的操作
  //     StatusBar.setBackgroundColor('#ecfeff');
  //   }
  // }, [isFocused]); // 依赖 isFocused 状态的变化
  let [selectResult, setSelectResult] = useState({})
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const onFillAddress = () => {
    onOpen();
  }
  const onSelectAddress = (address) => {
    if (address) {
      // console.log(`address：${address}`)
      setSelectResult(JSON.parse(address));
    }
  }
  return (
    <>
      {/* 定位组件 */}
      <TopLocation></TopLocation>
      <ScrollView
        overScrollMode="never"
        removeClippedSubviews={true}
        style={{ flex: 1 }}
      >
        <View style={{ height: Dimensions.get("window").height * 0.318 }}>
          {/* 服务选择组件 */}
          <TopTabHome></TopTabHome>
        </View>
        <View style={styles.container}>
          <View style={styles.panel}>
            {/* 地址信息填写组件 */}
            <AddressForm onFillAddress={onFillAddress} selectResult={selectResult} navigation={navigation}></AddressForm>
          </View>
          <View style={styles.sliderContainer}>
            {/* 轮播图组件 */}
            <SlideShow navigation={navigation}></SlideShow>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {
              navigation.navigate('Mine', {
                screen: "SuggestBack"
              });
            }}>
              <Text>
                问题反馈
              </Text>
              <AntDesign name="right" color="#737373" size={13} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <View style={{ height: Dimensions.get('window').height * 0.9 }}>
            {/* 地图选址组件 */}
            <MapSelectAddress width={330} height={500} onSelectAddress={onSelectAddress}></MapSelectAddress>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flex: 1,
    alignItems: 'center'
  },
  panel: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#ffffff",
    height: 280,
    marginTop: 10,
    borderRadius: 15,
    elevation: 1,
    padding: 10
  },
  sliderContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20
  },
  textContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  }
})