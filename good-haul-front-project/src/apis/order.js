import useAxios from '../request';
const useOrderApi = () => {
  const {httpRequest} = useAxios();
  const createMoveOrder = data => {
    return httpRequest({
      method: 'post',
      url: '/order/move/create',
      data: data,
    });
  };
  const getAllMoveOrder = () => {
    return httpRequest({
      method: 'get',
      url: '/order/move',
    });
  };
  const getAllMoveOrderByUserId = () => {
    return httpRequest({
      method: 'get',
      url: '/order/move/user',
    });
  };
  const getOneMoveOrderById = id => {
    return httpRequest({
      method: 'get',
      url: `/order/move/${id}`,
    });
  };
  const payMoveOrderDeposit = (orderId, paidPrice) => {
    return httpRequest({
      method: 'post',
      url: '/order/move/payDeposit',
      data: {
        //TODO 大坑：注意这里data必须是一个obj，如果是string是会报错的！！！
        orderId: orderId,
        paidPrice: paidPrice,
      },
    });
  };
  const cancelMoveOrder = id => {
    return httpRequest({
      method: 'get',
      url: `/order/move/cancel/${id}`,
    });
  };
  const payMoveOrderRemain = orderId => {
    return httpRequest({
      method: 'post',
      url: '/order/move/payRemain',
      data: {
        orderId: orderId,
      },
    });
  };

  return {
    createMoveOrder,
    getAllMoveOrder,
    getOneMoveOrderById,
    payMoveOrderDeposit,
    cancelMoveOrder,
    getAllMoveOrderByUserId,
    payMoveOrderRemain
  };
};
export default useOrderApi;
