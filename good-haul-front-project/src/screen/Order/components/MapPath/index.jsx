import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
export default function MapPath({ width, height, addressInfo, webViewRef, panHandlers }) {

  // let webView = null;
  let [url, setUrl] = useState();
  useEffect(() => { //注意：使用了换行符换行字符串之后，下一行的字符串前面不能有空格，否则会被加入字符串！！！
    // console.log(addressInfo);
    if (addressInfo) {
      // console.log(addressInfo);
      setUrl(`https://apis.map.qq.com/tools/routeplan/sword=${addressInfo.out?.poiname}\
&spointx=${addressInfo.out?.latlng.lng}&spointy=${addressInfo.out?.latlng.lat}\
&eword=${addressInfo.in?.poiname}&epointx=${addressInfo.in?.latlng.lng}&epointy=${addressInfo.in?.latlng.lat}\
&footdetail=0&topbar=0&transport=2&editstartbutton=0&positionbutton=0&zoombutton=0&trafficbutton=0?\
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
    console.log(url); // 在这里直接打印 url 的值，只有在这里才能获取到！
  }, [url]);
  return (
    // 特别注意：panHandlers必须放在WebView本身身上才有效果！
    url ? <WebView
      {...panHandlers}
      style={{ width: width, height: height }}
      // ref={view => (webViewRef = view)}
      ref={webViewRef}
      javaScriptEnabled={true}
      source={{
        uri: url,
      }}
    // onScroll={handleMapScroll}
    // onMessage={event => { //选择位置之后
    //   // console.log(event);
    //   // console.log(JSON.parse(event.nativeEvent.data));
    //   onSelectAddress(event.nativeEvent.data);
    // }}
    // onLoadEnd={() => {
    //   webView.injectJavaScript(
    //     "window.addEventListener('message', function(event) {window.ReactNativeWebView.postMessage(JSON.stringify(event.data));}, false);",
    //   );
    // }}
    /> : null
  );
}

const styles = StyleSheet.create({})