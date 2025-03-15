/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-28 15:58:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-28 16:06:46
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Tab({ children, color }) {
  return (
    <View style={[styles.container, { borderColor: color ? color : "#737373" }]}>
      <Text style={{ color: color ? color : "#737373", fontSize: 12 }}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1, height: 18, marginRight: 5, borderRadius: 3, alignItems: "center",
    paddingLeft: 2,
    paddingRight: 2,
    justifyContent: "center"
  }
})