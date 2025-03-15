import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { carNameTable } from "../../../../constant/name"
import { floorPriceTable, carPriceTable } from "../../../../constant/price"
import { useToast, Select, CheckIcon, ChevronRightIcon, Modal, TextArea, Button, Checkbox, VStack, HStack, Text } from "native-base";
import Feather from 'react-native-vector-icons/Feather'
import AlertWarning from '../../../../components/AlertWarning';
import useOrderApi from "../../../../apis/order"
import { throttleCd } from "../../../../utils/throttle"
import { useThrottle } from "../../../../utils/hooks/throttleHook"
import { useIsFocused } from '@react-navigation/native'; // 导入导航钩子
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from "../../../../store/user/userSlice"
export default function ConfirmOrder({ route, navigation }) {
  // const isFocused = useIsFocused(); // 获取当前页面是否处于焦点状态
  // useEffect(() => {
  //   if (isFocused) {
  //     // 当进入当前页面时执行的操作
  //     StatusBar.setBackgroundColor('#ffffff');
  //   }
  // }, [isFocused]); // 依赖 isFocused 状态的变化
  const token = useSelector(selectToken);
  /**
   *{"address":{"out":{"latlng":{"lat":30.473953,"lng":114.386325},
   "poiaddress":"湖北省武汉市洪山区南湖大道182号","poiname":"中南财经政法大学(南湖校区)",
   "cityname":"武汉市","phone":"15530612150","door":"","floor":6},
   "in":{"latlng":{"lat":30.478757,"lng":114.392081},
   "poiaddress":"湖北省武汉市洪山区南湖大道192号","poiname":"全季酒店(武汉光谷软件园民族大道店)",
   "cityname":"武汉市","phone":"15330612510","door":"","floor":3}},
   "carType":"Small","time":"2024-03-18T10:30:00.000Z","price":106.1}
   */
  const { createMoveOrder } = useOrderApi();
  let [basicInfo, setBasicInfo] = useState();
  useEffect(() => {
    let info = JSON.parse(route.params);
    info.time = new Date(info.time);
    setBasicInfo(info);
    // console.log(typeof info.address);

    //TODO 注意：React 不允许在组件的渲染期间进行组件状态的更新，因为这可能会导致不可预测的行为。
    // 我们必须要确保没有在渲染期间触发 setState 或者其他导致重新渲染的操作。所以一定要把navigation.setOptions写在useEffect里面！
    // 等渲染结束之后再做触发渲染的操作！
    navigation.setOptions({
      title: "确认订单",
      // headerStyle: {
      //   backgroundColor: '#0891b2', // 设置导航栏背景颜色
      // },
      // headerTintColor: '#fff', // 设置标题颜色
    })
  }, [])
  let [peopleNumber, setPeopleNumber] = useState();
  const [textRemarkValue, setTextRemarkValue] = useState();
  const [showModal, setShowModal] = useState(false);
  const [agree, setAgree] = useState(false);
  const handleCheckboxAgree = () => {
    if (agree) {
      setAgree(false);
    } else {
      setAgree(true);
    }
  }
  const toast = useToast();
  let toastOption = {
    status: "warning",
    title: ""
  }

  //创建订单
  const goCreateOrderOrigin = async () => {
    if (peopleNumber) {
      if (agree) {
        // try { //没必要try catch了，因为axios封装已经处理过了，错误信息就已经在前面输出过了！减少文件里面的代码量！
        let orderInfo = {
          ...basicInfo,
          peopleNumber: Number(peopleNumber),
          remark: textRemarkValue,
          distance: Number(basicInfo.distance),
          time: basicInfo.time.toString(),
          status: "wait-paydeposit",
          // userId: 123, //TODO 这里后期需要更新
        }
        // console.log(orderInfo);
        let res = await createMoveOrder(orderInfo); //调用方法
        let orderId = res.data.insertedId; //TODO 大坑：必须要.data才可以！！！
        navigation.navigate('Pay', {
          price: basicInfo.price,
          orderId: orderId,
          payType: "deposit"
        }); //不序列化为字符串也是可以的！但是有Date类型就一定要序列化
        // } catch (error) {
        //   // this.$message.error(error.message);
        //   console.log(error.message);
        // }
        // console.log(orderInfo);
        /**
         * {"address": {"in": {"cityname": "武汉市", "door": "666", "floor": 6, "latlng": [Object],
         * "phone": "13831635893", "poiaddress": "湖北省武汉市洪山区白云路", "poiname": "武汉站"},
         * "out": {"cityname": "武汉市", "door": "405", "floor": 4, "latlng": [Object],
         * "phone": "15530612150", "poiaddress": "湖北省武汉市洪山区民族大道182号", "poiname": "中南民族大学"}},
         * "carType": "Small", "distance": "13.728",
         * "peopleNumber": "1", "price": 229.82, "remark": undefined, "time": 2024-03-19T05:30:59.512Z}
         */
      } else {
        toastOption.title = "请先勾选同意协议！"
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
      }
    } else {
      toastOption.title = "请选择跟车人数！"
      toast.show({
        placement: "top",
        render: ({
          id
        }) => {
          return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
        }
      });
    }

  }
  const goCreateOrder = useThrottle(goCreateOrderOrigin, 5000); //delay设置大一些
  const [showModal2, setShowModal2] = useState(false);
  return (

    <>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={[styles.item, { height: 60 }]}>
            <Text style={styles.title}>车型</Text>
            <Text>{carNameTable[basicInfo?.carType]}</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={[styles.item, styles.addressItem]}>
            <Text style={{
              color: '#2A75FE',
              marginRight: 5, fontWeight: "900"
            }}>•</Text><Text style={{ fontWeight: "bold" }}>{basicInfo?.address?.out?.poiname}</Text>
          </View>
          <View style={[styles.item, styles.addressItem]}>
            <Text style={{
              color: '#FD9900',
              marginRight: 5, fontWeight: "900"
            }}>•</Text><Text style={{ fontWeight: "bold" }}>{basicInfo?.address?.in?.poiname}</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={styles.title}>用车时间</Text>
            <Text>{`${basicInfo?.time?.getHours()}:${basicInfo?.time?.getMinutes() == 0 ? '00' : basicInfo?.time?.getMinutes()}`}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>联系电话</Text>
            <Text>{basicInfo?.address?.out?.phone}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>跟车人数(必填)</Text>
            <Select variant="unstyled" selectedValue={peopleNumber} minWidth="150" accessibilityLabel="请选择跟车人数" placeholder="请选择跟车人数" _selectedItem={{
              bg: "primary.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => { setPeopleNumber(itemValue) }}>
              <Select.Item label="0 人" value="0" />
              <Select.Item label="1 人" value="1" />
              <Select.Item label="2 人" value="2" />
            </Select>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={styles.title}>备注信息</Text>
            <View style={{ flexDirection: "row" }}>
              <Text onPress={() => setShowModal(true)} style={{ marginRight: 5 }}>给司机捎句话</Text>
              <Feather name="message-circle" color={'#2A75FE'} size={18} />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>支付方式</Text>
            <Text>在线支付</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>优惠券</Text>
            <Text style={{ color: "#E4080A" }}>0张优惠券</Text>
          </View>
        </View>
        <View>
          <View style={{
            height: 35,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Checkbox value="agree" style={{ width: 17, height: 17 }} onPress={handleCheckboxAgree} >
              <Text>我已阅读并同意</Text><Text style={{ color: '#2A75FE' }}>《货物托运居间服务协议》</Text>
            </Checkbox>
          </View>
          <View style={{ width: Dimensions.get("window").width * 0.93, height: 30, flexDirection: "row", color: '#2A75FE', backgroundColor: "#cffafe", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 13 }}>若产生高速费、停车费和搬运费，请用户额外支付</Text>
            <Feather name="alert-triangle" color={'#FFDE59'} size={15} />
          </View>
          <View style={{ height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#E4080A", fontSize: 13 }}>¥</Text>
            <Text style={{ color: "#E4080A", fontSize: 20, marginLeft: 2, marginRight: 5 }}>{basicInfo?.price}</Text>
            <Text style={{ fontSize: 13 }} onPress={() => setShowModal2(true)}>费用明细</Text>
          </View>
        </View>
        <Button style={{ width: Dimensions.get("window").width * 0.8 }} onPress={goCreateOrder}>确认下单</Button>
      </View >
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>备注信息</Modal.Header>
          <Modal.Body>
            <TextArea value={textRemarkValue}
              onChangeText={text => setTextRemarkValue(text)} // for android and ios
              w="100%" maxW="340" />
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>收费明细</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">车型</Text>
                <Text color="blueGray.400">{carNameTable[basicInfo?.carType]}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">车型每公里单价</Text>
                <Text color="blueGray.400">{carPriceTable[basicInfo?.carType] * 10}元</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">直线距离</Text>
                <Text color="blueGray.400">{basicInfo?.distance}公里</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">搬出楼层费</Text>
                <Text color="blueGray.400">{floorPriceTable[basicInfo?.address?.out?.floor]}元</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">搬入楼层费</Text>
                <Text color="blueGray.400">{floorPriceTable[basicInfo?.address?.in?.floor]}元</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">总共收费</Text>
                <Text color="yellow.500">{basicInfo?.price}元</Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
              setShowModal2(false);
            }}>
              继续
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingTop: 10
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    width: Dimensions.get("window").width * 0.93
  },
  item: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
  },
  addressItem: {
    height: 40,
    borderBottomWidth: 0,
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold"
  }
})