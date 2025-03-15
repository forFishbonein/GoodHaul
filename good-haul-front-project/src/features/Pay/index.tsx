import { StyleSheet, Text, View, Dimensions, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Center, Button, Modal } from "native-base"
import AntDesign from 'react-native-vector-icons/AntDesign'
import CountdownTimer from "../../components/CountdownTimer";
import useOrderApi from "../../apis/order"
import { useOrderRedux } from '../../store/order/orderSlice';
import { useSelector, useDispatch } from 'react-redux';
import { throttleCd } from "../../utils/throttle"
import { useThrottle } from "../../utils/hooks/throttleHook"
export default function Pay({ route, navigation }) {
  const dispatch = useDispatch();
  const { searchAllOrderAsync } = useOrderRedux();
  const { payMoveOrderDeposit, payMoveOrderRemain } = useOrderApi();
  //控制用户回退的动作，跳转到指定的页面！
  const backAction = () => {
    //@ts-ignore
    dispatch(searchAllOrderAsync); //重新查询订单列表
    // 如果满足特定条件，执行自定义操作
    // navigation.navigate('Order');
    navigation.navigate('Order', { //使用replace跳转之后不可以返回！但是不知道为啥识别不到Order
      screen: 'TopTabOrder', params: {
        screen: 'WaitPay',
      }
    });
    // navigation.navigate('Order', { //使用replace跳转之后不可以返回！但是不知道为啥识别不到Order
    //   screen: 'TopTabOrder', params: {
    //     screen: 'All',
    //   }
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

  let [price, setPrice] = useState(0);
  let [allPrice, setAllPrice] = useState(0);
  let [orderId, setOrderId] = useState();
  useEffect(() => {
    //这里很奇怪，传remain会出一次deposit一次remain（原因是下面if里面写的是单=，可能会造成异常但是不报错！！！！）")
    // console.log("route.params", route.params);
    if (route.params.payType == "deposit") {
      navigation.setOptions({ //不会触发navigation的UseEffect，没关系
        title: "支付订金(20%)",
      })
      setPrice(Number((route.params.price * 0.2).toFixed(2)));
      setAllPrice(price);
    } else if (route.params.payType == "remain") {
      navigation.setOptions({
        title: `支付尾款(含额外费用${route.params.extraPrice}元)`,
      })
      setPrice(Number((route.params.price + route.params.extraPrice - route.params.paidPrice).toFixed(2)));
      setAllPrice(route.params.price + route.params.extraPrice);
    }
    setOrderId(route.params.orderId);
  }, [route.params.payType])
  let [second, setSecond] = useState(3);
  // const intervalId: any = null;
  //TODO useState动态赋值事件回调函数
  let [directJump, setDirectJump]: any = useState();
  const confirmPayOrigin = async () => {
    console.log("payType", route.params.payType)
    let res: any;
    if (route.params.payType == "deposit") {
      let paidPrice = price
      res = await payMoveOrderDeposit(orderId, paidPrice); //调用方法
    } else if (route.params.payType == "remain") {
      // let paidPrice = price - Number((price * 0.2).toFixed(2))
      // res = await payMoveOrderDeposit(orderId, paidPrice); //调用方法
      res = await payMoveOrderRemain(orderId); //调用方法
    }
    if (res.data) {//应该为true
      let time = 3;
      setShowModal(true);
      //@ts-ignore
      dispatch(searchAllOrderAsync); //重新查询订单列表
      //支付完成，3s后自动跳到订单页面！
      //注意：必须用const，不然会重复跳转！
      const intervalId = setInterval(() => {
        if (time >= 2) {
          time = time - 1
          setSecond(time);
        } else if (time == 1) {
          time = 0
          setSecond(time);
          clearInterval(intervalId)
          routeGo();
        }
      }, 1000)
      // const timeOutId = setTimeout(() => {
      //   console.log(timeOutId) //非空
      //   alert(222)
      //   routeGo();
      // }, 3000)
      setDirectJump(
        () => {
          return () => {
            clearInterval(intervalId);
            setShowModal(false);
            routeGo();
          }
        }
      )
    }
  }
  const confirmPay = useThrottle(confirmPayOrigin, 5000); //delay设置大一些
  const routeGo = () => {
    // console.log('当前页面路由：', route); // 输出当前页面路由名称
    /**
     * //TODO
      导航堆栈层级问题： 如果Detail屏幕在另一个导航堆栈中，而不是当前导航堆栈的一部分，导航操作可能会失败。确保您尝试导航到的屏幕位于当前导航堆栈中，或者您使用了正确的导航堆栈引用来执行导航操作。
      默认navigate方法传递的name只能导航到同一导航堆栈
      同一导航堆栈：就是位于同一级（当前层次）的Stack.Navigator下的所有Stack.Screen
      使用屏幕名称的完整路径: 如果Detail屏幕在不同的导航堆栈中，您可以尝试使用屏幕名称的完整路径进行导航
      两层：
        navigation.replace('Order', {
          screen: 'Detail'
        });
    */
    if (route.params.payType == "deposit") {
      if (route.params.rePay) {
        //这里是一开始没支付，在订单列表支付的
        //TODO 跳转策略：支付完跳转到空的detail，然后根据id重新查询详情信息，然后控制返回按钮返回到对应的类别订单列表里面即可！
        //为什么不用之前的数据？如果我们支付完直接返回上一页面，可是我们还要重新查询status，但是监听特定路由页面的跳转是不管用的！所以没法保证更新！
        navigation.navigate('Order', {
          screen: 'Detail', params: {
            orderId: orderId
          }
        });
      } else {
        //下面这样可以直接跳转三层！
        navigation.navigate('Order', { //使用replace跳转之后不可以返回！但是不知道为啥识别不到Order
          screen: 'TopTabOrder', params: {
            screen: 'WaitReceive',
          }
        });
      }
    } else if (route.params.payType == "remain") {
      navigation.navigate('Order', {
        screen: 'Detail', params: {
          orderId: orderId
        }
      });
    }
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Center height={90} width={{
            base: Dimensions.get("window").width * 0.8,
          }}>
            <View>
              <CountdownTimer initialTime={900} text="支付剩余时间"></CountdownTimer>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
                <Text style={{ color: "#000000", fontWeight: "bold", fontSize: 13 }}>¥</Text>
                <Text style={{ color: "#000000", fontWeight: "bold", fontSize: 20, marginLeft: 2 }}>{price}</Text>
              </View>
            </View>
          </Center>
          <View style={{ alignItems: "flex-start", height: 60 }}>
            <Text style={{ fontWeight: "bold", color: "#000000", fontSize: 15 }}>支付方式</Text>
            <View style={{ flexDirection: "row", height: 40, alignItems: "center" }}>
              <Image source={require("../../assets/image/weixin.jpg")} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 5 }}></Image>
              <Text style={{ marginRight: 10 }}>微信支付</Text>
              <AntDesign name="checkcircle" color={'#0891b2'} size={15} />
            </View>
          </View>
        </View>
        <View>
          <Button style={{ width: Dimensions.get("window").width * 0.8 }} onPress={confirmPay}>确认支付</Button>
        </View>
      </View>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>提示</Modal.Header>
          <Modal.Body>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "" }}>恭喜您，支付成功！</Text>
              <Text>{second}秒后自动跳转~</Text>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" flex="1" onPress={directJump}>
              直接跳转
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: Dimensions.get("window").height * 0.9,
    alignItems: "center"
  },
  container2: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#ffffff",
    marginTop: 15,
    borderRadius: 15,
    padding: 20
  }
})