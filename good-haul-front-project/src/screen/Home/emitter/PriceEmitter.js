/*
 * @FilePath: PriceEmitter.js
 * @Author: Aron
 * @Date: 2024-03-17 22:38:04
 * @LastEditors:
 * @LastEditTime: 2024-03-17 22:38:04
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import {EventEmitter} from 'events';
//注意events这个包，必须要单独建立类，只有在单例模式下才能成功！！！
class PriceEmitter extends EventEmitter {}
const SinglePriceEmitter = new PriceEmitter();
export default SinglePriceEmitter;
