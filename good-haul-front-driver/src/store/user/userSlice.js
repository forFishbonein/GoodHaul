import {createSlice} from '@reduxjs/toolkit';
import useLoginApi from '../../apis/login';
import TokenUtil from '../../utils/token';
import {setOrderList} from '../order/orderSlice';
import {setChatList} from '../chat/chatSlice';
export const slice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    isLogin: false, //暂时没啥用
    token: '',
    //TODO 为了保证修改一下，就全部得到最新值，token必须存在redux里面，否则在axios里面直接取本地存储的是拿不到最新的值的！
    //TODO 而且本质上来说userInfo和token都是需要持久化的，使用redux结合自动持久化插件是最佳实践！
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    // removeUserInfo: (state, action) => {
    //   state.userInfo = action.payload;
    // },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {setUserInfo, setIsLogin, setToken} = slice.actions;

export const useLoginRedux = () => {
  const {driverLogin, driverLogout} = useLoginApi();
  //需要参数的
  const doLogin = (account, password) => async dispatch => {
    try {
      let res = await driverLogin({
        account,
        password,
      });
      let driverInfo = res.data.driverInfo;
      dispatch(setUserInfo(driverInfo));
      let token = res.data.access_token;
      // alert(token);
      // alert(JSON.stringify(driverInfo));
      // const tokenUtil = new TokenUtil();
      // await tokenUtil.saveToken(token); //等待设置完成！
      dispatch(setToken(token));
    } catch (e) {
      // TODO 如果你在 catch 块中捕获了异常，但不希望处理该异常并且希望将其传播到调用者，你可以简单地使用 throw 语句重新抛出异常。
      // 在这里捕获异常，并重新抛出
      throw e; //这句话就相当于正常的promise.catch((e)=>{})让其状态向下进行传递
      //注意：return e是不行的，会被当做正常返回值，throw就相当于是异常的return！
    }

    // return e; //TODO 他么的，这里千万不要return e，会被async包裹，外面会走到catch！
  };

  const doLogout = async dispatch => {
    let res = await driverLogout();
    if (res.data) {
      // const tokenUtil = new TokenUtil();
      // await tokenUtil.removeToken();
      dispatch(setToken(''));
      dispatch(setUserInfo({}));
      dispatch(setOrderList([]));
      dispatch(setChatList([]));
    }
  };
  return {doLogin, doLogout};
};

//查询的
export const selectUserInfo = state => state.user.userInfo;
export const selectIsLogin = state => state.user.isLogin;
export const selectToken = state => state.user.token;

export default slice.reducer;
