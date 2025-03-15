import { StyleSheet, Text, View, Dimensions, Pressable, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import LoginForm from '../../components/LoginForm/index.tsx'
import { IconButton } from "native-base"
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { CommonActions } from '@react-navigation/native';
export default function CodeLogin({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "",
    })
  }, [])
  const backAction = () => {
    // TODO 重置堆栈为 Home，并删除堆栈中的其他屏幕，否则“我的”页面还会展示退出登录等内容，这不符合预期
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
    // navigation.navigate('BottomTab', {
    //   screen: 'Home'
    // });
    return true; // 返回 true 表示拦截返回按钮事件
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.formContainer}>
          <LoginForm pattern={"code"}></LoginForm>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: 40, height: 40, marginBottom: 5 }}>
          <IconButton onPress={() => {
            navigation.navigate("PasswordLogin")
          }} borderRadius={20} colorScheme="primary" variant="solid" _icon={{
            as: FontAwesome6,
            name: "user-large"
          }} />
        </View>
        <Text>账号密码登录</Text>
      </View>
    </View>
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
    paddingTop: 40,
  }
})