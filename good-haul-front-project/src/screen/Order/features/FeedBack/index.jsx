import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFeedbackApi from "../../../../apis/feedback"
import AlertWarning from "../../../../components/AlertWarning"
import { TextArea, useToast, Input, Button } from "native-base"
export default function FeedBack({ route, navigation }) {
  const { addOneFeedback } = useFeedbackApi();
  const [phone, setPhone] = useState();
  const [content, setContent] = useState();
  useEffect(() => {
    navigation.setOptions({
      title: "投诉反馈",
    })
  }, [])
  const toast = useToast();
  const confirmFeedback = async () => {
    if (/^1[3-9]\d{9}$/.test(phone)) {
      if (phone && content) {
        /*
                    orderId: string;
                    // userId: number;
                    driverId: number;
                    userPhone: string;
                    content: string;
                  */
        let res = await addOneFeedback({
          orderId: route.params.orderId,
          driverId: route.params.driverId,
          userPhone: phone,
          content: content,
        });
        if (res.data) {
          let toastOption = {
            status: "success",
            title: "反馈成功！我们将尽快处理！"
          }
          toast.show({
            placement: "top", //在上方弹出
            render: ({
              id
            }) => {
              return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
            }
          });
          setContent(null)
          setPhone(null)
          navigation.navigate('Detail', {
            orderId: route.params.orderId,
          });
        }
      } else {
        let toastOption = {
          status: "warning",
          title: "请先填写完整！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
      }
    } else {
      if (res.data) {
        let toastOption = {
          status: "warning",
          title: "请输入11位手机号！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.feedContainer}>
        <View>
          <Text>
            说明：您可以投诉反馈订单服务过程中的一切问题，
            <Text style={{ color: "#E4080A" }}>收到反馈后我们将第一时间为您处理！</Text>
          </Text>
          <Text>感谢您对好运来的信任！</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Input size="md" value={phone} variant="filled" placeholder="请输入您的手机号" onChangeText={text => setPhone(text)} />
        </View>
        <View style={{ marginTop: 15 }}>
          <TextArea size="md" value={content} h={150}
            onChangeText={text => setContent(text)}
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