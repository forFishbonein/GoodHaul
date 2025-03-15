/*
 * @FilePath: App.tsx
 * @Author: Aron
 * @Date: 2024-03-27 13:21:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-27 13:29:38
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
//@ts-ignore
import type { Node } from 'react';
import * as React from 'react';
import { Provider } from 'react-redux';
import Index from './Index'
import configureStore from './src/store'; // 导入您的 Redux store 配置
import { PersistGate } from 'redux-persist/integration/react';
const App: () => Node = () => {
  const { store, persistor } = configureStore(); // 创建 Redux store 和持久化存储
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Index />
      </PersistGate>
    </Provider>
    </>
  );
}

export default App