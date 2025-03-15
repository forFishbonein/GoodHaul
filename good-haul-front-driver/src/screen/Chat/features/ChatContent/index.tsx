/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, BackHandler } from 'react-native';
import { Menu, Pressable, HamburgerIcon } from 'native-base';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import config from "../../../../request/config"
import { selectUserInfo, selectToken } from "../../../../store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useChatRedux } from "../../../../store/chat/chatSlice"
import { useFocusEffect } from '@react-navigation/native';
// import _ from 'lodash';

export default function ChatContent({ route, navigation }) {
  const [messages, setMessages]: any = useState([]);
  const [socket, setSocket]: any = useState();
  const [roomId, setRoomId] = useState();
  const [chatId, setChatId] = useState();
  const [chatContentAll, setChatContentAll]: any = useState();
  const dispatch = useDispatch();
  const { searchAllChatAsync } = useChatRedux();
  const [chatAble, setChatAble] = useState(false);
  const backAction = (chatId) => {
    console.log("chatId", chatId);
    return () => {
      console.log("chatId", chatId);
      //@ts-ignore
      dispatch(searchAllChatAsync(chatId)); //重新查询订单列表
      navigation.navigate('Chat');
      return true; // 返回 true 表示拦截返回按钮事件
    }
  };
  useEffect(() => {

  }, [navigation]);
  const driverInfo = useSelector(selectUserInfo);
  let [chatUser, setChatUser]: any = useState();
  useEffect(() => {
    setChatUser({
      _id: driverInfo?.id,
      name: driverInfo?.name,
      avatar: "https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/siji.png",
    })
  }, [driverInfo])
  //TODO 必须要在useFocusEffect这里设置，否则下一次进入房间就不能连接到服务器了！因为
  //但是要设置!roomId的判断条件，否则每次setXXX的时候这里也会重新执行！
  useFocusEffect(
    () => {
      if (route.params.chatContent && !roomId) {
        // let chatContentCopy = _.cloneDeep(route.params.chatContent); //不需要深复制
        let chatContent = JSON.parse(route.params.chatContent); //注意必须要解析一下！
        // console.log(chatContent)
        if (chatContent?.content) {
          setMessages(chatContent.content)
        }
        setChatContentAll(chatContent)
        // console.log(chatContent.roomId)
        setRoomId(chatContent.roomId)
        setChatId(chatContent.id)
        setChatAble(!!chatContent?.doingOrderId?.length)
        navigation.setOptions({
          title: "用户 " + chatContent.user.name ? chatContent.user.name :
            chatContent.user.phone.substring(0, 3) + '****' + chatContent.user.phone.substring(7),
          headerRight: () => (
            !!chatContent?.doingOrderId?.length ?
              <View style={{ flexDirection: "row", alignItems: "center" }} >
                <Menu w="170" trigger={triggerProps => {
                  return <Pressable accessibilityLabel="更多选项" {...triggerProps}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ fontSize: 15 }}>关联订单</Text>
                      <HamburgerIcon />
                    </View>
                  </Pressable>;
                }}>
                  {
                    chatContent?.doingOrderId?.map((e, index) => {
                      return (
                        <Menu.Item key={index}>
                          <TouchableOpacity onPress={() => {
                            navigation.navigate('Order', {
                              screen: 'Detail', params: {
                                orderId: e
                              }
                            });
                          }}>
                            <Text>{"订单" + (index + 1) + "：" + e}</Text>
                          </TouchableOpacity>
                        </Menu.Item>
                      )
                    })
                  }
                </Menu>
              </View > : <Text>无进行中订单，无法聊天</Text>
          ),
        })
      }
      // 在这里执行您的判断逻辑
      // 返回一个清理函数，用于在离开页面时取消订阅或清理资源
      return () => {
        // 清理逻辑
      };
    }
  );
  useEffect(() => {

  }, [route.params]);
  useEffect(() => {
    if (roomId) {
      // alert(roomId)
      let socket = io(config.baseApi);
      socket.on('connect', () => { //连接服务器
        console.log('Connected to server');
        socket.emit('joinRoom', roomId); //加入房间
      });
      // 监听来自服务器的消息
      socket.on('chatToRoom', (message) => {
        console.log('从服务器接收到消息：', message);
        setMessages((previousMessages) => {
          // [...prevMessages, message]
          return GiftedChat.append(previousMessages, message) //添加消息到当前gift组件
        }
        );
      });
      setSocket(socket); //TODO 这里和axios类似，必须要先设置完监听器，然后再赋值！
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction(chatId)
      );
      //TODO left按钮必须在chatId已经拥有之后才能初始化！left按钮是被我们绑定了特殊的事件的！
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity style={{ alignItems: "center", marginRight: 15, marginLeft: 5 }} onPress={backAction(chatId)}>
            <FontAwesome name="angle-left" color={"#737373"} size={35} />
          </TouchableOpacity>
        )
      })
      return () => { //这个return写在if里面是没有问题的！可以写在任何地方！
        if (socket) {
          socket.emit('leaveRoom', roomId); //离开房间
          socket.disconnect();//断连服务器
          backHandler.remove();
        }
      };
    }
  }, [roomId])

  //TODO useCallback的作用类似于useState，就是在页面更新的时候，这个函数不让他重新初始化，但是也导致一个问题，就是在这个函数里面取不到最新的state变量值！
  //所以这里不能用useCallback
  const onSend = (msg: any = []) => {
    setMessages(previousMessages => {
      // console.log(previousMessages, msg)
      return GiftedChat.append(previousMessages, msg) //添加消息到当前gift组件
    })
    console.log("发送消息到服务器：", msg[0])
    // 发送消息到服务器
    socket.emit('chatToRoom', { chatId: chatContentAll.id, roomId, message: msg[0] })
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#ffffff',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff',
          },
          right: {
            // backgroundColor: '#95ec69',
            backgroundColor: '#f97316',
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        alwaysShowSend={true}
      >
        <View style={styles.sendBtn}>
          <Text style={{ color: '#ffffff', fontSize: 17 }}>发送</Text>
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={styles.mainContent}>
      <GiftedChat
        messages={messages}
        //@ts-ignore
        onSend={message => onSend(message)}
        showUserAvatar={true}
        locale={'zh-cn'}
        showAvatarForEveryMessage={true}
        renderBubble={renderBubble}
        placeholder={'请在此输入消息'}
        renderSend={renderSend}
        inverted={true}
        renderUsernameOnMessage={true}
        //这里给用户信息
        user={chatUser}
        alignTop={true}
        textInputProps={{ editable: chatAble }} // 禁用输入框
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  sendBtn: {
    width: 63,
    height: 32,
    borderRadius: 3,
    // backgroundColor: '#07c160',
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  }
});

