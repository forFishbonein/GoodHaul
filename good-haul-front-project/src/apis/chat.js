/*
 * @FilePath: chat.js
 * @Author: Aron
 * @Date: 2024-03-29 15:32:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-29 15:46:51
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import useAxios from '../request';
const useChatApi = () => {
  let {httpRequest} = useAxios();
  const checkIfHaveChat = (driverId, orderId) => {
    //看这个用户和司机之前聊没聊过！
    return httpRequest({
      method: 'post',
      url: `/chat/if`,
      data: {
        driverId,
        orderId,
      },
    });
  };
  const createOneChat = data => {
    return httpRequest({
      method: 'post',
      url: `/chat/create`,
      data: data,
    });
  };
  const getChatContentByChatId = id => {
    return httpRequest({
      method: 'get',
      url: `/chat/content/${id}`,
    });
  };
  const getChatListByUserId = () => {
    return httpRequest({
      method: 'get',
      url: `/chat/list`,
    });
  };
  return {
    checkIfHaveChat,
    createOneChat,
    getChatContentByChatId,
    getChatListByUserId,
  };
};
export default useChatApi;
