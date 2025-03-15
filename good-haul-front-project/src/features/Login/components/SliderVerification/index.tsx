import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';

export default function SliderVerification({ getCode }) {
  const [sliderValue, setSliderValue] = useState(0); // 用于保存滑块的值
  // 监听 sliderValue 的变化
  useEffect(() => {
    if (sliderValue >= 80) {
      getCode();
      setSliderValue(0)
    }
  }, [sliderValue]); // 仅在 sliderValue 发生变化时执行

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20, fontSize: 16, color: "#0891b2" }}>向右拖动滑条以验证</Text>
      <Slider
        style={{ width: "90%", height: 70 }}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({})