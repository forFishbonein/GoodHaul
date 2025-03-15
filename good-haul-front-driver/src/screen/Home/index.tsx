import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderList from "./features/OrderList"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Button, Modal, Select, CheckIcon, useToast, Switch } from "native-base"
import { useSelector, useDispatch } from 'react-redux';
import { useOrderRedux } from '../../store/order/orderSlice';
import { selectToken } from "../../store/user/userSlice"
export default function Home() {
  const { getAbleOrderList, changeOrderListByTimescope } = useOrderRedux();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (token) {
      console.log("有token：", token)
      //@ts-ignore
      dispatch(getAbleOrderList); //订单列表查询放在 redux 是比较好的
    }
  }, [dispatch])
  const [showModal, setShowModal] = useState(false);
  const [timeScope, setTimeScope]: any = useState(); //1、2小时内，2、6小时内，3、12小时内，4、24小时内
  let timeScopeList = [{
    value: "0",
    type: "全部"
  }, {
    value: "1",
    type: "2小时内"
  }, {
    value: "2",
    type: "6小时内"
  }, {
    value: "3",
    type: "12小时内"
  }, {
    value: "4",
    type: "24小时内"
  }]

  let [showListFlag, setShowListFlag] = useState(true)
  useEffect(() => {
    if (timeScope) {
      //@ts-ignore
      dispatch(changeOrderListByTimescope(timeScope));
    }
  }, [timeScope])
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={styles.titleBlock}>
            <Text style={{ color: "#f97316" }}>接单大厅</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              setShowModal(true)
            }} style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="gear" color={"#737373"} size={15} />
              <Text style={{ marginLeft: 5 }}>接单设置</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showListFlag ? <OrderList></OrderList> : null}
      </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>接单设置</Modal.Header>
          <Modal.Body>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Text>展示订单列表</Text>
              <Switch isChecked={showListFlag} onToggle={() => {
                setShowListFlag(!showListFlag)
              }} offTrackColor="orange.100" onTrackColor="orange.200" onThumbColor="orange.500" offThumbColor="orange.50" />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>订单时间</Text>
              <Select selectedValue={timeScope} minWidth="200" accessibilityLabel="选择时间范围" placeholder="选择时间范围" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setTimeScope(itemValue)}>
                {
                  timeScopeList.map((item, index) =>
                    <Select.Item label={item.type} value={item.value} key={index} />
                  )
                }
              </Select>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center"
  },
  banner: {
    width: Dimensions.get("window").width * 0.9,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titleBlock: {
    width: 100,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#f97316"
  }
})