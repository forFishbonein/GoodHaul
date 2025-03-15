import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { selectToken } from "../../store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import { useChatRedux, selectNoticeNumber, selectChatList } from '../../store/chat/chatSlice';
import ChatList from './features/ChatList';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Loading from '../../components/Loading';

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