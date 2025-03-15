import { StyleSheet, View, Dimensions, Text, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useThrottle } from "../../../../utils/hooks/throttleHook"
import { useLoginRedux } from '../../../../store/user/userSlice';
import AlertWarning from "../../../../components/AlertWarning"
import { useToast, Input, Link, Button, HStack, Icon, Modal } from "native-base"
import CodeSubFieldInput from '../../components/CodeSubFieldInput';
import useLoginApi from "../../../../apis/login"
import { useSelector, useDispatch } from 'react-redux';
import { useOrderRedux } from '../../../../store/order/orderSlice';
import SliderVerification from "../../components/SliderVerification"
export default function InputCode({ navigation, route }) {
  let [phone, setPhone]: any = useState();
  let toast = useToast();
  useEffect(() => {
    navigation.setOptions({
      title: "",
    })
  }, [])
  useEffect(() => {
    if (route.params) {
      setPhone(route.params.phone + "");
    }
  }, [route.params])
  const dispatch = useDispatch();
  let { doLoginByCode } = useLoginRedux();
  const { searchAllOrderAsync } = useOrderRedux();
  const confirmCodeLogin = async (code) => {
    if (phone && code) {
      try {
        //@ts-ignore
        let type = await dispatch(doLoginByCode(phone, code)); //type表示是否为注册的用户
        if (type) {
          let toastOption = {
            status: "success",
            title: "自动注册成功！"
          }
          toast.show({
            placement: "top", //在上方弹出
            render: ({
              id
            }) => {
              return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
            }
          });
        } else {
          let toastOption = {
            status: "success",
            title: "登陆成功！"
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
        //@ts-ignore
        // dispatch(searchAllOrderAsync); //登录后就查询订单，触发订单列表查询
        navigation.navigate('BottomTab', {
          screen: "Home"
        });
      } catch (e) {
        if (e.message === "您已登录，请不要重复登录！") {
          let toastOption = {
            status: "error",
            title: e.message
          }
          toast.show({
            placement: "top", //在上方弹出
            render: ({
              id
            }) => {
              return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
            }
          });
        } else if (e.message === "验证码错误！") {
          let toastOption = {
            status: "error",
            title: e.message
          }
          toast.show({
            placement: "top", //在上方弹出
            render: ({
              id
            }) => {
              return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
            }
          });
        } else if (e.message === "验证码已过期！") {
          let toastOption = {
            status: "error",
            title: e.message
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
  }
  const [secondsLeft, setSecondsLeft] = useState(60); // 初始剩余时间为60秒
  useEffect(() => {
    const timer = setInterval(() => {
      //TODO 注意：在setInterval里面使用setXXX是没问题的（因为setSecondsLeft在单独的线程，不会每次渲染都被重新执行，只有定时器被清除了才重新执行）
      // 但是直接在useEffect第一层级下使用setXXX不行，会导致死循环！
      setSecondsLeft(prevSeconds => {
        if (prevSeconds === 1) {
          clearInterval(timer);
          return 0
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // 组件卸载时清理定时器
  }, []);
  const { getSMSCode } = useLoginApi();
  const [showModal, setShowModal] = useState(false);
  const openModalVerify = () => {
    setShowModal(true);
  }
  const getCodeOrigin = async () => {
    setShowModal(false);
    let res = await getSMSCode(phone);
    if (res.data) {
      let toastOption = {
        status: "success",
        title: "已发送验证码！" //验证码错误
      }
      toast.show({
        placement: "top", //在上方弹出
        render: ({
          id
        }) => {
          return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
        }
      });
      setSecondsLeft(60); // 重新设置剩余时间
      const timer = setInterval(() => {
        setSecondsLeft(prevSeconds => {
          if (prevSeconds === 1) {
            clearInterval(timer);
            return 0
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
  }
  const getCode = useThrottle(getCodeOrigin, 5000); //delay设置大一些
  return (
    <>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={{ fontWeight: "500", fontSize: 25, lineHeight: 40, marginBottom: 5, color: "#000000" }}>请您输入验证码</Text>
              <Text style={{ fontSize: 13, marginBottom: 5 }}>验证码已发送至{phone?.slice(0, 3) + " " + phone?.slice(3, 7) + " " + phone?.slice(7)}</Text>
              <Text style={{ fontSize: 13, color: "#0891b2" }}>未注册的用户使用验证码登录将直接注册！</Text>
            </View>
            <View style={{ width: Dimensions.get("window").width * 0.85 }}>
              <CodeSubFieldInput confirmCodeLogin={confirmCodeLogin}></CodeSubFieldInput>
              <View style={{ marginBottom: 20 }}>
                <Button mt="2" variant="subtle" onPress={openModalVerify} disabled={secondsLeft > 0}>
                  {secondsLeft > 0 ? secondsLeft + "s后可重新获取" : "重新获取"}
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Body>
            <SliderVerification getCode={getCode}></SliderVerification>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffff",
    paddingTop: 30,
    paddingBottom: 40,
  },
  loginContainer: {
    height: Dimensions.get("window").height * 0.54,
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  formContainer: {
    width: Dimensions.get("window").width * 0.85,
    paddingTop: 30,
  },
  titleContainer: {
    width: Dimensions.get("window").width * 0.85,
    marginBottom: 50,
  },
})