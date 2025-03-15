import {createSlice} from '@reduxjs/toolkit';
import TokenUtil from '../../utils/token';
import useLoginApi from '../../apis/login';
import {useOrderRedux} from '../order/orderSlice';
import {setOrderList} from '../order/orderSlice';
import {setChatList} from '../chat/chatSlice';
export const slice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    token: '',
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // setName: (state, action) => { //单独修改某个属性，无法形成响应式！
    //   state.userInfo.name = action.payload;
    // },
    // setGender: (state, action) => {
    //   state.userInfo.gender = action.payload;
    // },
    // setSign: (state, action) => {
    //   state.userInfo.sign = action.payload;
    // },
  },
});

export const {setUserInfo, setToken} = slice.actions;

export const useLoginRedux = () => {
  const {passwordLogin, codeLogin, userLogout} = useLoginApi();
  const {searchAllOrderAsync} = useOrderRedux();
  //账号密码登录
  const doLoginByPassword = (phone, password) => async dispatch => {
    try {
      let res = await passwordLogin({
        phone,
        password,
      });
      let userInfo = res.data.userInfo;
      dispatch(setUserInfo(userInfo));
      let token = res.data.access_token;
      // await TokenUtil.saveToken(token); //等待设置完成！
      dispatch(setToken(token));
      // dispatch(searchAllOrderAsync);
    } catch (e) {
      // TODO 如果你在 catch 块中捕获了异常，但不希望处理该异常并且希望将其传播到调用者，你可以简单地使用 throw 语句重新抛出异常。
      // 在这里捕获异常，并重新抛出
      throw e; //这句话就相当于正常的promise.catch((e)=>{})让其状态向下进行传递
    }
  };

  //短信验证码登录
  const doLoginByCode = (phone, code) => async dispatch => {
    try {
      let res = await codeLogin({
        phone,
        code,
      });
      let userInfo = res.data.userInfo;
      dispatch(setUserInfo(userInfo));
      let token = res.data.access_token;
      // await TokenUtil.saveToken(token); //等待设置完成！
      dispatch(setToken(token));
      // dispatch(searchAllOrderAsync);
      return res.data.type;
    } catch (e) {
      throw e; //这句话就相当于正常的promise.catch((e)=>{})让其状态向下进行传递
    }
  };

  //退出登录
  const doLogout = async dispatch => {
    let res = await userLogout();
    if (res.data) {
      // await TokenUtil.removeToken();
      dispatch(setToken(''));
      dispatch(setUserInfo({}));
      dispatch(setOrderList([]));
      dispatch(setChatList([])); //退出登录必须要清空，否则容易造成登录别的账号之后的聊天列表不准确
    }
  };
  return {doLoginByPassword, doLoginByCode, doLogout};
};

//查询的
export const selectUserInfo = state => state.user.userInfo;
export const selectToken = state => state.user.token;

export default slice.reducer;
