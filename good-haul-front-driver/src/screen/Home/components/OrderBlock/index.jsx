import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import formDate from "../../../../utils/formDate.js"
import getDistance from "../../../../utils/getDistance.js"
import { carNameTable } from "../../../../constant/name.js"
import { useSelector, useDispatch } from 'react-redux';
import { selectLocationLatlng } from '../../../../store/locate/locateSlice.js';
import { Button, Modal, Select, Popover } from "native-base"
import Clipboard from '@react-native-clipboard/clipboard';
export default function OrderBlock({ orderInfo, receiveOrder }) {
  //使用dispatch更新之后，latlng会自动更新，然后把最新的值给到jsx结构中！
  const latlng = useSelector(selectLocationLatlng);
  let [distance, setDistance] = useState();
  let [timeStatus, setTimeStatus] = useState(0); //1紧急(1.5小时内，或者小于当前时间的)，2宽松（1.5小时外，今日内），3明日单
  let [time, setTime] = useState();
  useEffect(() => {
    if (orderInfo?.address && latlng?.length > 0) {
      let distance = getDistance(latlng[0], latlng[1], orderInfo?.address?.out?.latlng?.lat, orderInfo?.address?.out?.latlng?.lng).toFixed(2)
      setDistance(distance);
    }
  }, [orderInfo, latlng]) //在 orderInfo 或 latlng 发生变化时
  useEffect(() => {
    if (orderInfo) {
      let month = (new Date().getMonth() + 1).toString().padStart(2, '0');
      let day = (new Date().getDate()).toString().padStart(2, '0');
      let time = formDate(orderInfo?.time);
      if (time?.slice(5, 7) == month && time?.slice(8, 10) == day) {
        setTime("今日" + time?.slice(11)); //应该直接截取到最后的
      } else {
        setTime(time);
      }
      let orderTime = new Date(orderInfo.time).getTime();
      let nowTime = new Date().getTime();
      let a = new Date();
      a.setHours(24, 0, 0, 0)
      let zeroTime = a.getTime();
      if (orderTime - nowTime <= 1.5 * 60 * 60 * 1000) {
        setTimeStatus(1)
      } else if (orderTime < zeroTime) {
        setTimeStatus(2)
      } else {
        setTimeStatus(3)
      }
    }

  }, [orderInfo])
  const copyToClipboard = (string) => {
    return () => {
      Clipboard.setString(string);
    }
  };

  return (
    <>
      <View style={styles.blockContainer}>
        <Popover trigger={triggerProps => { //注意：triggerProps必须放在一个可点击的模块上面！
          return <TouchableOpacity {...triggerProps} style={[styles.titleContainer, {
            backgroundColor: timeStatus === 1 ? "#ea580c" : timeStatus === 2 ? "#10b981" : "#06b6d4"
          }]}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>{time}</Text>
            <Text style={{ color: "#fff", fontWeight: "600" }}>距您{distance}公里</Text>
          </TouchableOpacity>
        }}>
          <Popover.Content accessibilityLabel="订单编号" w={250} bg={"#fff7ed"}>
            <Popover.Arrow />
            <Popover.CloseButton />
            <Popover.Header>订单编号</Popover.Header>
            <Popover.Body>
              <View style={{ flexDirection: "row" }}>
                <Text>{orderInfo?.id}</Text>
                <TouchableOpacity onPress={copyToClipboard(orderInfo?.id)} style={{ paddingLeft: 5 }}>
                  <Text style={{ color: "#f97316" }}>复制</Text>
                </TouchableOpacity>
              </View>
            </Popover.Body>
          </Popover.Content>
        </Popover>
        <View style={styles.addressBlock}>
          <View style={styles.addressItem}>
            <Text style={{
              color: '#2A75FE',
              marginRight: 5, fontWeight: "900"
            }}>•</Text><Text style={{ fontWeight: "bold", color: "#000", fontSize: 15 }}>
              {orderInfo?.address?.out?.poiname}
            </Text>
          </View>
          <View style={styles.addressItem}>
            <Text style={{
              color: '#FD9900',
              marginRight: 5, fontWeight: "900"
            }}>•</Text><Text style={{ fontWeight: "bold", color: "#000", fontSize: 15 }}>
              {orderInfo?.address?.in?.poiname}
            </Text>
          </View>
        </View>
        <View style={styles.car}>
          <Text>需要车型：{carNameTable[orderInfo?.carType]}</Text>
        </View>
        <View style={styles.price}>
          <Text style={{ color: "#f97316", fontSize: 30, position: 'relative', top: 5 }}>{orderInfo?.price}</Text>
          <Text style={{ color: "#f97316", fontSize: 15 }}>元</Text>
          <Text style={{ color: "#ececec", fontSize: 16 }}> | </Text>
          <Text> 已支付{orderInfo?.paidPrice}元</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button size="md" variant="outline" onPress={receiveOrder(orderInfo?.id, orderInfo?.carType)} height={10}>
            点击接单
          </Button>
        </View>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  blockContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    paddingBottom: 10
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.9 - 30, //这里外面padding没有生效，所以-30
    height: 40,
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },
  addressBlock: {
    width: "100%",
    alignItems: "flex-start"
  },
  addressItem: {
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 0,
    marginTop: 2,
    marginBottom: 2
  },
  car: {
    width: "100%",
    backgroundColor: "#F2F5F6",
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 10,
  },
  price: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    paddingBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // height: 50,
    marginTop: 10
  }
})