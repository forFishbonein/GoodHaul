/*
 * @FilePath: sms.providers.ts
 * @Author: Aron
 * @Date: 2024-03-19 00:52:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-03-15 02:14:24
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
//这个就相当于整个模块的数据库连接池，一个连接对象工厂，通过提供token的方式进行依赖注入
export const SMSProviders = [
  {
    // Token可以自己设定
    provide: 'ALiYunSMSToken',
    // entity定义的数据实体
    useFactory: () => {
      // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
      // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
      let config = new $OpenApi.Config({

      });
      // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
      config.endpoint = `dysmsapi.aliyuncs.com`;
      return new Dysmsapi20170525(config);
    },
  },
];