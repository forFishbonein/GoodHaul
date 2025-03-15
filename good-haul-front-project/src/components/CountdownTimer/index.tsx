/*
 * @FilePath: CountdownTimer.tsx
 * @Author: Aron
 * @Date: 2024-03-18 22:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-18 22:07:45
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const CountdownTimer = ({ initialTime, text }) => {
  const [timeRemaining, setTimeRemaining] = useState(Number(initialTime));

  useEffect(() => {
    // 定义一个计时器，并在组件加载后启动
    const timer = setInterval(() => {
      // 每秒更新剩余时间
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    // 组件卸载时清除计时器
    return () => clearInterval(timer);
  }, []); // 注意：空数组作为 useEffect 的第二个参数，确保只在组件加载和卸载时执行一次

  // 将剩余时间格式化为分钟和秒钟
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // 将格式化后的时间渲染到组件上
  return (
    <Text style={{ fontSize: 12 }}>
      {text} 00:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </Text>
  );
};

export default CountdownTimer;
