import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import RLV from '../../components/RLV'
import { useSelector, useDispatch } from 'react-redux';
import { selectWaitReceiveList } from '../../../../store/order/orderSlice.js';
export default function WaitReceive({ navigation }) {
  //使用dispatch更新之后，orderListStore会自动更新，然后把最新的值给到jsx结构中！
  const orderListStore = useSelector(selectWaitReceiveList);
  return (
    <>
      <RLV orderList={orderListStore} navigation={navigation}></RLV>
    </>
  )
}

const styles = StyleSheet.create({})