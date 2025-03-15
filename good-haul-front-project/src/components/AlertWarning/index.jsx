/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2024-03-18 18:20:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-26 18:04:10
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { StyleSheet, View } from 'react-native'
import { useToast, Alert, VStack, HStack, Text, IconButton, CloseIcon } from "native-base";
import React from "react";
export default function AlertWarning({ id, toast, toastOption }) {
  return (
    <Alert w="100%" status={toastOption.status} variant="left-accent" duration={3000}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center" justifyContent="center">
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {toastOption.title}
            </Text>
          </HStack>
          <IconButton variant="unstyled" _focus={{
            borderWidth: 0
          }} icon={<CloseIcon size="3" />} _icon={{
            color: "coolGray.600"
          }} onPress={() => toast.close(id)} />
        </HStack>
      </VStack>
    </Alert>
  )
}

const styles = StyleSheet.create({})