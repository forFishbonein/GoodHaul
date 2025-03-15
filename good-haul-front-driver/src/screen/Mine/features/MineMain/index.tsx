import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar, useToast, Button, Modal } from "native-base"
import React, { useEffect, useState } from 'react'
import { selectUserInfo, selectToken } from "../../../../store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useLoginRedux } from "../../../../store/user/userSlice"
import AlertWarning from "../../../../components/AlertWarning"
import formData from "../../../../utils/formDate"
import { Table, Row, Rows } from 'react-native-table-component';
export default function MineMain({ navigation }) {
  const driverInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const { doLogout } = useLoginRedux();
  let toast = useToast();
  const dispatch = useDispatch();
  const [cars, setCars]: any = useState();
  console.log(JSON.stringify(driverInfo))
  useEffect(() => {
    let carList = driverInfo.cars.map(e => {
      return [e.id, e.code, e.carType, e.brand, e.color, formData(e.enrollTime)]
    })
    console.log(carList)
    setCars(carList);
  }, [driverInfo])
  const confirmLogout = async () => {
    //@ts-ignore
    await dispatch(doLogout);
    navigation.navigate("Login");
    let toastOption = {
      status: "success",
      title: "已退出登录！"
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
  const [showModal, setShowModal] = useState(false);
  const tableTitle = ["编号", "车牌号", "类型", "品牌", "颜色", "车辆编入时间"]
  return (
    <>

      <View style={styles.container}>
        <View>
          <View style={styles.personContainer}>
            {/* <Avatar bg="green.500" source={{
              uri: "https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/huoche.png"
            }} alignSelf="center" size="md" >
              AJ
            </Avatar> */}
            <Avatar bg="#fff" style={{ borderColor: "#f97316", borderWidth: 1 }} source={{
              uri: "https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/siji.png"
            }} alignSelf="center" size="md" >
              AJ
            </Avatar>
            {
              token ?
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "600", color: "#1E1414", marginLeft: 15 }}>
                    {driverInfo?.account}
                  </Text>
                </View> :
                <TouchableOpacity onPress={() => {
                  navigation.navigate("Login")
                }}>
                  <Text style={{ fontSize: 20, fontWeight: "600", color: "#1E1414", marginLeft: 15 }}>
                    立即登录
                  </Text>
                </TouchableOpacity>
            }
          </View>
          <View style={styles.usuallyContainer}>
            <View>
              <Text style={{ fontSize: 15, color: "#1E1414" }}>常用功能</Text>
            </View>
            <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.item} onPress={() => {
                navigation.navigate('Home');
              }}>
                <Entypo name="globe" color={'#f97316'} size={30} />
                <Text>接单大厅</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} onPress={() => {
                navigation.navigate('Order');
              }}>
                <Entypo name="news" color={'#f97316'} size={30} />
                <Text>服务订单</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} onPress={() => {
                navigation.navigate('Chat');
              }}>
                <AntDesign name="message1" color={'#f97316'} size={30} />
                <Text>消息</Text>
              </TouchableOpacity>
            </View>
          </View>

          {
            token &&
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Text style={{ color: "#1E1414" }}>账号</Text>
                <Text>{driverInfo?.account}</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={{ color: "#1E1414" }}>姓名</Text>
                <Text>{driverInfo?.name}</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={{ color: "#1E1414" }}>已服务单数</Text>
                <Text>{driverInfo?.finishOrderNumber}</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={{ color: "#1E1414" }}>已注册车辆</Text>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {
                  setShowModal(true);
                }}>
                  <Text style={{ marginRight: 5 }}>
                    点击查看
                  </Text>
                  <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
                </TouchableOpacity>
              </View>
              <View style={styles.listItem}>
                <Text style={{ color: "#1E1414" }}>上一单完成时间</Text>
                <Text>{formData(driverInfo?.lastFinishTime)}</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={{ color: "#1E1414" }}>上次登陆时间</Text>
                <Text>{formData(driverInfo?.lastLoginTime)}</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={{ color: "#1E1414" }}>账号创建时间</Text>
                <Text>{formData(driverInfo?.accountCreateTime)}</Text>
              </View>
            </View>
          }
        </View>
        {
          token &&
          <View style={{ width: Dimensions.get("window").width * 0.9, backgroundColor: "#ffff", height: 55, justifyContent: "center", borderRadius: 15, marginBottom: 10 }}>
            <Button size="md" variant="link" onPress={confirmLogout}>退出登录</Button>
          </View>
        }
      </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>已注册车辆</Modal.Header>
          <Modal.Body>
            {cars && <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={tableTitle}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows
                data={cars}
                textStyle={styles.text}
              />
            </Table>}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "space-between",
    flex: 1
  },
  personContainer: {
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 10
  },
  usuallyContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 10,
    padding: 12
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 80
  },
  item: {
    height: 52,
    width: 60,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10
  },
  listContainer: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#ffff",
    borderRadius: 15,
  },
  listItem: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: "#f5f5f5"
  },
  head: { height: 80, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
})