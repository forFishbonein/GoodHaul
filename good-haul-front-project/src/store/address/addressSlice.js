import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'address',
  initialState: {
    completeFlag: false,
  },
  reducers: {
    setCompleteFlag: (state, action) => {
      state.completeFlag = action.payload;
    },
  },
});

export const {setCompleteFlag} = slice.actions;

//查询的
export const selectCompleteFlag = state => state.address.completeFlag;

export default slice.reducer;
