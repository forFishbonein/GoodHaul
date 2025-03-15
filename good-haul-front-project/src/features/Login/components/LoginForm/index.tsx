import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useToast, Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text, Icon, Pressable, Checkbox, WarningOutlineIcon, Modal } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AlertWarning from "../../../../components/AlertWarning"
import { useSelector, useDispatch } from 'react-redux';
import { useLoginRedux } from '../../../../store/user/userSlice';
import { useThrottle } from "../../../../utils/hooks/throttleHook"
import useLoginApi from "../../../../apis/login"
import { useNavigation } from '@react-navigation/native';
import { useOrderRedux } from '../../../../store/order/orderSlice';
import SliderVerification from "../SliderVerification"

export default function LoginForm({ pattern }) {
  // 使用 useNavigation 获取导航对象
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const dispatch = useDispatch();
  const handleCheckboxAgree = () => {
    if (agree) {
      setAgree(false);
    } else {
      setAgree(true);
    }
  }
  let [account, setAccount]: any = useState();
  let [accountFlag, setAccountFlag] = useState(false);
  let [password, setPassword]: any = useState();
  let [passwordFlag, setPasswordFlag] = useState(false);
  let [phone, setPhone]: any = useState();
  let [phoneFlag, setPhoneFlag] = useState(false);
  let toast = useToast();
  let { doLoginByPassword } = useLoginRedux();
  const { searchAllOrderAsync } = useOrderRedux();
  const confirmPasswordLoginOrigin = async () => {
    if (agree) {
      if (password && account) {
        try {
          //@ts-ignore
          await dispatch(doLoginByPassword(account, password));
          setAccountFlag(false);
          setPasswordFlag(false);
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
          //@ts-ignore
          // dispatch(searchAllOrderAsync); //登录后就查询订单，触发订单列表查询
          //@ts-ignore
          navigation.navigate('BottomTab', {
            screen: "Home"
          });
        } catch (e) {
          if (e.message === "账号不存在！") {
            setAccountFlag(true);
          } else if (e.message === "密码错误！") {
            setAccountFlag(false);
            setPasswordFlag(true);
          } else if (e.message === "未设置密码，请使用验证码登录！") {
            let toastOption = {
              status: "warning",
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
            setAccountFlag(false);
            setPasswordFlag(false);
          } else if (e.message === "您已登录，请不要重复登录！") {
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
            setAccountFlag(false);
            setPasswordFlag(false);
          }
        }
      }
    } else {
      let toastOption = {
        status: "warning",
        title: "请先勾选同意协议！"
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
  const confirmLogin = useThrottle(confirmPasswordLoginOrigin, 5000); //delay设置大一些
  let [loginPattern, setLoginPattern] = useState("code");
  useEffect(() => {
    setLoginPattern(pattern)
  }, [pattern])
  const { getSMSCode } = useLoginApi();
  const [showModal, setShowModal] = useState(false);
  const openModalVerify = () => {
    if (phone) {
      const phoneRegex = /^[1][3-9]\d{9}$/;
      let flag = phoneRegex.test(phone);
      setPhoneFlag(!flag);
      if (flag) {
        if (agree) {
          setShowModal(true);
        } else {
          let toastOption = {
            status: "warning",
            title: "请先勾选同意协议！"
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
    } else {
      let toastOption = {
        status: "warning",
        title: "请先填写手机号！"
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
  const getCodeOrigin = async () => {
    setShowModal(false)
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
      //@ts-ignore
      navigation.navigate('InputCode', {
        phone: phone
      });
      setPhoneFlag(false);
    }
  }

  const getCode = useThrottle(getCodeOrigin, 5000); //delay设置大一些

  return (
    <>
      <Heading size="lg" fontWeight="600" marginBottom={loginPattern == "code" ? 65 : 35}>
        {loginPattern == "code" ? "欢迎登录好运来" : "请输入账号及密码"}
      </Heading>
      <View style={{ width: Dimensions.get("window").width * 0.85 }}>
        {
          loginPattern == "code" ?
            <>
              <FormControl marginBottom={5} isInvalid={phoneFlag} isRequired>
                {/* <FormControl.Label>Email ID</FormControl.Label> */}
                <Input value={phone} size="md" placeholder="请输入手机号" variant="underlined"
                  InputLeftElement={<Icon as={<Feather name="smartphone" />} size={5} ml="2" mr="2" color="muted.400" />}
                  onChangeText={(text) => { setPhone(text) }}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  请输入11位数字
                </FormControl.ErrorMessage>
              </FormControl>
            </> :
            <>
              <FormControl marginBottom={5} isInvalid={accountFlag} isRequired>
                {/* <FormControl.Label>Email ID</FormControl.Label> */}
                <Input value={account} size="md" placeholder="请输入手机号" variant="underlined"
                  InputLeftElement={<Icon as={<Feather name="smartphone" />} size={5} ml="2" mr="2" color="muted.400" />}
                  onChangeText={(text) => { setAccount(text) }}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  账号不存在（可以使用验证码登录进行注册）
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl marginBottom={5} isInvalid={passwordFlag} isRequired>
                {/* <FormControl.Label>Password</FormControl.Label> */}
                <Input value={password} size="md" placeholder="请输入6-32位密码" variant="underlined"
                  type={show ? "text" : "password"}
                  InputLeftElement={<Icon as={<AntDesign name="lock" />} size={5} ml="2" mr="2" color="muted.400" />}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)} >
                      <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>}
                  onChangeText={(text) => { setPassword(text) }}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  密码错误
                </FormControl.ErrorMessage>
              </FormControl>
            </>
        }
        <View style={{ marginBottom: 20 }}>
          {loginPattern == "code" ?
            <Button mt="2" variant="subtle" onPress={openModalVerify}>
              获取验证码
            </Button> :
            <Button mt="2" variant="subtle" onPress={confirmLogin}>
              登录
            </Button>
          }
        </View>
        <View style={{ width: Dimensions.get("window").width * 0.8 }}>
          <Checkbox value="agree" style={{ width: 17, height: 17 }} onPress={handleCheckboxAgree} >
            <Text style={{ flex: 1 }}>{/* TODO 只要设置Text style={{ flex: 1 }}就可以让文字自动换行了 */}
              <Text>我已阅读并同意</Text><Text style={{ color: '#f97316' }}>《好运来用户协议》</Text>
              <Text>和</Text><Text style={{ color: '#f97316' }}>《隐私政策》</Text>
            </Text>
          </Checkbox>
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

const styles = StyleSheet.create({})