import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
export default function MapSelectAddress({ width, height, onSelectAddress }) {

  let webView: any;
  return (
    <WebView
      style={{ width: width, height: height }}
      ref={view => (webView = view)}
      javaScriptEnabled={true}
      source={{
        uri: 'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=F3FBZ-CIZK7-3QLXJ-HBUWH-VU3J2-AGBNV&referer=myapp',
      }}
      onMessage={event => { //选择位置之后
        // console.log(event);
        // console.log(JSON.parse(event.nativeEvent.data));
        onSelectAddress(event.nativeEvent.data);
      }}
      onLoadEnd={() => {
        webView.injectJavaScript(
          "window.addEventListener('message', function(event) {window.ReactNativeWebView.postMessage(JSON.stringify(event.data));}, false);",
        );
      }}
    />
  );
}

const styles = StyleSheet.create({})