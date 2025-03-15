import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import LoginForm from '../../components/LoginForm/index.tsx'
import { IconButton } from "native-base"
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function PasswordLogin({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "",
    })
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.formContainer}>
          <LoginForm pattern={"password"}></LoginForm>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: 40, height: 40, marginBottom: 5 }}>
          <IconButton onPress={() => {
            navigation.navigate("CodeLogin")
          }} borderRadius={20} colorScheme="primary" variant="solid" _icon={{
            as: AntDesign,
            name: "codesquare"
          }} />
        </View>
        <Text>验证码登录</Text>
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
  background: {
    flex: 1,
    resizeMode: 'cover', // 图片适应方式
    justifyContent: 'center', // 水平居中
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