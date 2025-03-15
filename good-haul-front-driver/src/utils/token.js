/*
 * @FilePath: token.js
 * @Author: Aron
 * @Date: 2024-03-24 18:35:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-27 01:18:27
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwtDecode from 'jwt-decode';
export default class TokenUtil {
  getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('jwtToken');
      console.log('取出来的token：', storedToken);
      return storedToken;
    } catch (error) {
      console.error('Error retrieving JWT token from AsyncStorage:', error);
    }
  };

  saveToken = async token => {
    try {
      console.log('设置的token：', token);
      await AsyncStorage.setItem('jwtToken', token);
    } catch (error) {
      console.error('Error saving JWT token to AsyncStorage:', error);
    }
  };

  removeToken = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
    } catch (error) {
      console.error('Error removing JWT token from AsyncStorage:', error);
    }
  };

  // static isTokenExpired = token => {
  //   try {
  //     const decodedToken = jwtDecode(token); //加密了，是不可能在前端解析的，理论上也不能在前端解析！可以发一个请求到后端看有没有过期！
  //     if (decodedToken.exp * 1000 < Date.now()) {
  //       // 令牌已过期
  //       return true;
  //     } else {
  //       // 令牌未过期
  //       return false;
  //     }
  //   } catch (error) {
  //     // 解析令牌失败
  //     console.error('Error decoding JWT token:', error);
  //     return true; // 假设解析失败则认为令牌已过期
  //   }
  // };
}
