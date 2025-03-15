import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Modal, FormControl, Input, Button, VStack, HStack, Text, Select, CheckIcon, WarningOutlineIcon, useToast } from "native-base"
import DatePicker from 'react-native-date-picker'
import getDistance from "../../../../utils/getDistance"
import ToastAlert from "../../../../components/ToastAlert"
import { floorPriceTable, carPriceTable } from "../../../../constant/price"
import { useNavigationState } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectServiceType, selectMoveType } from '../../../../store/route/routeSlice';
import { selectCompleteFlag } from '../../../../store/address/addressSlice';
import { setCompleteFlag } from '../../../../store/address/addressSlice';
import { EventEmitter } from 'events';
import { selectToken } from "../../../../store/user/userSlice"
import PriceEmitter from '../../emitter/PriceEmitter';
// 创建一个事件发射器
const emitter = new EventEmitter();
export default function AddressForm({ onFillAddress, selectResult, navigation }) {
  //接收车型更改的消息
  // useEffect(() => {
  //   // console.log("发布订阅")
  //   // 订阅事件
  //   PriceEmitter.addListener('reCountPrice', (eventData) => {
  //     countPrice(eventData); //重新计算价格
  //   });
  // }, []); // 空数组表示仅在组件挂载时执行一次

  // const currentRoute = useNavigationState(state => state.routes[state.index]);
  /**
   * selectResult格式：
   * {"cityname": "武汉市",
   * "latlng": {"lat": 30.477547, "lng": 114.392981},
   * "module": "locationPicker",
   * "poiaddress": "湖北省武汉市洪山区东湖新技术开发区南湖大道182号中南财经政法大学南湖校区",
   * "poiname": "中南财经政法大学南湖(校区)滨湖园"
   * }
   *
   */
  const token = useSelector(selectToken);
  const completeFlag = useSelector(selectCompleteFlag);
  //填写地址
  let [text, setText] = useState({
    out: {},
    in: {}
  });
  let [type, setType] = useState("")
  let [addressInfo, setAddressInfo] = useState({
    out: {},
    in: {}
  });
  const handleAddressInputPress = (type) => {
    //注意：在这里不能使用setXXX，会造成内存泄漏
    return () => {
      // 在这里执行您的逻辑
      // 比如，检查用户是否登录，如果未登录，则跳转到登录页
      if (!token) {
        navigation.navigate('Login', {
          screen: "CodeLogin"
        });
      } else {
        // 用户已登录，执行其他操作
        setType(type);
        // console.log("type:" + type);
        onFillAddress();
      }
    }
  }
  useEffect(() => {
    // setText((prevText) => {
    // if (type == "out") {
    //   text.out = selectResult; //不能直接进行修改！
    // } else if (type == "in") {
    //   text.in = selectResult;
    // }
    // });
    setText((prevText) => {
      if (type === "out") {
        delete selectResult.module;
        return { ...prevText, out: selectResult.poiname };
      } else if (type === "in") {
        delete selectResult.module;
        return { ...prevText, in: selectResult.poiname };
      }
      return prevText; // 必须返回状态值
    });
    setAddressInfo((prevAddressInfo) => {
      if (type === "out") {
        delete selectResult.module;
        return { ...prevAddressInfo, out: selectResult };
      } else if (type === "in") {
        delete selectResult.module;
        return { ...prevAddressInfo, in: selectResult };
      }
      return prevAddressInfo; // 必须返回状态值
    });
  }, [selectResult])
  /** 特别注意：useState的setXXX不支持第二个参数，所以只能用useEffect的方式才能适配这种情况：
   * 需要在A更新后执行副作用，且副作用函数中需要拿到最新的A字段值 */
  useEffect(() => {
    if (completeFlag) {
      countPrice(); //重新计算价格
    }
  }, [addressInfo.out, addressInfo.in]);
  //填写详细信息
  const [showModal, setShowModal] = useState(false);
  const handleInfoInputPress = (type) => {
    return () => {
      if (!token) {
        navigation.navigate('Login', {
          screen: "CodeLogin"
        });
      } else {
        // 用户已登录，执行其他操作
        setPhone(detailInfo[type].phone)
        setDoor(detailInfo[type].door)
        setFloor(detailInfo[type].floor)
        setType(type);
        setShowModal(true)
      }
    }
  }
  const floorOptions = ["全程电梯 免费", "楼梯1层 免费", "楼梯2层 加10元", "楼梯3层 加20元", "楼梯4层 加40元", "楼梯5层 加60元", "楼梯6层 加80元", "楼梯7层 加110元", "楼梯8层 加140元"]
  let [phoneFlag, setPhoneFlag] = useState(false);
  let [phone, setPhone] = useState(null);
  let [door, setDoor] = useState(null);
  let [doorFlag, setDoorFlag] = useState(false);
  let [floor, setFloor] = useState(null);
  //详细数据
  let [detailInfo, setDetailInfo] = useState({
    out: {
      phone: "",
      door: "",
      floor: ""
    },
    in: {
      phone: "",
      door: "",
      floor: ""
    }
  });
  const confirmInfo = () => {
    // 使用正则表达式匹配11位数字的手机号码
    const phoneRegex = /^[1][3-9]\d{9}$/;
    let flag1 = true;
    if (flag1) {
      flag1 = phoneRegex.test(phone);
    }
    setPhoneFlag(!flag1);
    let flag2 = true;
    if (door) { //只有有值才需要检查
      flag2 = !isNaN(door); //会先进行类型转换为数字
    }
    setDoorFlag(!flag2);
    if (flag1 && flag2) {
      setDetailInfo((data) => {
        return {
          ...data,
          [type]: {
            phone: phone,
            door: door,
            floor: floor
          }
        }
      })
      setShowModal(false);
    }
  }
  useEffect(
    () => {
      if (completeFlag) {
        countPrice(); //重新计算价格
      }
    }, [detailInfo.out?.floor, detailInfo.in?.floor]);
  //选择搬家时间
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }
  function isCorrectObject(obj) {
    if (obj.phone !== null && obj.phone !== undefined && obj.floor !== null && obj.phone !== undefined) {
      return true;
    } else {
      return false;
    }
  }
  const toast = useToast();
  const toastOption = {
    title: "警告",
    variant: "left-accent",
    description: "请先将上面信息填写完整！",
    isClosable: true,
    toast: toast
  }
  const authAndOpenPicker = () => {
    //TODO 这里先把校验关掉了，否则太磨叽！
    if (!isEmptyObject(addressInfo["out"]) && !isEmptyObject(addressInfo["in"]) && isCorrectObject(detailInfo["out"]) && isCorrectObject(detailInfo["in"])) {
      setOpen(true)
    } else {
      //请先将上面信息填写完整！
      toast.show({
        render: ({
          id
        }) => {
          return <ToastAlert id={id} {...toastOption} />;
        }
      })
    }
    // setOpen(true)
  }

  const [selectDate, setSelectDate] = useState()
  const getAfterOneHourDate = () => {
    const currentDate = new Date();
    const currentMinutes = currentDate.getMinutes();
    const roundedMinutes = Math.round(currentMinutes / 30) * 30; // 四舍五入到整半点
    currentDate.setMinutes(roundedMinutes); // 将分钟设置为四舍五入后的值
    // 如果需要将时间四舍五入到整点，可以加上以下代码
    if (currentDate.getMinutes() === 60) {
      currentDate.setMinutes(0);
      currentDate.setHours(currentDate.getHours() + 1);
    }
    return new Date(currentDate.setHours(currentDate.getHours() + 1));
  }
  let minDate = getAfterOneHourDate();
  const [date, setDate] = useState(minDate)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const selectTime = () => {
    return (date) => {
      setOpen(false)
      setDate(date)
      setSelectDate(date)
      countPrice(); //计算价格
      dispatch(setCompleteFlag(true))
    }
  }
  //计算两地距离
  const getOutInDistance = () => {
    /**
        LOG  {"cityname": "武汉市", "latlng": {"lat": 30.478757, "lng": 114.392081},
       "poiaddress": "湖北省武汉市洪山区南湖大道192号", "poiname": "全季酒店(武汉光谷软件园民族大道店)"}
        LOG  {"cityname": "武汉市", "latlng": {"lat": 30.481933, "lng": 114.396223},
       "poiaddress": "湖北省武汉市洪山区民族大道275号中南民族大学对面", "poiname": "曙光商贸城"}
     */
    let distance = getDistance(addressInfo.out?.latlng?.lat, addressInfo.out?.latlng?.lng, addressInfo.in?.latlng?.lat, addressInfo.in?.latlng?.lng,);
    console.log("两地距离：" + distance);
    return distance;
  }
  let [price, setPrice] = useState(0)
  //得到当前已选中的路由，用于创建订单
  const selectedService = useSelector(selectServiceType);
  const selectedMove = useSelector(selectMoveType);
  let [distance, setDistance] = useState(0)
  //计算价格算法
  const countPrice = () => {
    console.log("当前路由：" + selectedMove) //这里不是最新的！不会自己更新，不知道为啥？
    let d = getOutInDistance();
    setDistance(d);
    //价格计算公式：搬家费用 = 1*车型单价*百米数量 + 楼层费
    //我们每一百米算1块钱！
    let travelNumber = d * 10;
    let floorPrice = floorPriceTable[Number(detailInfo.out.floor)] + floorPriceTable[Number(detailInfo.in.floor)]

    let price = carPriceTable[selectedMove] * travelNumber + floorPrice;
    setPrice(Number(price.toFixed(2)));
    console.log("当前价格：" + price)
  }
  const toast2 = useToast();
  const toastOption2 = {
    title: "警告",
    variant: "left-accent",
    description: "请先将上面信息填写完整！",
    isClosable: true,
    toast: toast2
  }
  //进行下一步，创建订单
  const goNextStep = () => {
    if (selectDate) {
      //构造订单参数，进行存储
      let basicInfo = {
        address: {
          out: { ...addressInfo.out, ...detailInfo.out },
          in: { ...addressInfo.in, ...detailInfo.in }
        },
        carType: selectedMove,
        time: selectDate,
        price: price,
        distance: distance.toFixed(3)
        // userId:
      }
      navigation.navigate('ConfirmOrder', JSON.stringify(basicInfo));
      //TODO 后面需要清理前面写的内容，现在为了方便先不要！
    } else {
      //请先将上面信息填写完整！
      toast2.show({
        render: ({
          id
        }) => {
          return <ToastAlert id={id} {...toastOption2} />;
        }
      })
    }
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.item}>
          <TouchableOpacity onPress={handleAddressInputPress("out")} style={styles.row}>
            <FontAwesome name="location-arrow" color={'#2A75FE'} size={18} />
            <TextInput
              value={text?.out}
              style={styles.address}
              placeholder='请输入搬出地址'
              editable={false} // 禁用输入
              onChangeText={text => {

              }}
            />
          </TouchableOpacity>
          <Text style={styles.text}>|</Text>
          <TouchableOpacity onPress={handleInfoInputPress("out")} style={styles.row}>
            <TextInput
              value={text}
              style={styles.info}
              placeholder='详细信息'
              editable={false} // 禁用输入
              onChangeText={text => {
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <TouchableOpacity onPress={handleAddressInputPress("in")} style={styles.row}>
            <FontAwesome name="plus-circle" color={'#FD9900'} size={18} />
            <TextInput
              value={text?.in}
              style={styles.address}
              placeholder='请输入搬入地址'
              editable={false} // 禁用输入
              onChangeText={text => {

              }}
            />
          </TouchableOpacity>
          <Text style={styles.text}>|</Text>
          <TouchableOpacity onPress={handleInfoInputPress("in")} style={styles.row}>
            <TextInput
              value={text}
              style={styles.info}
              placeholder='详细信息'
              editable={false} // 禁用输入
              onChangeText={text => {
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.item, { borderBottomWidth: 0 }]}>
          <TouchableOpacity onPress={authAndOpenPicker} style={styles.row}>
            <AntDesign name="clockcircle" color={'#404040'} size={15} />
            <TextInput
              value={selectDate ? `${selectDate?.getMonth() + 1}月${selectDate?.getDate()}日 ${selectDate?.getHours()}:${selectDate?.getMinutes() == 0 ? '00' : selectDate?.getMinutes()}` : null}
              style={styles.address}
              placeholder='请选择上门时间'
              editable={false} // 禁用输入
              onChangeText={text => {

              }}
            />
            <Text style={styles.text}>|</Text>
            <TextInput
              style={styles.info}
              placeholder='搬家时间'
              editable={false} // 禁用输入
              onChangeText={text => {
              }}
            />
            <DatePicker
              modal
              open={open}
              date={date}
              minimumDate={minDate}
              onConfirm={selectTime()}
              onCancel={() => {
                setOpen(false)
              }}
              androidVariant="nativeAndroid"
              mode="time"
              title="选择时间"
              confirmText="确认"
              cancelText="取消"
              textColor="#0891b2"
              minuteInterval={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price && !isNaN(price) ? price : 0.1}<Text style={styles.priceText}>元</Text></Text>
      </View>

      <Button onPress={goNextStep}>下一步</Button>
      <Modal isOpen={showModal} onClose={() => {
        setShowModal(false);
        setPhoneFlag(false);
        setDoorFlag(false);
      }}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>详细地址</Modal.Header>
          <Modal.Body>
            <VStack space={10}>
              <HStack alignItems={'flex-start'} justifyContent="space-between" flexDirection={'column'}>
                <Text>搬出地址</Text>
                <Text color="blueGray.400">{addressInfo[type]?.poiaddress}</Text>
              </HStack>
            </VStack>
            <FormControl isRequired>
              <FormControl.Label>搬出楼层</FormControl.Label>
              <Select selectedValue={floor} minWidth="200" accessibilityLabel="楼层" placeholder="请选择楼层" _selectedItem={{
                bg: "primary.600",
              }} mt="1" onValueChange={(text) => { setFloor(text) }}>
                {floorOptions.map((item, index) => (
                  <Select.Item label={item} value={index} key={index} />
                ))}
              </Select>
            </FormControl>
            <FormControl isInvalid={doorFlag}>
              <FormControl.Label>门牌号</FormControl.Label>
              <Input value={door} placeholder="请输入门牌号（选填）" onChangeText={(text) => { setDoor(text) }} />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                请输入数字
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={phoneFlag}>
              <FormControl.Label>联系电话</FormControl.Label>
              <Input value={phone} placeholder="请输入手机号" onChangeText={(text) => { setPhone(text) }} />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                请输入11位手机号码
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
                setPhoneFlag(false);
                setDoorFlag(false);
              }}>
                取消
              </Button>
              <Button onPress={confirmInfo}>
                确认
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 15,
    height: 165,
  },
  item: {
    flexDirection: "row",
    height: 55,
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    alignItems: "center"
  },
  address: {
    width: Dimensions.get("window").width * 0.45,
    paddingLeft: 5
  },
  info: {
    width: Dimensions.get("window").width * 0.2,
    paddingLeft: 10
  },
  text: {
    color: "#E7E7E7",
    fontSize: 25
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 30
  }
})