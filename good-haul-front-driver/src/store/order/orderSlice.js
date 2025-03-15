import {createSlice} from '@reduxjs/toolkit';
import useOrderApi from '../../apis/order';
export const slice = createSlice({
  name: 'order',
  initialState: {
    orderList: [],
    doingList: [],
    finishedList: [],
    canceledList: [],
    grabableListOrigin: [],
    grabableListDisplay: [],
    carList: [],
  },
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    setDoingList: (state, action) => {
      state.doingList = action.payload;
    },
    setCanceledList: (state, action) => {
      state.canceledList = action.payload;
    },
    setFinishedList: (state, action) => {
      state.finishedList = action.payload;
    },
    setGrabableListOrigin: (state, action) => {
      state.grabableListOrigin = action.payload;
    },
    setGrabableListDisplay: (state, action) => {
      state.grabableListDisplay = action.payload;
    },
    setCarList: (state, action) => {
      state.carList = action.payload;
    },
  },
});

export const {
  setOrderList,
  setDoingList,
  setFinishedList,
  setCanceledList,
  setGrabableListOrigin,
  setGrabableListDisplay,
  setCarList,
} = slice.actions;

export const useOrderRedux = () => {
  const {getAllOrderByDriverId, getGrabableOrder} = useOrderApi();
  const searchAllOrderAsync = async dispatch => {
    let res = await getAllOrderByDriverId();
    let arrayList = res.data.reverse();
    //把最后进行更新的放在前面，根据updateTime进行排序！
    arrayList.sort((a, b) => {
      // 将字符串类型的时间转换为Date对象进行比较
      const timeA = new Date(a.updateTime);
      const timeB = new Date(b.updateTime);

      // 比较时间，根据需要修改排序逻辑
      if (timeA < timeB) {
        return 1; // 返回正数表示a在b之后
      }
      if (timeA > timeB) {
        return -1; // 返回负数表示a在b之前
      }
      return 0; // 时间相同，不需要交换顺序
    });
    console.log('redux查询回来的数据：');
    console.log(arrayList.slice(0, 5));
    dispatch(setOrderList(arrayList)); //倒序，时间靠后的在前面
    dispatch(
      setDoingList(
        arrayList.filter(
          obj => obj.status === 'on-way' || obj.status === 'load-transport',
        ),
      ),
    );
    dispatch(
      setFinishedList(
        arrayList.filter(
          obj => obj.status === 'wait-payremain' || obj.status === 'finished',
        ),
      ),
    );
    dispatch(
      setCanceledList(arrayList.filter(obj => obj.status === 'canceled')),
    );
  };
  //需要参数的
  const getAbleOrderList = async dispatch => {
    let res = await getGrabableOrder();
    let orderList = res.data.orderList;
    console.log('redux查询回来的数据Grabable：');
    console.log(orderList.slice(0, 5));
    let carList = res.data.carList;
    dispatch(setGrabableListOrigin(orderList));
    dispatch(setGrabableListDisplay(orderList));
    dispatch(setCarList(carList));
  };

  const changeOrderListByTimescope =
    timeScope => async (dispatch, getState) => {
      const grabableListOrigin = selectGrabableListOrigin(getState()); //在sclice里面获取state的方式
      if (timeScope && timeScope != '0') {
        let table = {
          1: 2,
          2: 6,
          3: 12,
          4: 24,
        };
        // 获取当前时间
        const currentTime = new Date();
        // 过滤数组，找出时间与当前时间绝对值相差6小时以内的对象
        const result = grabableListOrigin?.filter(obj => {
          const timeDifference = Math.abs(
            new Date(obj.time).getTime() - currentTime.getTime(),
          );
          return timeDifference <= table[timeScope] * 60 * 60 * 1000; // 将时间差转换为毫秒进行比较
        });
        dispatch(setGrabableListDisplay(result));
      } else if (timeScope && timeScope == '0') {
        dispatch(setGrabableListDisplay(grabableListOrigin));
      }
    };
  return {searchAllOrderAsync, getAbleOrderList, changeOrderListByTimescope};
};

//查询的
export const selectOrderList = state => state.order.orderList;
export const selectDoingList = state => state.order.doingList;
export const selectFinishedList = state => state.order.finishedList;
export const selectCanceledList = state => state.order.canceledList;
export const selectGrabableListOrigin = state => state.order.grabableListOrigin;
export const selectGrabableListDisplay = state =>
  state.order.grabableListDisplay; //TODO 写 slice 的时候要认真一些，不要把函数名写错了，因为set 和 select 很像
export const selectCarList = state => state.order.carList;

export default slice.reducer;
