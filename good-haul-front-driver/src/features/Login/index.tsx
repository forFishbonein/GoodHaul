import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import LoginForm from './components/LoginForm/index.tsx'
import { Center, Box, Heading } from "native-base"

export default function Login({ navigation }) {
  return (

    <ImageBackground
      source={require('./images/login-background.png')} // 图片的路径
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.formContainer}>
            <Heading size="lg" fontWeight="600" marginBottom={5}>
              欢迎加入好运来
            </Heading>
            <LoginForm navigation={navigation}></LoginForm>
          </View>
        </View>
      </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // 图片适应方式
    justifyContent: 'center', // 水平居中
  },
  loginContainer: {
    backgroundColor: "#ffff",
    height: Dimensions.get("window").height * 0.54,
    width: Dimensions.get("window").width,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  formContainer: {
    width: Dimensions.get("window").width * 0.8,
    paddingTop: 40
  }
})