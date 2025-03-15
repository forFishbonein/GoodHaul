import { StyleSheet, Text, View, Dimensions, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderBlock from '../../components/OrderBlock';
import useOrderApi from "../../../../apis/order"
import { Button, Modal, Select, CheckIcon, useToast } from "native-base"
import AlertWarning from '../../../../components/AlertWarning';
import { useSelector, useDispatch } from 'react-redux';
import { useOrderRedux } from '../../../../store/order/orderSlice';
import { useNavigation } from '@react-navigation/native';
import { carNameTable } from "../../../../constant/name"
import TokenUtil from '../../../../utils/token';
import { selectGrabableListDisplay, selectCarList } from '../../../../store/order/orderSlice.js';
import Loading from '../../../../components/Loading';
import EmptyChat from "../../../../components/EmptyChat"
export default function OrderList() {
  const { searchAllOrderAsync, getAbleOrderList } = useOrderRedux();
  const { receiveOneOrder } = useOrderApi();
  // 使用 useNavigation 获取导航对象
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  // let [orderList, setOrderList]: Array<any> = useState();
  // let [orderListOrigin, setOrderListOrigin]: Array<any> = useState();
  let [carList, setCarList]: Array<any> = useState();
  let grabableListStore: any = useSelector(selectGrabableListDisplay);
  let carListStore = useSelector(selectCarList);
  // const getAbleOrderList = async () => {
  //   try {
  //     console.log("进来了")
  //     let res = await getGrabableOrder();
  //     setOrderList(res.data.orderList);
  //     setOrderListOrigin(res.data.orderList);
  //     if (res.data.carList) {
  //       setCarList(res.data.carList);
  //     }
  //   } catch (e) { //try-catch的作用：必须catch，不然就报错，可以在catch重新请求，这样就不报错了
  //     console.log("进来了2")
  //     //如果失败，就再次进行请求，因为有时候mysql断开连接过长第一次请求会失败！
  //     let res = await getGrabableOrder();
  //     setOrderList(res.data.orderList);
  //     setOrderListOrigin(res.data.orderList);
  //     if (res.data.carList) {
  //       setCarList(res.data.carList);
  //     }
  //   }
  // }
  // useEffect(() => {
  //   getAbleOrderList();
  // }, [navigation])
  const [showModal, setShowModal] = useState(false);
  let [orderId, setOrderId]: any = useState();
  const receiveOrder = (id, carType) => {
    return () => {
      // if() //TODO 这里应该判断是司机还是骑手，骑手就不用选车了！
      // console.log(id)
      setOrderId(id); //必须用这样的方式赋值，否则别的函数中取不到orderId的普通变量！
      setShowModal(true)
      setCarList(carListStore.filter(e => { //需要设置当前选择的订单的车型对应的车列表！
        return e.carType == carType
      }))
    }
  }
  let [carId, setCarId]: any = useState();
  const confirmReceive = async () => {
    if (carId) {
      // console.log(orderId)
      // console.log(carId)
      let result = await receiveOneOrder(orderId, carId);
      if (result) {
        setShowModal(false)
        let toastOption = {
          status: "success",
          title: "接单成功！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
        //@ts-ignore
        dispatch(searchAllOrderAsync);
        //@ts-ignore
        dispatch(getAbleOrderList);
        setCarId(null) //清空
        setOrderId(null)
        //@ts-ignore
        navigation.navigate('Order', { //使用replace跳转之后不可以返回！但是不知道为啥识别不到Order
          screen: 'TopTabOrder', params: {
            screen: 'Doing',
          }
        });
      } else {
        //订单状态已被改变，接单失败！
        let toastOption = {
          status: "error",
          title: "订单状态已被改变，接单失败！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
        //@ts-ignore
        dispatch(getAbleOrderList);
        //@ts-ignore
        // dispatch(searchAllOrderAsync); //触发订单列表查询
      }
    } else {
      let toastOption = {
        status: "warning",
        title: "请先选择您的车辆！"
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

  //控制下拉刷新！
  const [refreshing, setRefreshing] = useState(false);
  // 下拉刷新触发的函数
  const onRefresh = async () => {
    setRefreshing(true);
    //@ts-ignore
    dispatch(getAbleOrderList);
    setRefreshing(false);
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // && grabableListStore.length 不要限制length，否则加载圈无法消失
    if (grabableListStore) {
      setLoading(false)
    }
  }, [grabableListStore])
  return (
    <ScrollView
      overScrollMode="never"
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {/* <Text>
        {JSON.stringify(grabableListStore)}
        {JSON.stringify(carListStore)}
      </Text> */}
      {loading ?
        <Loading></Loading> :
        <View style={styles.containter}>
          {grabableListStore && grabableListStore?.length > 0 ? grabableListStore.map((item, index) => (
            <OrderBlock key={index} orderInfo={item} receiveOrder={receiveOrder}></OrderBlock>
          )) : <EmptyChat text={"暂无可接订单~"} height={Dimensions.get("window").height * 0.8}></EmptyChat>}
        </View >
      }
      {carList && carList?.length ? <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>选择用车</Modal.Header>
          <Modal.Body>
            <Select selectedValue={carId} minWidth="200" accessibilityLabel="已注册车辆" placeholder="已注册车辆列表" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => {
              setCarId(itemValue)
            }}>
              {
                carList.map((item, index) =>
                  <Select.Item label={`${carNameTable[item.carType] + " " + item.brand + " " + item.code}`} value={item.id} key={index} />
                )
              }
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={confirmReceive}>
                确定
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal> : null}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containter: {
    width: Dimensions.get("window").width * 0.9,
    paddingBottom: 70
  }
})