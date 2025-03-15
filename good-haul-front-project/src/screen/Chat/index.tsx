import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { selectToken } from "../../store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import { useChatRedux, selectNoticeNumber, selectChatList } from '../../store/chat/chatSlice';
import ChatList from './features/ChatList';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Loading from '../../components/Loading';
import { useToast } from "native-base"
import AlertWarning from "../../components/AlertWarning"
export default function Chat({ navigation }) {

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const noticeNumber = useSelector(selectNoticeNumber);
  const { searchAllChatAsync, clearNotReadNumber } = useChatRedux();
  useEffect(() => {
    if (token) { //TODO 有token才查询！否则首次没token就查了，有了就不查了，就没数据！
      //@ts-ignore
      dispatch(searchAllChatAsync()); //触发聊天列表查询
    }
  }, [token])
  const toast = useToast();
  // TODO 页面前置路由拦截器，使用 react-navigation 提供的 useFocusEffect 在进入Chat页面时执行逻辑
  useFocusEffect(
    () => {
      // 在这里执行您的判断逻辑，比如检查用户是否已登录
      if (!token) {
        let toastOption = {
          status: "warning",
          title: "请先登录！"
        }
        toast.show({
          placement: "top-right", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
        // 如果用户未登录，则跳转到个人主页
        navigation.navigate('Mine', {
          screen: "MineMain"
        });
      }
      // 返回一个清理函数，用于在离开页面时取消订阅或清理资源
      return () => {
        // 清理逻辑
      };
    }
  );
  const clearAllNotRead = () => {
    //@ts-ignore
    dispatch(clearNotReadNumber);
  }
  const allChatList = useSelector(selectChatList);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // && allChatList.length
    if (allChatList) {
      setLoading(false)
    }
  }, [allChatList])
  return (
    <SafeAreaView style={styles.mainContent}>
      <View style={styles.bannerContainer}>
        <Text style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={styles.notice}>消息</Text>
          <Text style={{ fontSize: 13, color: "#737373", marginLeft: 5 }}>{noticeNumber > 0 ? "(" + (noticeNumber > 99 ? "99+" : noticeNumber) + ")" : null}</Text>
        </Text>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={clearAllNotRead}>
          <FontAwesome6 name="brush" color={'#C8C8C8'} size={16} />
          <Text style={{ marginLeft: 5 }}>全部已读</Text>
        </TouchableOpacity>
      </View>
      {loading ? <Loading></Loading> : <ChatList navigation={navigation}></ChatList>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  notice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000"
  },
  bannerContainer: {
    width: Dimensions.get("window").width,
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#ffff",
    // marginBottom: 10
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
    paddingBottom: 10
  },
})