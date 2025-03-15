import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
export default function Privacy({ route, navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "隐私协议",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: "none", // 设置粗体字体
      },
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.feedContainer}>
        <View style={{ marginTop: 15 }}>
          <Text style={[styles.title, { fontSize: 23 }]}>好运来隐私协议</Text>
          <Text style={{ marginBottom: 5, alignSelf: "flex-end" }}>生效日期：2024年5月25日{"   "}</Text>
          <Text style={{ lineHeight: 23 }}>
            {"  "}感谢您使用好运来！我们非常重视您的隐私，并致力于保护您的个人信息。
            我们收集的信息包括您在注册和使用我们的服务时提供的姓名、联系方式、地址信息及支付信息，
            以及您设备的相关信息和位置信息（在您同意的情况下）。我们使用这些信息来提供和优化我们的服务、
            处理订单、支付和客户支持。我们不会与第三方共享您的个人信息，除非获得您的明确同意或遵守法律法规。
            我们采取合理的安全措施保护您的信息，但请注意没有任何安全措施是绝对安全的。您有权访问、更正或删除您的个人信息。
            如果您有任何疑问或需要行使您的权利，请通过1558637209@qq.com与我们联系。
            我们可能会不时更新本隐私协议，更新内容将发布在本页面。感谢您的信任与支持！
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    paddingTop: 20
  },
  feedContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.8,
    // height: 300,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 10,
    padding: 15
  },
  head: { height: 50, backgroundColor: '#f1f8ff', fontWeight: "800" },
  text: { margin: 6 },
  title: {
    fontWeight: "800",
    marginBottom: 10,
    color: "#E4080A"
  }
})