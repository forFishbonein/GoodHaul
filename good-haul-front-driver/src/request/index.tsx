/**
 * @description [ axios 请求封装]
 */
// 根据环境不同引入不同api地址
import axios from "axios";
import config from "./config";
import TokenUtil from "../utils/token"
import React, { useState } from 'react';
import { useToast } from "native-base";
import AlertWarning from "../components/AlertWarning"
import { selectToken, setToken, setUserInfo } from "../store/user/userSlice"
import { setOrderList } from "../store/order/orderSlice"
import { setChatList } from "../store/chat/chatSlice"
import { useSelector, useDispatch } from 'react-redux';
// const toast = useToast(); //注意：不允许，因为不能在非函数组件中使用hooks，在普通js函数中使用也不行！所以我们自己封装自定义hook！

// let navigationRef: any = null;
const useAxios = () => {
  let [navigationRef, setNavigationRef]: any = useState(null);
  let toast = useToast();
  const dispatch = useDispatch();
  // const setAxiosNavigationRef = (ref) => {
  //   navigationRef = ref;
  // };
  const token = useSelector(selectToken); //TODO 从axios里面能够使用redux查数据的角度来说，也必须要用自定义hook
  const service = axios.create({
    baseURL: config.baseApi, // 所有的请求地址前缀部分
    timeout: 10000, // 请求超时时间毫秒
    // withCredentials: true, // 异步请求携带cookie
    headers: {
      // 设置后端需要的传参类型
      "Content-Type": "application/json",
      // token: "your token",
      // 'Authorization': `Bearer ${token}`, // 将 JWT 令牌放置在 Authorization 头部中
      // "X-Requested-With": "XMLHttpRequest",
    },
  });
  // 添加请求拦截器
  service.interceptors.request.use(
    async function (config) {
      // 在发送请求之前做些什么
      // 从 AsyncStorage 中获取 token
      // const tokenUtil = new TokenUtil();
      // const token = await tokenUtil.getToken();
      console.log(`${config.url}请求携带的token：${token}`) //TODO 注意：请求登录登录接口的时候是不会有token的！
      // 将 token 添加到请求头中
      // @ts-ignore
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  service.interceptors.response.use(
    (response) => {
      const res = response?.data; //返回的数据就是这个res，即后端整个返回的对象
      if (res.code !== 0) {
        console.log(response);
        console.log("code不为0,默认报错!!!!要加一下code");
        // 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
        return Promise.reject(new Error(res.message || "Error")); //这里的message我们在后面可以指定！
      } else {
        // 注意返回值
        return response?.data;
      }
    },
    async (error: any) => {
      function isEnglish(str) {
        // return /^[a-zA-Z\s]+$/.test(str); //匹配英文和空格，不全面
        return /^[^\u4e00-\u9fa5]+$/.test(str) //只要有中文就算是中文，isEnglish就是false！
        //例如：/^[^\u4e00-\u9fa5]+$/.test("你好呀   hello ！") === false
      }
      // console.log(error)
      const res = error?.response; //返回的数据就是这个res，res.data则是后端整个抛出的异常对象
      console.log("error.response信息：")
      console.log(JSON.stringify(error?.response))
      //TODO 注意：异常对象的提取方法是error?.response，而不是response.data！！！
      if (isEnglish(res?.data?.message) || !res?.data?.message) { //如果res.data里面本来就有中文的message，那么就没必要设置了！
        //TODO 注意：其实更好的状态是后端自定义一些特殊的状态码，比如20001，这样前端就可以针对性地直接给这些状态码的message赋中文值！而不需要在后端指定message了！
        switch (res?.data?.statusCode) {
          case 400:
            error.message = "请求错误(400)";
            break;
          case 401:
            error.message = "未授权,请登录(401)";
            break;
          case 403:
            error.message = "拒绝访问(403)";
            break;
          case 404:
            error.message = `请求地址出错: ${error.response.config.url}`;
            break;
          case 405:
            error.message = "请求方法未允许(405)";
            break;
          case 408:
            error.message = "请求超时(408)";
            break;
          case 500:
            error.message = "服务器内部错误(500)";
            break;
          case 501:
            error.message = "服务未实现(501)";
            break;
          case 502:
            error.message = "网络错误(502)";
            break;
          case 503:
            error.message = "服务不可用(503)";
            break;
          case 504:
            error.message = "网络超时(504)";
            break;
          case 505:
            error.message = "HTTP版本不受支持(505)";
            break;
          default:
            error.message = `连接错误: ${error.message}`;
        }
        let toastOption = {
          status: "error",
          // title: error.message + config.baseApi + JSON.stringify(error)
          title: error.message
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
      } else if (res?.data?.message == "登录已过期，请重新登陆！" && res?.data?.statusCode == 401) {
        error.message = res?.data?.message;
        // const tokenUtil = new TokenUtil();
        // await tokenUtil.removeToken();
        dispatch(setToken(''));
        dispatch(setUserInfo({}));
        dispatch(setOrderList([]));
        dispatch(setChatList([]));
        navigationRef?.navigate('Login');
        let toastOption = {
          status: "warning",
          title: "登录已过期，请重新登陆！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
      } else if (res.data.message == "未登录，请先登陆！" && res.data.statusCode == 403) {
        error.message = res.data.message;
        // await TokenUtil.removeToken();
        // dispatch(setToken(""));
        dispatch(setToken(''));
        dispatch(setUserInfo({}));
        dispatch(setOrderList([]));
        dispatch(setChatList([]));
        let toastOption = {
          status: "warning",
          title: "未登录，请先登陆！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
        console.log(navigationRef)
        //@ts-ignore
        navigationRef?.navigate('Login'); //不管用
      } else if (res?.data?.message) {
        error.message = res?.data?.message //组件内部自己处理！
        return Promise.reject(error);
      }
      console.log("构造完message之后的error的meaage信息：", error.message)
    }
  );
  return { httpRequest: service, setNavigationRef };
}
export default useAxios;
