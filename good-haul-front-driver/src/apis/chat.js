/*
 * @FilePath: chat.js
 * @Author: Aron
 * @Date: 2024-03-30 14:57:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-30 14:57:41
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
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
    getChatContentByChatId,
    getChatListByUserId,
  };
};
export default useChatApi;
