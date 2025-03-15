import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Linking, PanResponder, RefreshControl } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapPath from "../../components/MapPath"
import { orderStatus, orderStatusDriver } from "../../../../constant/status"
import { carNameTable } from "../../../../constant/name"
import LinearGradinet from 'react-native-linear-gradient';
import formDate from "../../../../utils/formDate"
import { Center, Button, Modal, useToast, Popover, Input } from "native-base"
import Clipboard from '@react-native-clipboard/clipboard';
import Entypo from 'react-native-vector-icons/Entypo'
import useOrderApi from "../../../../apis/order"
import { useOrderRedux } from '../../../../store/order/orderSlice';
import { useSelector, useDispatch } from 'react-redux';
import AlertWarning from '../../../../components/AlertWarning';
import { throttleCd } from "../../../../utils/throttle"
import { useThrottle } from "../../../../utils/hooks/throttleHook"
export default function Detail({ route, navigation }) {
  const { searchAllOrderAsync } = useOrderRedux();
  const { getOneMoveOrderById, cancelMoveOrder, confirmArrive, generateCode, confirmFinishOrder } = useOrderApi();
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
      let orderInfo = JSON.parse(route.params.orderInfo);
      setOrderInfo(orderInfo); //TODO 传过来的是对象，orderInfo是里面的一个属性，但是是string字符串，要进行解析为对象！
    }
    //2.支付完进来的
    if (route.params && route.params.orderId) {
      getOneMoveOrderById(route.params.orderId).then((res) => {
        setOrderInfo(res.data);
      })
    }
  }, [route.params])
  const copyToClipboard = (string) => {
    return () => {
      Clipboard.setString(string);
    }
  };
  const toast = useToast();
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
  const confirmTheArriveOrigin = async () => {
    let res = await confirmArrive(orderInfo?.id);
    if (res.data) {
      //重新查询当前订单信息
      getOneMoveOrderById(orderInfo?.id).then((res) => {
        setOrderInfo(res.data);
      })
      //@ts-ignore
      dispatch(searchAllOrderAsync);
      let toastOption = {
        status: "success",
        title: "已确认到达！"
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
  const confirmTheArrive = useThrottle(confirmTheArriveOrigin, 5000); //delay设置大一些
  const [showModal2, setShowModal2] = useState(false);
  const [extraPrice, setExtraPrice] = useState(false);
  const confirmGenerateCodeOrigin = async () => {
    let extra = 0;
    if (extraPrice) {
      if (/^\d+$/.test(extraPrice)) {
        extra = Number(extraPrice);
      } else {
        let toastOption = {
          status: "error",
          title: "额外费用请填写数字！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
        return;
      }
    }
    let res = await generateCode(orderInfo?.id, extra);
    if (res.data) {
      //重新查询当前订单信息
      getOneMoveOrderById(orderInfo?.id).then((res) => {
        setOrderInfo(res.data);
      })
      //@ts-ignore
      dispatch(searchAllOrderAsync);
      let toastOption = {
        status: "success",
        title: "已生成收货码！"
      }
      toast.show({
        placement: "top", //在上方弹出
        render: ({
          id
        }) => {
          return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
        }
      });
      setShowModal2(false);
    } else {
      let toastOption = {
        status: "warning",
        title: "收货码已生成，无法重复生成！"
      }
      toast.show({
        placement: "top", //在上方弹出
        render: ({
          id
        }) => {
          return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
        }
      });
      setShowModal2(false);
    }
  }
  const confirmGenerateCode = useThrottle(confirmGenerateCodeOrigin, 5000); //delay设置大一些
  const [showModal, setShowModal] = useState(false);
  const [finishCode, setFinishCode] = useState();
  const confirmCompleteOrigin = async () => {
    if (finishCode) {
      let res = await confirmFinishOrder(orderInfo?.id, finishCode);
      setShowModal(false);
      if (res.data) {
        //重新查询当前订单信息
        getOneMoveOrderById(orderInfo?.id).then((res) => {
          setOrderInfo(res.data);
        })
        //@ts-ignore
        dispatch(searchAllOrderAsync);
        let toastOption = {
          status: "success",
          title: "订单已完成！"
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
          status: "error",
          title: "收货码不匹配！"
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
  }
  const confirmComplete = useThrottle(confirmCompleteOrigin, 5000); //delay设置大一些

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
  return (
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
          orderInfo?.status != "finished" && orderInfo?.status != "wait-payremain" && orderInfo?.status != "canceled" ?
            <View style={styles.mapContainer}>
              {orderInfo ? <MapPath width={Dimensions.get("window").width} height={400} panHandlers={panResponder.panHandlers} addressInfo={orderInfo?.address} webViewRef={webViewRef}></MapPath> : null}
            </View>
            : null
        }
        <View style={styles.container}>
          <View style={styles.statusContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.statusText}>{orderStatusDriver[orderInfo?.status]}</Text>
              <Text style={{ fontSize: 12, marginLeft: 10 }}>{orderInfo?.status == "canceled" ? "(已支付款项将于1-3个工作日内原路返还)" : null}</Text>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>用户昵称</Text>
              <Text>{orderInfo?.userName}</Text>
            </View>
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
              <Text style={styles.titleText}>搬出楼层</Text>
              <Text>{Number(orderInfo?.address?.out?.floor) ? "楼梯" + orderInfo?.address?.out?.floor + "层" : "全程电梯"} {orderInfo?.address?.out?.door ? orderInfo?.address?.out?.door : ""}</Text>
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
              <Text style={styles.titleText}>搬入楼层</Text>
              <Text>{Number(orderInfo?.address?.in?.floor) ? "楼梯" + orderInfo?.address?.in?.floor + "层" : "全程电梯"} {orderInfo?.address?.in?.door ? orderInfo?.address?.in?.door : ""}</Text>
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
              <Text style={styles.titleText}>预计可得佣金</Text>
              <Text>{orderInfo?.extraPrice ? (orderInfo?.price + orderInfo?.extraPrice) * 0.5 : orderInfo?.price * 0.5}元</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>用户已支付</Text>
              <Text>{orderInfo?.paidPrice ? orderInfo?.paidPrice : "0"}元</Text>
            </View>
            <View style={styles.blockLine}>
              <Text style={styles.titleText}>订单编号</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>{orderInfo?.id}</Text>
                <TouchableOpacity onPress={copyToClipboard(orderInfo?.id)} style={{ paddingLeft: 5 }}>
                  <Text style={{ color: "#f97316" }}>复制</Text>
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
            {
              orderInfo?.status == "wait-payremain" || orderInfo?.status == "finished" ? <View style={styles.blockLine}>
                <Text style={styles.titleText}>签收时间</Text>
                <Text>{formDate(orderInfo?.finishTime)}</Text>
              </View> : null
            }
          </View>

          {orderInfo?.status == "on-way" ? <Popover trigger={triggerProps => {
            return <Button {...triggerProps} style={{ width: Dimensions.get("window").width * 0.9, marginTop: 15 }}>确认已到达</Button>
          }}>
            <Popover.Content accessibilityLabel="Delete Customerd" w="56">
              <Popover.Arrow />
              <Popover.CloseButton />
              <Popover.Header>确认到达</Popover.Header>
              <Popover.Body>
                注意：确认到达搬出地址后，用户将不可取消订单，<Text style={{ color: "#E4080A" }}>请务必先与用户电话联系确认到达再点击此按钮！</Text>
              </Popover.Body>
              <Popover.Footer justifyContent="flex-end">
                <Button variant="outline" colorScheme="secondary" onPress={confirmTheArrive}>
                  确认
                </Button>
              </Popover.Footer>
            </Popover.Content>
          </Popover> : null}
          {orderInfo?.status == "load-transport" && !orderInfo?.confirmCode ?
            <Button style={{ width: Dimensions.get("window").width * 0.9, marginTop: 15 }} onPress={() => {
              setShowModal2(true)
            }}>生成收货码</Button> : null}
          <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>填写额外费用&生成收货码</Modal.Header>
              <Modal.Body>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View>
                    <Text style={{ color: "#E4080A" }}>注意：请如实填写额外费用(过路费,停车费等)，不填写代表没有额外费用</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Input value={extraPrice} onChangeText={(text) => { setExtraPrice(text) }} variant="rounded"
                      placeholder="请输入额外费用" width={120} marginRight={2} marginBottom={3} marginTop={3} />
                    <Text>元</Text>
                  </View>
                  <View>
                    <Text>确认货运完成需要填写收货码</Text>
                    <Text style={{ color: "#E4080A" }}>注意：请与用户确认货运情况和额外费用后再点击此按钮进行生成！</Text>
                  </View>
                </View>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button onPress={confirmGenerateCode}>
                    确定填写并生成
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          {orderInfo?.status == "load-transport" && orderInfo?.confirmCode &&
            <Button style={{ width: Dimensions.get("window").width * 0.9, marginTop: 15 }} onPress={() => {
              setShowModal(true)
            }}>确认货运完成</Button>
          }
        </View>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>填写收货码</Modal.Header>
            <Modal.Body>
              <Input value={finishCode} variant="underlined" placeholder="请向用户询问收货码" onChangeText={(text) => { setFinishCode(text) }} />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button onPress={confirmComplete}>
                  确认货运完成
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
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
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 15
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
  statusText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "600"
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