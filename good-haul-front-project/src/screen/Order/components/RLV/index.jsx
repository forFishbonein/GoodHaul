import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { orderStatus } from "../../../../constant/status"
import formData from "../../../../utils/formDate"
import Empty from "../../../../components/Empty"
import { useOrderRedux } from '../../../../store/order/orderSlice';
import { useSelector, useDispatch } from 'react-redux';
import useDriverApi from "../../../../apis/driver"
const ViewTypes = {
  FULL: 0,
};

function CellContainer(props) {
  return (
    <View {...props}>
      {props.children}
    </View>
  );
}
export default function RLV({ orderList, navigation }) {
  const dispatch = useDispatch();
  let { width } = Dimensions.get('window');
  const { searchAllOrderAsync } = useOrderRedux();
  let dataProvider = new DataProvider((r1, r2) => {
    // console.log('r1', r1, r2);
    return r1 !== r2;
  });
  const _layoutProvider = new LayoutProvider(
    index => {
      return ViewTypes.FULL;
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.FULL:
          dim.width = width * 0.9;
          dim.height = 140;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );
  const { getDriverInfoById } = useDriverApi();
  const [stateData, setStateData] = useState();
  const [noDataFlag, setNoDataFlag] = useState(false);
  useEffect(() => {
    // console.log(orderList)
    if (orderList && orderList?.length >= 1) { //最开始的时候orderList是空数组，不能赋值给dataProvider！
      setNoDataFlag(false); //一开始被设置成true了，后面要设置回来
      // console.log(orderList)
      setStateData({
        dataProvider: dataProvider.cloneWithRows(orderList),
      })
    } else if (orderList?.length === 0) {
      setNoDataFlag(true);
    }
  }, [orderList]) //useEffect是可以深度监听的，数组长度变化可以被发现
  //TODO 注意：React 中的 useEffect 钩子函数接受第二个参数，它是一个数组，用于指定在何时执行 useEffect 中的回调函数。当数组中的依赖项发生变化时，useEffect 中的回调函数就会被调用。
  //所以说即便依赖项是数组，也必须放到数组里面才行，不然依赖数组就会表现出长度改变了的情况！不能只写一个orderList

  const goSeeDetail = (orderInfo) => {
    return async () => {
      if (orderInfo.driverId) {
        let res = await getDriverInfoById(orderInfo.driverId);
        let driverInfo = res?.data?.driverInfo;
        let copyOrderInfo = JSON.parse(JSON.stringify(orderInfo))
        copyOrderInfo["driverInfo"] = driverInfo; //TODO 注意：orderInfo是没有办法直接改变的！因为它是redux里面的数据，不能直接改！只能copy之后再改！
        console.log(copyOrderInfo)
        // console.log(typeof orderInfo)
        // console.log(typeof orderInfo.address.out.latlng)
        // console.log(orderInfo.address.out.latlng)
        // console.log(JSON.stringify(orderInfo))
        navigation.navigate('Detail', { orderInfo: JSON.stringify(copyOrderInfo) });
      } else {
        //TODO 路由如果要传递多层次对象，一定要JSON.stringify，否则接收方prase的时候可能会报错！！！
        //而且特别注意，如果传递多层次的对象，最好是深拷贝一下JSON.stringify(JSON.parse(JSON.stringify(，免得出现属性丢失的意外情况！！！
        navigation.navigate('Detail', { orderInfo: JSON.stringify(JSON.parse(JSON.stringify(orderInfo))) });
      }
    }
  }
  const _rowRenderer = (type, orderInfo) => {
    switch (type) {
      case ViewTypes.FULL:
        return (
          <CellContainer style={styles.container}>
            <TouchableOpacity onPress={goSeeDetail(orderInfo)}>
              <View style={styles.itemContainer}>
                <View style={styles.lineBlock}>
                  <Text style={{ color: "#737373" }}>订单类型：
                    {orderInfo?.serviceType == "move" ? "搬家" : orderInfo?.serviceType == "run" ? "跑腿" : ""}
                  </Text>
                  <Text style={{ color: "#0891b2" }}>{orderStatus[orderInfo?.status]}</Text>
                </View>
                <View style={styles.addressBlock}>
                  <View style={styles.addressItem}>
                    <Text style={{
                      color: '#2A75FE',
                      marginRight: 5, fontWeight: "900"
                    }}>•</Text><Text style={{ fontWeight: "bold" }}>
                      {orderInfo?.address?.out?.poiname}
                    </Text>
                  </View>
                  <View style={styles.addressItem}>
                    <Text style={{
                      color: '#FD9900',
                      marginRight: 5, fontWeight: "900"
                    }}>•</Text><Text style={{ fontWeight: "bold" }}>
                      {orderInfo?.address?.in?.poiname}
                    </Text>
                  </View>
                </View>
                <View style={styles.lineBlock}>
                  <View><Text>{orderInfo?.time ? formData(orderInfo?.time) : "-"}</Text></View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "#E4080A", fontSize: 13 }}>合计:¥</Text>
                    <Text style={{ color: "#E4080A", fontSize: 17, marginLeft: 2, marginRight: 5 }}>
                      {orderInfo?.extraPrice ? orderInfo?.price + orderInfo?.extraPrice : orderInfo?.price}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </CellContainer>
        );
      default:
        return null;
    }
  };
  //控制下拉刷新！
  const [refreshing, setRefreshing] = useState(false);
  // 下拉刷新触发的函数
  const onRefresh = async () => {
    setRefreshing(true);
    //@ts-ignore
    dispatch(searchAllOrderAsync).then(result => {//TODO 重新查询订单列表
      setRefreshing(false);
    })
      .catch(error => {
        console.error('Error occurred:', error);
      });
  };
  return (
    // TODO 大坑：这种组件渲染需要依赖数据变量的，变量在初始不存在的话，就一定要通过依赖项去if渲染！
    noDataFlag ? <Empty text={"暂无此类订单~"}></Empty> : stateData ?
      <RecyclerListView
        renderAheadOffset={0}
        layoutProvider={_layoutProvider}
        dataProvider={stateData?.dataProvider}
        rowRenderer={_rowRenderer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      /> : null
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  itemContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 120,
    backgroundColor: "#ffffff",
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  lineBlock: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addressBlock: {
    width: "100%",
    alignItems: "flex-start",
  },
  addressItem: {
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 0,
    marginTop: 2,
    marginBottom: 2
  },
});
