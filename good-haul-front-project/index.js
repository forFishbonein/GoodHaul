/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RNFetchBlob from 'rn-fetch-blob';

// RNFetchBlob全局配置
RNFetchBlob.config({
  fileCache: true,
  appendExt: 'jpg', // 设置默认的文件扩展名
  path: RNFetchBlob.fs.dirs.DocumentDir, // 设置文件系统的基本路径为 DocumentDir
});

AppRegistry.registerComponent(appName, () => App);
