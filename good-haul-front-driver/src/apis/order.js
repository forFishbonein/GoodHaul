/*
 * @FilePath: order.js
 * @Author: Aron
 * @Date: 2024-03-23 01:48:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-27 21:59:50
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import useAxios from '../request';
const useOrderApi = () => {
  let {httpRequest} = useAxios();
  const getOneMoveOrderById = id => {
    return httpRequest({
      method: 'get',
      url: `/order/move/${id}`,
    });
  };
  const getGrabableOrder = () => {
    return httpRequest({
      method: 'get',
      url: `/order/driver/grabable`,
    });
  };
  const getAllOrderByDriverId = () => {
    return httpRequest({
      method: 'get',
      url: `/order/driver`, //id有可能是骑手，也可能是司机
    });
  };

  const receiveOneOrder = (orderId, carId) => {
    return httpRequest({
      method: 'get',
      url: `/order/driver/receive/${orderId}/${carId}`,
    });
  };

  const confirmArrive = id => {
    return httpRequest({
      method: 'get',
      url: `/order/driver/arrive/${id}`,
    });
  };

  const generateCode = (id, price) => {
    return httpRequest({
      method: 'get',
      url: `/order/driver/code/${id}/${price}`,
    });
  };

  const confirmFinishOrder = (id, code) => {
    return httpRequest({
      method: 'get',
      url: `/order/driver/finish/${id}/${code}`,
    });
  };
  return {
    getOneMoveOrderById,
    getGrabableOrder,
    getAllOrderByDriverId,
    receiveOneOrder,
    confirmArrive,
    generateCode,
    confirmFinishOrder,
  };
};
export default useOrderApi;
