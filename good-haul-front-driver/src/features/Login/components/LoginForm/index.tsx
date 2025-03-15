import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useToast, Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text, Icon, Pressable, Checkbox, WarningOutlineIcon } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AlertWarning from "../../../../components/AlertWarning"
import { useSelector, useDispatch } from 'react-redux';
import { useLoginRedux } from '../../../../store/user/userSlice';
import { useThrottle } from "../../../../utils/hooks/throttleHook"
export default function LoginForm({ navigation }) {
  const { doLogin } = useLoginRedux();
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
  let toast = useToast();
  const confirmLoginOrigin = async () => {
    if (agree) {
      if (password && account) {
        try {
          //@ts-ignore
          await dispatch(doLogin(account, password));
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
          navigation.navigate('BottomTab', {
            screen: "Home"
          });
        } catch (e) {
          if (e.message === "账号不存在！") {
            setAccountFlag(true);
          } else if (e.message === "密码错误！") {
            setAccountFlag(false);
            setPasswordFlag(true);
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
      } else {
        let toastOption = {
          status: "warning",
          title: "请先填写账号密码！"
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
  const confirmLogin = useThrottle(confirmLoginOrigin, 5000); //delay设置大一些
  return (
    <View style={{ width: Dimensions.get("window").width * 0.8 }}>
      <FormControl marginBottom={5} isInvalid={accountFlag} isRequired>
        {/* <FormControl.Label>Email ID</FormControl.Label> */}
        <Input value={account} size="md" placeholder="请输入账号" variant="filled"
          InputLeftElement={<Icon as={<MaterialCommunityIcons name="account" />} size={5} ml="2" color="muted.400" />}
          onChangeText={(text) => { setAccount(text) }}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          账号不存在
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl marginBottom={5} isInvalid={passwordFlag} isRequired>
        {/* <FormControl.Label>Password</FormControl.Label> */}
        <Input value={password} size="md" placeholder="请输入密码" variant="filled"
          type={show ? "text" : "password"}
          InputLeftElement={<Icon as={<AntDesign name="lock" />} size={5} ml="2" color="muted.400" />}
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
      <View style={{ width: Dimensions.get("window").width * 0.8 }}>
        <Checkbox value="agree" style={{ width: 17, height: 17 }} onPress={handleCheckboxAgree} >
          {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}> */}
          <Text style={{ flex: 1 }}>{/* TODO 只要设置Text style={{ flex: 1 }}就可以让文字自动换行了 */}
            <Text>我已阅读并同意</Text><Text style={{ color: '#f97316' }}>《隐私协议》</Text>
            <Text>和</Text><Text style={{ color: '#f97316' }}>《软件使用信息服务协议》</Text>
          </Text>
          {/* </View> */}
        </Checkbox>
      </View>
      <Text >
      </Text>
      <Button mt="2" variant="subtle" onPress={confirmLogin}>
        登录
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})