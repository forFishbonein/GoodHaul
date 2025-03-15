import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Linking, PanResponder, RefreshControl } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapPath from "../../components/MapPath"
import { orderStatus } from "../../../../constant/status"
import { carNameTable } from "../../../../constant/name"
import LinearGradinet from 'react-native-linear-gradient';
import formDate from "../../../../utils/formDate"
import { Center, Button, Modal, useToast, Popover } from "native-base"
import Clipboard from '@react-native-clipboard/clipboard';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import useOrderApi from "../../../../apis/order"
import { searchAllOrderAsync } from '../../../../store/order/orderSlice';
import { useSelector, useDispatch } from 'react-redux';
import AlertWarning from '../../../../components/AlertWarning';
import { throttleCd } from "../../../../utils/throttle"
import { useThrottle } from "../../../../utils/hooks/throttleHook"
import { Avatar } from "native-base"
import Tab from "../../components/Tab"
import useChatApi from "../../../../apis/chat"
import { setChatList } from "../../../../store/chat/chatSlice"
export default function Detail({ route, navigation }) {
  const { getOneMoveOrderById, cancelMoveOrder } = useOrderApi();
  const { checkIfHaveChat, createOneChat, getChatContentByChatId } = useChatApi();
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: "订单详情",
    })
  }, [])
  let [orderInfo, setOrderInfo] = useState();
  useEffect(() => { //这里不能写async
    //1.列表进来的
    if (route.params && route.params.orderInfo) {
      /**
       * 注意：
       * LOG  {"id":"65f98fea329dabb5be03efec","userId":123,"address":{"out":
       * {"latlng":{"lat":30.473953,"lng":114.386325},"poiaddress":"湖北省武汉市洪山区南湖大道182号",
       * "poiname":"中南财经政法大学(南湖校区)","cityname":"武汉市","phone":"15530612150","door":"","floor":5},
       * "in":{"latlng":{"lat":30.607391,"lng":114.424522},"poiaddress":"湖北省武汉市洪山区白云路",
       * "poiname":"武汉站","cityname":"武汉市","phone":"15536121506","door":"","floor":7}},
       * "carType":"Small","distance":15.282,"peopleNumber":1,
       * "price":292.26,"time":"Tue Mar 19 2024 22:00:05 GMT+0800","status":"wait-receive"}
       * 和
          LOG  {"address": {"in": {"cityname": "武汉市", "door": "", "floor": 7,
          "latlng": [Object], "phone": "15536121506", "poiaddress": "湖北省武汉市洪山区白云路",
          "poiname": "武汉站"}, "out": {"cityname": "武汉市", "door": "", "floor": 5,
          "latlng": [Object], "phone": "15530612150", "poiaddress": "湖北省武汉市洪山区南湖大道182号",
          "poiname": "中南财经政法大学(南湖校区)"}}, "carType": "Small", "distance": 15.282,
          "id": "65f98fea329dabb5be03efec", "peopleNumber": 1, "price": 292.26, "status": "wait-receive",
          "time": "Tue Mar 19 2024 22:00:05 GMT+0800", "userId": 123}
          是没有区别的，，latlng 属性被输出为 [Object]。这只是表示该属性是一个对象，并且在日志输出时可能被简化为 [Object]，
          但实际上它仍然是一个包含 lat 和 lng 属性的对象。
       */
      let orderInfo = JSON.parse(route.params.orderInfo);
      setOrderInfo(orderInfo); //TODO 传过来的是对象，orderInfo是里面的一个属性，但是是string字符串，要进行解析为对象！
    }
    // if (route.params && route.params.from === 'Pay') { //TODO 监听特定路由页面的跳转是不管用的
    //   // 从 Pay 页面跳转过来时触发特定函数
    //   Alert('特定函数已触发');
    // }
    //2.支付完进来的
    if (route.params && route.params.orderId) {
      getOneMoveOrderById(route.params.orderId).then((res) => {
        setOrderInfo(res.data);
      })
    }
  }, [route.params])
  const copyToClipboard = (string) => {
    return () => {
      Clipboard.setString(string.toString());
    }
  };
  const phoneNumber = '+86 15530612150'; // 替换成要拨打的电话号码
  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleDriverCallPress = (phone) => {
    return () => {
      Linking.openURL(`tel:${phone}`);
    }
  };
  const goToPay = () => {
    // console.log("orderInfo?.status", orderInfo?.status)
    if (orderInfo?.status == "wait-paydeposit") {
      navigation.navigate('Pay', {
        price: orderInfo.price,
        orderId: orderInfo.id,
        payType: "deposit",
        rePay: true
      });
    } else if (orderInfo?.status == "wait-payremain") {
      navigation.navigate('Pay', {
        price: orderInfo.price,
        extraPrice: orderInfo.extraPrice,
        paidPrice: orderInfo.paidPrice,
        orderId: orderInfo.id,
        payType: "remain",
      });
    }
  }
  const toast = useToast();
  const cancelTheOrderOrigin = async () => {
    if (orderInfo?.status == "wait-paydeposit" || orderInfo?.status == "wait-receive") {
      let res = await cancelMoveOrder(orderInfo.id)
      if (res.data) {
        // setOrderInfo((data) => {
        //   return {
        //     ...data,
        //     status: "canceled"
        //   }
        // })
        //重新查询当前订单信息
        getOneMoveOrderById(orderInfo?.id).then((res) => {
          setOrderInfo(res.data);
        })
        //@ts-ignore
        dispatch(searchAllOrderAsync); //重新查询订单列表
        let toastOption = {
          status: "success",
          title: "已取消"
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
          status: "warning",
          title: "已被接单，无法取消！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
        //重新查询当前订单信息
        getOneMoveOrderById(orderInfo?.id).then((res) => {
          setOrderInfo(res.data);
        })
      }
    }
  }
  const cancelTheOrder = useThrottle(cancelTheOrderOrigin, 5000); //delay设置大一些
  //TODO 手势冲突处理：rn里面，组件之间手势冲突的处理，当滚动webview的时候，禁用ScrollView 的滚动，这样就可以随意移动地图了
  const webViewRef = useRef(null);
  const scrollViewRef = useRef(null);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      // 在针对WebView的手指触摸开始时禁用外部 ScrollView 的滚动
      scrollViewRef.current.setNativeProps({ scrollEnabled: false });
    },
    onPanResponderMove: (evt, gestureState) => {
      // 在针对WebView的手指移动过程中处理 WebView 的滚动
      webViewRef.current.injectJavaScript(`window.scrollTo(0, ${gestureState.dy})`);
    },
    onPanResponderRelease: () => {
      // 在针对WebView的手指释放后启用外部 ScrollView 的滚动
      scrollViewRef.current.setNativeProps({ scrollEnabled: true });
    },
  });
  //控制下拉刷新！
  const [refreshing, setRefreshing] = useState(false);
  // 下拉刷新触发的函数
  const onRefresh = async () => {
    setRefreshing(true);
    getOneMoveOrderById(orderInfo?.id).then((res) => {
      setOrderInfo(res.data);
    })
    setRefreshing(false);
  };
  const goToFeedBack = () => {
    navigation.navigate('FeedBack', {
      orderId: orderInfo.id,
      driverId: orderInfo.driverId
    });
  }
  //处理聊天
  const handleChatPressOrigin = async () => {
    let result = await checkIfHaveChat(orderInfo.driverId, orderInfo.id);
    if (result.data.chatId) {
      let res = await getChatContentByChatId(result.data.chatId);
      let chatContent = res.data.chatContent
      // console.log(JSON.stringify(chatContent))
      navigation.navigate("ChatContent", { chatContent: JSON.stringify(chatContent) });
    } else {
      // dispatch(setChatList([]));
      let params = {
        driverId: orderInfo.driverId,
        orderId: orderInfo.id
      }
      let res = await createOneChat(params);
      let chatContent = res.data.chatContent
      // console.log(JSON.stringify(chatContent))
      navigation.navigate("ChatContent", { chatContent: JSON.stringify(chatContent) });
    }
  }
  const handleChatPress = useThrottle(handleChatPressOrigin, 5000); //delay设置大一些
  return (
    // TODO 大坑：View必须要设置flex:1才能撑起来，否则高度是0
    // <View style={{flex:1}}></View>
    /*
      TODO 用ScrollView包着WebView的时候，在Android 12上跑的时候滚动到最顶部或最底部时会闪退。这是系统版本兼容问题。
      解决办法：在ScrollView添加属性: overScrollMode="never"
      注意：还必须要加上 removeClippedSubviews={true}这样跳转页面之后才不会闪退，否则还是会的！
    */
    <>
      <ScrollView
        overScrollMode="never"
        removeClippedSubviews={true}
        ref={scrollViewRef}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {
          orderInfo?.status != "finished" && orderInfo?.status != "canceled" && <View style={styles.mapContainer}>
            {orderInfo ? <MapPath width={Dimensions.get("window").width} height={400} panHandlers={panResponder.panHandlers} addressInfo={orderInfo?.address} webViewRef={webViewRef}></MapPath> : null}
          </View>
        }
        <View style={styles.container}>
          <View style={styles.statusContainer}>
            {/* 注意：RN里面不能直接通过css属性来设置渐变颜色，需要使用LinearGradinet包裹，相当于backgroundColor */}
            {
              orderInfo?.status != "finished" && orderInfo?.status != "canceled" &&
              <LinearGradinet
                colors={["#E1E6FC", "#FCF2F3"]}
                useAngle={true}// 开启旋转
                angle={90}// 旋转角度，0的时候为从下到上渐变，按照角度顺时针旋转
                angleCenter={{ x: 0.5, y: 0.5 }}// 旋转中心
                style={styles.bannerContainer}>
                <Text style={{ fontSize: 13 }}>客服全程监督服务质量，如有问题请</Text>
                <TouchableOpacity onPress={handleCallPress} style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ textDecorationLine: 'underline' }}>致电联系我们</Text>
                  <Entypo name="phone" color={"#737373"} size={14} />
                </TouchableOpacity>
              </LinearGradinet>
            }
            <View style={styles.textContainer}>

              {
                orderInfo?.status != "canceled" && orderInfo?.status != "wait-paydeposit"
                  && orderInfo?.status != "wait-receive" ?
                  <TouchableOpacity onPress={goToFeedBack} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Text style={styles.statusText}>{orderStatus[orderInfo?.status]}</Text>
                    <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
                  </TouchableOpacity>
                  : <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Text style={styles.statusText}>{orderStatus[orderInfo?.status]}</Text>
                  </View>
              }

              {orderInfo?.status == "canceled" && <Text style={{ fontSize: 12, marginLeft: 10 }}>(已支付款项将于1-3个工作日内原路返还)</Text>}
            </View>
            {orderInfo?.status != "canceled" && orderInfo?.status != "wait-paydeposit" && orderInfo?.status != "wait-receive" ?
              <View style={styles.driverContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Avatar bg="#fff" style={{ borderColor: "#0891b2", borderWidth: 1 }} source={{
                    uri: "https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/%E9%AA%91%E6%89%8B%E7%AB%AF-%E9%AA%91%E6%89%8B.png"
                  }} alignSelf="center" size="md" >
                    AJ
                  </Avatar>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 20, color: "#000", fontWeight: "600", marginBottom: 5 }}>
                      {orderInfo?.driverInfo?.name?.slice(0, 1)}师傅
                    </Text>
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                      <Tab>实名认证</Tab>
                      <Tab color={"#10b981"}>
                        <FontAwesome name="leaf" color={"#10b981"} size={12} />
                        信用司机
                      </Tab>
                    </View>
                    <Text>
                      {orderInfo?.driverInfo?.finishOrderNumber ? orderInfo?.driverInfo?.finishOrderNumber > 1000 ?
                        `${orderInfo?.driverInfo?.finishOrderNumber / 1000}千单` :
                        `${orderInfo?.driverInfo?.finishOrderNumber}单` : "0单"}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={{ alignItems: "center" }} onPress={handleDriverCallPress(orderInfo?.driverInfo?.phone)}>
                    <FontAwesome name="phone" color={"#737373"} size={20} />
                    <Text style={{ fontSize: 13 }}>打电话</Text>
                  </TouchableOpacity>
                  {
                    orderInfo?.status != "finished" &&
                    <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }} onPress={handleChatPress}>
                      <AntDesign name="message1" color={"#737373"} size={20} />
                      <Text style={{ fontSize: 13 }}>发消息</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
              : null}
          </View>
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceText}>师傅实名认证</Text>
            <Text style={styles.serviceText}>后台服务监控</Text>
            <Text style={styles.serviceText}>行程录音保驾</Text>
          </View>
          <View style={styles.detailContainer}>
            {/* <View style={[styles.blockLine]}>
              <Text style={styles.titleText}>订单信息</Text>
              <Text>投诉 {">"}</Text>
            </View> */}
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>服务时间</Text>
              <Text>{formDate(orderInfo?.time)}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>订单类型</Text>
              <Text>{orderInfo?.serviceType == "move" ? "搬家" : orderInfo?.serviceType == "run" ? "跑腿" : ""}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>车型</Text>
              <Text>{carNameTable[orderInfo?.carType]}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>搬出地址</Text>
              <Text>{orderInfo?.address?.out?.poiname}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>搬出电话</Text>
              <Text>{orderInfo?.address?.out?.phone}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>搬入地址</Text>
              <Text>{orderInfo?.address?.in?.poiname}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>搬入电话</Text>
              <Text>{orderInfo?.address?.in?.phone}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>直线距离</Text>
              <Text>{orderInfo?.distance.toFixed(2)}公里</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>总费用</Text>
              <Text>{orderInfo?.extraPrice ? orderInfo?.price + orderInfo?.extraPrice : orderInfo?.price}元</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>已支付费用</Text>
              <Text>{orderInfo?.paidPrice ? orderInfo?.paidPrice : "0"}元</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>订单编号</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>{orderInfo?.id}</Text>
                <TouchableOpacity onPress={copyToClipboard(orderInfo?.id)} style={{ paddingLeft: 5 }}>
                  <Text style={{ color: "#0891b2" }}>复制</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>订单创建时间</Text>
              <Text>{formDate(orderInfo?.createTime)}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>备注</Text>
              <Text style={{ maxWidth: "50%" }}>{orderInfo?.remark ? orderInfo?.remark : "无备注信息"}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>额外费用</Text>
              <Text>{orderInfo?.extraPrice ? orderInfo?.extraPrice + "元" : "暂无"}</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>收货码</Text>

              <View style={{ flexDirection: "row" }}>
                <Text>{orderInfo?.confirmCode ? orderInfo?.confirmCode : "暂无"}</Text>
                {
                  orderInfo?.confirmCode ?
                    <TouchableOpacity onPress={copyToClipboard(orderInfo?.confirmCode)} style={{ paddingLeft: 5 }}>
                      <Text style={{ color: "#0891b2" }}>复制</Text>
                    </TouchableOpacity> : null
                }
              </View>
            </View>
            {
              (orderInfo?.status == "wait-payremain" || orderInfo?.status == "finished") ? <View style={styles.blockLine}>
                <Text style={styles.titleText}>签收时间</Text>
                <Text>{formDate(orderInfo?.finishTime)}</Text>
              </View> : null
            }
            {
              orderInfo?.status == "finished" ? <View style={styles.blockLine}>
                <Text style={styles.titleText}>支付尾款时间</Text>
                <Text>{formDate(orderInfo?.completePayTime)}</Text>
              </View> : null
            }
          </View>
          {(orderInfo?.status == "wait-paydeposit" || orderInfo?.status == "wait-payremain") ? <Button onPress={goToPay} style={{ width: Dimensions.get("window").width * 0.9, marginTop: 15 }}>去支付</Button> : null}
          {/* 还没接单就可以取消订单 */}
          {(orderInfo?.status == "wait-paydeposit" || orderInfo?.status == "wait-receive" || orderInfo?.status == "on-way") ? <Popover trigger={triggerProps => {
            return <Button {...triggerProps} style={{ width: Dimensions.get("window").width * 0.9, marginTop: 15 }}>取消订单</Button>
          }}>
            <Popover.Content accessibilityLabel="Delete Customerd" w="56">
              <Popover.Arrow />
              <Popover.CloseButton />
              <Popover.Header>取消订单</Popover.Header>
              <Popover.Body>
                {orderInfo?.status == "on-way" ? "注意：当前司机已在路上，取消订单会扣除已支付押金！" : "注意：取消订单后不可更改，已支付款项将于1-3个工作日内原路返还~"}
              </Popover.Body>
              <Popover.Footer justifyContent="flex-end">
                <Button variant="outline" colorScheme="secondary" onPress={cancelTheOrder}>
                  确认取消
                </Button>
              </Popover.Footer>
            </Popover.Content>
          </Popover> : null}
        </View>
      </ScrollView >
    </>
  )
}

const styles = StyleSheet.create({
  mapContainer: { width: Dimensions.get("window").width, height: 300 },
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  statusContainer: {
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    // height: 100,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  bannerContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  driverContainer: {
    width: Dimensions.get("window").width * 0.9 - 30,
    borderTopWidth: 1,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 110
  },
  statusText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "600",
    marginRight: 5
  },
  serviceContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    backgroundColor: "#fff",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  serviceText: {
    color: "#FD9900"
  },
  detailContainer: {
    width: Dimensions.get("window").width * 0.9,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  blockLine: {
    width: "100%",
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    fontWeight: "600",
    color: "#737373"
  }
})