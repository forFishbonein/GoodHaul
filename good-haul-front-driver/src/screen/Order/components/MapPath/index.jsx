import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { Button, Actionsheet, useDisclose, useToast } from "native-base"
import LinkMapUtil from "../../../../utils/linkMap"
import AlertWarning from "../../../../components/AlertWarning"
export default function MapPath({ width, height, addressInfo, webViewRef, panHandlers }) {
  const linkMapUtil = new LinkMapUtil();
  const toast = useToast();
  // let webView = null;
  let [url, setUrl] = useState();
  useEffect(() => { //注意：使用了换行符换行字符串之后，下一行的字符串前面不能有空格，否则会被加入字符串！！！
    // console.log(addressInfo);
    if (addressInfo) {
      // console.log(addressInfo);
      setUrl(`https://apis.map.qq.com/tools/routeplan/sword=${addressInfo.out?.poiname}\
&spointx=${addressInfo.out?.latlng.lng}&spointy=${addressInfo.out?.latlng.lat}\
&eword=${addressInfo.in?.poiname}&epointx=${addressInfo.in?.latlng.lng}&epointy=${addressInfo.in?.latlng.lat}\
&footdetail=1&topbar=0&transport=2&editstartbutton=0&positionbutton=0&zoombutton=0&trafficbutton=1?\
referer=myapp&key=F3FBZ-CIZK7-3QLXJ-HBUWH-VU3J2-AGBNV&back=0`);
      // setTimeout(() => {
      //   console.log(url);
      // }, 1000)
      /**
       * TODO 这里涉及事件循环的知识：
       * 在 useEffect 中，setUrl 是一个异步操作，当 setUrl 被调用时，url 的值不会立即更新，
       * 而是在下一次渲染时才会更新。因此，当您在 setTimeout 中尝试打印 url 时，url 的值可能还没有被更新。
        您可以将 url 作为 useEffect 的依赖项，这样 useEffect 的回调函数将在 url 更新后再执行。
        另外，您也可以在 useEffect 的回调函数中直接打印 url 的值，而不需要使用 setTimeout。
       */
    }
  }, [addressInfo])

  useEffect(() => {
    // console.log(url); // 在这里直接打印 url 的值，只有在这里才能获取到！
  }, [url]);
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const handleLinkMap = (id) => {
    return async () => {
      try {
        let status = null;
        if (id === 1) {
          status = await linkMapUtil.isInstallBaiDuMap();
          if (status) {
            let data = {
              sname: addressInfo.out?.poiname,
              slon: addressInfo.out?.latlng.lng,
              slat: addressInfo.out?.latlng.lat,
              dname: addressInfo.in?.poiname,
              dlon: addressInfo.in?.latlng.lng,
              dlat: addressInfo.in?.latlng.lat,
              mode: linkMapUtil.Mode.DRIVING.baidu
            }
            let res = await linkMapUtil.openBaiDuMap(data);
            onClose();
          } else {
            let toastOption = {
              status: "warning",
              title: "未安装百度地图！"
            }
            toast.show({
              placement: "top", //在上方弹出
              render: ({
                id
              }) => {
                return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
              }
            });
            onClose();
          }
        } else if (id === 2) {
          status = await linkMapUtil.isInstallAmap();
          if (status) {
            let data = {
              sname: addressInfo.out?.poiname,
              slon: addressInfo.out?.latlng.lng,
              slat: addressInfo.out?.latlng.lat,
              dname: addressInfo.in?.poiname,
              dlon: addressInfo.in?.latlng.lng,
              dlat: addressInfo.in?.latlng.lat,
              mode: linkMapUtil.Mode.DRIVING.amap,
              sourceApplication: "com.goodhaulfrontdriver"
            }
            let res = await linkMapUtil.openAmap(data);
            onClose();
          } else {
            let toastOption = {
              status: "warning",
              title: "未安装高德地图！"
            }
            toast.show({
              placement: "top", //在上方弹出
              render: ({
                id
              }) => {
                return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
              }
            });
            onClose();
          }
        } else if (id === 3) {
          status = await linkMapUtil.isInstallQQMap();
          if (status) {
            let data = {
              sname: addressInfo.out?.poiname,
              slon: addressInfo.out?.latlng.lng,
              slat: addressInfo.out?.latlng.lat,
              dname: addressInfo.in?.poiname,
              dlon: addressInfo.in?.latlng.lng,
              dlat: addressInfo.in?.latlng.lat,
              mode: linkMapUtil.Mode.DRIVING.qMap,
            }
            let res = await linkMapUtil.openQQMap(data);
            onClose();
          } else {
            let toastOption = {
              status: "warning",
              title: "未安装腾讯地图！"
            }
            toast.show({
              placement: "top", //在上方弹出
              render: ({
                id
              }) => {
                return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
              }
            });
            onClose();
          }
        }
      } catch (e) {
        let toastOption = {
          status: "error",
          title: "未知错误！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
        onClose();
      }
    }
  }
  return (
    // 特别注意：panHandlers必须放在WebView本身身上才有效果！
    url ?
      <>
        <WebView
          {...panHandlers}
          style={{ width: width, height: height }}
          // ref={view => (webViewRef = view)}
          ref={webViewRef}
          javaScriptEnabled={true}
          source={{
            uri: url,
          }}
        />
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Button variant="subtle" width={Dimensions.get("window").width * 0.95} onPress={onOpen}>使用地图导航</Button>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Actionsheet.Item style={{ alignItems: "center" }}>
                <Button size="lg" onPress={handleLinkMap(1)} variant="link">百度地图</Button>
              </Actionsheet.Item>
              <Actionsheet.Item style={{ alignItems: "center" }}>
                <Button size="lg" onPress={handleLinkMap(2)} variant="link">高德地图</Button>
              </Actionsheet.Item>
              <Actionsheet.Item style={{ alignItems: "center" }}>
                <Button size="lg" onPress={handleLinkMap(3)} variant="link">腾讯地图</Button>
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </View>

      </>
      : null
  );
}

const styles = StyleSheet.create({})