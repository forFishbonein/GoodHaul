import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'route',
  initialState: {
    serviceType: 'Move',
    moveType: 'Small',
  },
  reducers: {
    setServiceType: (state, action) => {
      state.serviceType = action.payload;
    },
    setMoveType: (state, action) => {
      state.moveType = action.payload;
    },
  },
});

export const {setServiceType, setMoveType} = slice.actions;

//异步的
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

//查询的
export const selectServiceType = state => state.route.serviceType;

export const selectMoveType = state => state.route.moveType;

export default slice.reducer;
