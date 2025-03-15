/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-30 21:18:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-30 21:21:29
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { HStack, Spinner, Heading } from "native-base"

export default function Loading() {
  return (
    <View style={styles.container}>
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          加载中
        </Heading>
      </HStack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center"
  }
})