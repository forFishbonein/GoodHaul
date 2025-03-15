/*
 * @FilePath: index.tsx
 * @Author: Aron
 * @Date: 2024-03-15 21:17:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-25 16:32:34
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { StyleSheet, Text, View, Dimensions, PermissionsAndroid, Platform, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { init, Geolocation, setLocatingWithReGeocode, setOnceLocation, setGpsFirst, setGpsFirstTimeout } from "react-native-amap-geolocation";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopLocation() {
  let [position, setPosition] = useState(
    {
      provinceName: "",
      cityName: "",
      areaName: "",
      poiName: ""
    }
  )
  const initMap = async () => {
    // setOnceLocation(true);
    // setGpsFirst(true);
    // setGpsFirstTimeout(3000);
    if (Platform.OS === "android") {
      // await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION); //近似定位权限（模糊定位不允许连续定位，无法获取位置，不要写这个）
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION); //精确定位权限
    }
    else {
      setLocatingWithReGeocode(true)
    }
    await init({
      ios: "",
      android: "48572c454a3098c937cfade1fc47c975"
    });
    getPosition();
  }
  function updateLocationState(location) {
    if (location) {
      location.updateTime = new Date().toLocaleString();
      let data = location.location
      console.log("data", data)
      setPosition({
        provinceName: data.province,
        cityName: data.city,
        areaName: data.district,
        poiName: data.poiName,
      });
      console.log(`当前位于${data.city}！`);
    }
  }
  const getPosition = () => {
    Geolocation.getCurrentPosition(
      position => updateLocationState(position),
      error => updateLocationState(error)
    );
  };
  useEffect(() => {
    initMap();
  }, [])
  return (
    <SafeAreaView>
      <View style={styles.city}>
        <View style={styles.container}>
          <Ionicons name="location-outline" color={'#737373'} size={20} />
          <Text style={styles.position}>{position?.cityName?.replace(/市/g, '') + "," + position?.areaName + "," + position?.poiName}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  position: {
    color: "#737373",
    fontSize: 14,
    fontWeight: 'bold'
  },
  city: {
    width: Dimensions.get("window").width,
    height: 35,
    // backgroundColor: "#ecfeff",
    backgroundColor: "#ffffff",
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 5
  }
})