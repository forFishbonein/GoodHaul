import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { floorPriceTable, carPriceTable } from "../../../../constant/price"
import { carNameTable } from "../../../../constant/name"
import { Table, Row, Rows } from 'react-native-table-component';
export default function Rates({ route, navigation }) {
  const tableTitle = ["全程电梯", "1层", "2层", "3层", "4层", "5层", "6层", "7层", "8层"]
  let carPriceList = [];
  let carPriceTitleList = [];
  Object.keys(carPriceTable).forEach(key => {
    carPriceList.push(carNameTable[key]);
    carPriceTitleList.push(carPriceTable[key] + "");
  })
  useEffect(() => {
    navigation.setOptions({
      title: "收费标准",
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
          {/* let price = carPriceTable[selectedMove] * travelNumber + floorPrice; */}
          <Text style={styles.title}>1、车型每百米单价费用（单位：元）</Text>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={carPriceList}
              style={styles.head}
              textStyle={styles.text}
            />
            <Row
              data={carPriceTitleList}
              textStyle={styles.text}
            />
          </Table>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.title}>2、楼层费用（单位：元）</Text>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={tableTitle}
              style={styles.head}
              textStyle={styles.text}
            />
            <Row
              data={floorPriceTable}
              textStyle={styles.text}
            />
          </Table>
        </View>
        {/* 价格计算公式：搬家费用 = 1*车型单价*百米数量 + 楼层费 */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.title}>3、搬家服务价格计算方式</Text>
          <Text>搬家整体费用 = 车型每百米单价*(距离（米）/100) + 楼层费（搬出+搬入）+ 额外费用（过路费/停车费等）</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.title}>4、搬家服务支付方式</Text>
          <Text>下单时支付订金：20%（不包括额外费用的）</Text>
          <Text>订单结束后支付剩余费用：80%+额外费用</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.title}>5、订单取消政策</Text>
          <Text>未被接单时可以取消订单，取消订单退还订金费用；
            司机已接单，但是未到达出发地，取消订单不退还订金；司机已到达出发地，不可取消订单，只能联系客服人员协商措施</Text>
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