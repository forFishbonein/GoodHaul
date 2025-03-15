/*
 * @FilePath: chatSlice.js
 * @Author: Aron
 * @Date: 2024-03-29 23:01:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-30 14:59:03
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import {createSlice} from '@reduxjs/toolkit';
import useChatApi from '../../apis/chat';
export const slice = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    noticeNumber: 0,
  },
  reducers: {
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    setNoticeNumber: (state, action) => {
      state.noticeNumber = action.payload;
    },
    /*
    {
      id;
      data;
    }
    */
    //TODO 每次从列表点进去的时候要调用这个函数，这样外面展示的未读数量才是准确的，否则在里面的时候交流看到的数量，回来之后会被算上，但是实际上应该是不算的！
    updateChatListItem: (state, action) => {
      const updatedList = state.chatList.map(e => {
        if (e.id === action.payload.id) {
          return action.payload.data; // 替换为新对象
        }
        return e; // 其他对象保持不变
      });
      state.chatList = updatedList;
    },
  },
});

export const {setChatList, setNoticeNumber, updateChatListItem} = slice.actions;

export const useChatRedux = () => {
  const {getChatListByUserId} = useChatApi();

  const searchAllChatAsync = currentId => async (dispatch, getState) => {
    let res = await getChatListByUserId();
    const selectChatListPre = selectChatList(getState());
    //先看看列表有没有数据
    if (res?.data?.chatList && res?.data?.chatList.length) {
      let arrayList = res.data.chatList.reverse();
      //把最后进行更新的放在前面，根据lastChatTime进行排序！
      arrayList.sort((a, b) => {
        // 将字符串类型的时间转换为Date对象进行比较
        const timeA = new Date(a.lastChatTime);
        const timeB = new Date(b.lastChatTime);
        // 比较时间，根据需要修改排序逻辑
        if (timeA < timeB) {
          return 1; // 返回正数表示a在b之后
        }
        if (timeA > timeB) {
          return -1; // 返回负数表示a在b之前
        }
        return 0; // 时间相同，不需要交换顺序
      });
      console.log('redux查询回来的数据Chat：', arrayList.slice(0, 5));
      if (selectChatListPre.length) {
        // console.log('旧的chatList：', selectChatListPre.slice(0, 5));
        //TODO 这里下拉刷新用（里面还有从页面返回的进一步逻辑）
        //TODO 后面多个聊天的时候这里还要测试！！
        // 用户端这边，之前的逻辑有问题，因为司机也是会给我们发送消息的，那么最后一条的时间就变了，顺序就乱了，所以根据索引就不能成立了（双向通讯，一定要考虑两边的情况）
        // let copyOne = JSON.parse(JSON.stringify(arrayList[0]));
        // if (arrayList[0].id == currentId) {
        //   arrayList.shift(); //先取出去
        // } else {
        //   console.log('出问题了！');
        // }
        // let chatListWithNotReadNumber = arrayList.map((e, index) => {
        //   if (e.id == selectChatListPre[index].id) {
        //     e.notReadNumber =
        //       e.content.length - selectChatListPre[index].content.length;
        //   }
        //   return e;
        // });
        // copyOne.notReadNumber = 0;
        // chatListWithNotReadNumber.unshift(copyOne); //再放回来

        let chatListWithNotReadNumber = arrayList.map((e, index) => {
          let foundIndex = selectChatListPre.findIndex(obj => obj.id === e.id);
          if (foundIndex !== -1) {
            e.notReadNumber =
              e.content.length - selectChatListPre[foundIndex].content.length;
          }
          //用户端不需要下面这个：因为用户端不可能存在刷新之后刷出来之前没有的！
          else {
            //因为用户可以主动发起回话，用户和司机都会存在之前没有现在有了的，但用户端是主动地，所以是从聊天页面返回才会这样，但司机是被动的只有刷新列表才会这样
            e.notReadNumber = e.content.length; //司机端找不到的就直接用 length
          }
          return e;
        });
        //TODO 这里是从详情页返回的时候加的逻辑
        if (currentId) {
          let foundIndex = selectChatListPre.findIndex(
            obj => obj.id === currentId,
          );
          if (foundIndex !== -1) {
            //这里，司机和用户都是根据 currentId 在 pre 里面 find 就行了，找得到的就计算，找不到的就直接写 0（就那 1 个点进去的，在里面聊的对话内容没有被记录的应该为0）
            chatListWithNotReadNumber[foundIndex].notReadNumber = 0; //刚刚从这个对话框出来，所以一定是0
          }
          //司机端不需要下面这个：因为司机端不存在从详情页返回之后出现之前没有的！
          // else {
          //   // 因为用户可以主动发起回话，用户和司机都会存在之前没有现在有了的，但用户端是主动地，所以是从聊天页面返回才会这样，但司机是被动的只有刷新列表才会这样
          //   e.notReadNumber = 0; //用户端找不到的旧直接是0（因为是主动发起新建的）
          // }
        }
        dispatch(setChatList(chatListWithNotReadNumber)); //倒序，时间靠后的在前面
        const sum = chatListWithNotReadNumber.reduce((accumulator, obj) => {
          return accumulator + obj.notReadNumber;
        }, 0);
        dispatch(setNoticeNumber(sum)); //倒序，时间靠后的在前面
      } else {
        //这里是初始化的时候：
        //TODO 注意：其实要做的更好的话，应该把用户看过的最后一次数据本地存储一下，这样初始化的时候也可以去计算一下NotReadNumber，但是现在不行，不知道用户之前看了啥
        //所以没办法计算
        dispatch(setChatList(arrayList));
      }
    }
  };

  const clearNotReadNumber = (dispatch, getState) => {
    const chatList = selectChatList(getState());
    let newList = chatList.map(e => {
      return {
        ...e,
        notReadNumber: 0,
      };
    });
    dispatch(setChatList(newList));
    dispatch(setNoticeNumber(0));
  };
  return {searchAllChatAsync, clearNotReadNumber};
};

//查询的
export const selectChatList = state => state.chat.chatList;
export const selectNoticeNumber = state => state.chat.noticeNumber;

export default slice.reducer;
