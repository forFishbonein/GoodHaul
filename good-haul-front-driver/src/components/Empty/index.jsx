/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2024-03-21 00:33:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-23 18:29:32
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function Empty({ text }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./image/nodata.png")} style={{ width: 100, height: 80 }}></Image>
      <Text style={{ marginTop: 10 }}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})