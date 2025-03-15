import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import RLV from '../../components/RLV'
import { useSelector, useDispatch } from 'react-redux';
import { selectOrderList } from '../../../../store/order/orderSlice.js';
import Loading from '../../../../components/Loading';
export default function All({ navigation }) {
  //使用dispatch更新之后，orderListStore会自动更新，然后把最新的值给到jsx结构中！
  const orderListStore = useSelector(selectOrderList);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // && orderListStore.length
    if (orderListStore) {
      setLoading(false)
    }
  }, [orderListStore])
  return (
    <>
      {loading ? <Loading></Loading> : <RLV orderList={orderListStore} navigation={navigation}></RLV>}
    </>
  )
}

const styles = StyleSheet.create({})