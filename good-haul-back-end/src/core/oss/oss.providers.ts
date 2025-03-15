import { createConnection } from 'typeorm';
const OSS = require('ali-oss'); //TODO ali-oss是比较老的库，它的导出方式是module.exports，所以必须要用require引入
import config from "./config"
export const ossProviders = [
  {
    // Token可以自己设定
    provide: 'AliOSSToken',
    useFactory: async () =>
      new OSS({
        // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: config.REGION,
        // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
        accessKeyId: config.OSS_ACCESS_KEY_ID,
        accessKeySecret: config.OSS_ACCESS_KEY_SECRET,
        // 填写Bucket名称。
        bucket: config.BUCKET,
      })
  },
];