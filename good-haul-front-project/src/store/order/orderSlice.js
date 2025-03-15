import {createSlice} from '@reduxjs/toolkit';
import useOrderApi from '../../apis/order';
export const slice = createSlice({
  name: 'order',
  initialState: {
    orderList: [],
    waitPayDepositList: [],
    waitReceiveList: [],
    onWayList: [],
    loadTransportList: [],
    waitPayRemainList: [],
    finishedList: [],
    canceledList: [],
    waitPayList: [],
  },
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    setWaitPayDepositList: (state, action) => {
      state.waitPayDepositList = action.payload;
    },
    setWaitReceiveList: (state, action) => {
      state.waitReceiveList = action.payload;
    },
    setOnWayList: (state, action) => {
      state.onWayList = action.payload;
    },
    setLoadTransportList: (state, action) => {
      state.loadTransportList = action.payload;
    },
    setWaitPayRemainList: (state, action) => {
      state.waitPayRemainList = action.payload;
    },
    setFinishedList: (state, action) => {
      state.finishedList = action.payload;
    },
    setCanceledList: (state, action) => {
      state.canceledList = action.payload;
    },
    setWaitPayList: (state, action) => {
      state.waitPayList = action.payload;
    },
  },
});

export const {
  setOrderList,
  setWaitPayDepositList,
  setWaitReceiveList,
  setOnWayList,
  setLoadTransportList,
  setWaitPayRemainList,
  setFinishedList,
  setCanceledList,
  setWaitPayList,
} = slice.actions;

//需要参数的
// export const searchAllOrderAsync = () => async dispatch => {
//   let res = await getAllMoveOrder();
//   dispatch(setOrderList(res.data));
// };
export const useOrderRedux = () => {
  const {getAllMoveOrderByUserId} = useOrderApi();
  //不需要参数的
  const searchAllOrderAsync = async dispatch => {
    let res = await getAllMoveOrderByUserId();
    if (res?.data) {
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
        setWaitPayDepositList(
          arrayList.filter(obj => obj.status === 'wait-paydeposit'),
        ),
      );
      dispatch(
        setWaitReceiveList(
          arrayList.filter(obj => obj.status === 'wait-receive'),
        ),
      );
      dispatch(setOnWayList(arrayList.filter(obj => obj.status === 'on-way')));
      dispatch(
        setLoadTransportList(
          arrayList.filter(obj => obj.status === 'load-transport'),
        ),
      );
      dispatch(
        setWaitPayRemainList(
          arrayList.filter(obj => obj.status === 'wait-payremain'),
        ),
      );
      dispatch(
        setFinishedList(arrayList.filter(obj => obj.status === 'finished')),
      );
      dispatch(
        setCanceledList(arrayList.filter(obj => obj.status === 'canceled')),
      );
      dispatch(
        setWaitPayList(
          arrayList.filter(
            obj =>
              obj.status === 'wait-paydeposit' ||
              obj.status === 'wait-payremain',
          ),
        ),
      );
    }
  };
  return {searchAllOrderAsync};
};

//查询的
export const selectOrderList = state => state.order.orderList;
export const selectWaitPayDepositList = state => state.order.waitPayDepositList;
export const selectWaitReceiveList = state => state.order.waitReceiveList;
export const selectOnWayList = state => state.order.onWayList;
export const selectLoadTransportList = state => state.order.loadTransportList;
export const selectWaitPayRemainList = state => state.order.waitPayRemainList;
export const selectFinishedList = state => state.order.finishedList;
export const selectCanceledList = state => state.order.canceledList;
export const selectWaitPayList = state => state.order.waitPayList;

export default slice.reducer;
