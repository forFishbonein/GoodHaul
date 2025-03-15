import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
export default function AboutUs({ route, navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "关于我们",
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
          <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
            <Text style={[styles.title, { fontSize: 23, alignItems: "center" }]}>关于我们</Text>
          </View>
          <Text style={{ lineHeight: 23 }}>
            {"  "}<Text style={{ color: "#E4080A", fontSize: 16 }}>好运来</Text>
            是一家致力于提供便捷、高效货运服务的公司。我们致力于满足客户的各种货运需求，
            <Text style={{ color: "#E4080A" }}>包括搬家、跑腿等服务，同时欢迎企业合作</Text>。
            无论您需要搬家家具、送货到家或者紧急文件送达，我们都能够为您提供快速可靠的服务。
            我们的团队由经验丰富、热情周到的专业人士组成，他们将确保您的货物安全顺利地送达目的地。
            我们提供灵活的服务时间，让您可以根据自己的时间安排选择最合适的送货时间。
            在好运来，我们注重客户体验和服务质量。我们努力倾听客户的反馈意见，并不断改进我们的服务，
            以确保您获得满意的体验。我们的目标是成为您信赖的货运合作伙伴，为您提供最优质的服务。
            如果您有任何问题或建议，请随时与我们联系。我们期待与您合作，为您提供优质的货运服务！
          </Text>
          <Text style={{ marginTop: 10, color: "#10b981" }}>联系我们：1558637209@qq.com</Text>
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
    color: "#0891b2"
  }
})