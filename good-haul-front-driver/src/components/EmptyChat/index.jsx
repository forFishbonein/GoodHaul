/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2024-03-21 00:33:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-30 01:52:16
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function EmptyChat({ text, height }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", height: height }}>
      <Image source={require("./image/nodata.png")} style={{ width: 100, height: 80 }}></Image>
      <Text style={{ marginTop: 10 }}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})