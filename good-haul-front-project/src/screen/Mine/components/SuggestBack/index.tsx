import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AlertWarning from "../../../../components/AlertWarning"
import { TextArea, useToast, Input, Button } from "native-base"
export default function SuggestBack({ route, navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "问题反馈",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: "none", // 设置粗体字体
      },
    })
  }, [])
  const toast = useToast();
  const confirmFeedback = async () => {
    let toastOption = {
      status: "success",
      title: "反馈成功！谢谢您的建议！"
    }
    toast.show({
      placement: "top", //在上方弹出
      render: ({
        id
      }) => {
        return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
      }
    });
    navigation.navigate('Mine', {
      screen: "MineMain"
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.feedContainer}>
        <View>
          <Text>
            说明：您可以针对应用提出意见或对于我们的服务提供改建的建议！
            <Text style={{ color: "#E4080A" }}>您的关注是我们进步的最大动力~</Text>
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Input size="md" variant="filled" placeholder="请输入您的手机号" />
        </View>
        <View style={{ marginTop: 15 }}>
          {/* @ts-ignore */}
          <TextArea size="md" h={150}
            w="100%" placeholder="请输入反馈内容" />
        </View>
        <View style={{ marginTop: 15 }}>
          <Button size="md" onPress={confirmFeedback}>
            确认反馈
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    paddingTop: 20
  },
  feedContainer: {
    width: Dimensions.get("window").width * 0.9,
    // height: 300,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 10,
    padding: 15
  }
})