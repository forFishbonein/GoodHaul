/*
 * @FilePath: token.js
 * @Author: Aron
 * @Date: 2024-03-24 18:35:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-24 22:02:19
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class TokenUtil {
  static getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('jwtToken');
      return storedToken;
    } catch (error) {
      console.error('Error retrieving JWT token from AsyncStorage:', error);
    }
  };

  static saveToken = async token => {
    try {
      await AsyncStorage.setItem('jwtToken', token);
    } catch (error) {
      console.error('Error saving JWT token to AsyncStorage:', error);
    }
  };

  static removeToken = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
    } catch (error) {
      console.error('Error removing JWT token from AsyncStorage:', error);
    }
  };

  static isTokenExpired = token => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        // 令牌已过期
        return true;
      } else {
        // 令牌未过期
        return false;
      }
    } catch (error) {
      // 解析令牌失败
      console.error('Error decoding JWT token:', error);
      return true; // 假设解析失败则认为令牌已过期
    }
  };
}
