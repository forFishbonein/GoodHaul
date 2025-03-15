import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import RLV from '../../components/RLV/index.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { selectDoingList } from '../../../../store/order/orderSlice.js';
export default function Doing({ navigation }) {
  //使用dispatch更新之后，orderListStore会自动更新，然后把最新的值给到jsx结构中！
  const orderListStore = useSelector(selectDoingList);
  return (
    <>
      <RLV orderList={orderListStore} navigation={navigation}></RLV>
    </>
  )
}

const styles = StyleSheet.create({})