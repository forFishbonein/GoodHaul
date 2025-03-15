/*
 * @FilePath: index.ts
 * @Author: Aron
 * @Date: 2024-03-17 20:35:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-05 20:17:22
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import type { Reducer } from '@reduxjs/toolkit';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import orderReducer from './order/orderSlice';
import locateReducer from './locate/locateSlice';
import userReducer from './user/userSlice';
import chatReducer from './chat/chatSlice';
import * as rp from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// 持久化配置对象
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, //react native必须用AsyncStorage！
  whitelist: ['user'], // 指定需要持久化的 reducer
  blacklist: ['locate', 'order', 'chat'], // 不需要持久化的 reducer
  stateReconciles: hardSet as (inboundState: CombinedState) => CombinedState,
  version: 1,
};
type CombinedState = typeof rootReducer extends Reducer<infer U, any> ? U : never
const rootReducer = combineReducers({
  order: orderReducer,
  locate: locateReducer,
  user: userReducer,
  chat: chatReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
// export default configureStore({
//   reducer: {
//     order: orderReducer,
//     locate: locateReducer,
//     user: userReducer,
//   },
// });
export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => //必须添加这些，否则报错
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER],
        },
      }),
  });

  // 创建持久化存储
  const persistor = persistStore(store);
  return { store, persistor };
};
