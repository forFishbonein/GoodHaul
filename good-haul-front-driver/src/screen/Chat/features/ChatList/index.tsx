import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Dimensions, RefreshControl } from 'react-native';
import { Avatar, ScrollView } from "native-base"
import { useSelector, useDispatch } from 'react-redux';
import { useChatRedux, selectChatList, updateChatListItem } from '../../../../store/chat/chatSlice';
import { formatDateChat } from "../../../../utils/formDate"
import EmptyChat from "../../../../components/EmptyChat"
import useChatApi from '../../../../apis/chat';
export default function ChatList({ navigation }) {
  const dispatch = useDispatch();
  const { getChatContentByChatId } = useChatApi();
  const allChatList = useSelector(selectChatList);
  const goToSeeContent = (chatItem) => {
    return async () => {
      let res = await getChatContentByChatId(chatItem.id);
      let chatContent = res.data.chatContent;
      // console.log(JSON.stringify(chatContent))
      navigation.navigate("ChatContent", { chatContent: JSON.stringify(chatContent) });
      //@ts-ignore
      dispatch(updateChatListItem({
        id: chatItem.id,
        data: chatItem
      }));
    }
  }
  //控制下拉刷新！
  const [refreshing, setRefreshing] = useState(false);
  const { searchAllChatAsync } = useChatRedux();
  // 下拉刷新触发的函数
  const onRefresh = async () => {
    setRefreshing(true);
    //@ts-ignore
    await dispatch(searchAllChatAsync()); //触发聊天列表查询
    setRefreshing(false);
  };
  return (
    <ScrollView
      overScrollMode="never"
      removeClippedSubviews={true}
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {
        allChatList && allChatList.length ?
          allChatList?.map((e, index) => {
            return (
              <TouchableOpacity style={styles.itemContainer} onPress={goToSeeContent(e)} key={index}>
                {/* <Text>{JSON.stringify(e)}</Text> */}
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View style={styles.avatarContainer}>
                    <Avatar bg="#fff" style={{ borderColor: "#f97316", borderWidth: 1 }} source={{
                      uri: e?.user?.avatar ? e?.user?.avatar : "https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/huoche.png"
                    }} alignSelf="center" size="md" >
                      AJ
                    </Avatar>
                    {
                      e.notReadNumber ?
                        <View style={styles.point}>
                          <Text style={{ fontSize: 10, color: "#fff" }}>
                            {e.notReadNumber}
                          </Text>
                        </View>
                        : null
                    }
                  </View>
                  <View style={styles.textContainer}>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                      <View style={styles.titleContainer}>
                        {/* 用户名 */}
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{e.user.name}</Text>
                        <Text>{formatDateChat(e.lastChatTime)}</Text>
                      </View>
                    </View>
                    <View style={{ width: "85%" }}>
                      <Text style={{ fontSize: 13 }} numberOfLines={1} ellipsizeMode="tail">{e.content?.length ? e.content[0].text : ""}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>)
          }) : <EmptyChat text={"暂无聊天数据"} height={Dimensions.get("window").height - 45}></EmptyChat>
      }
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  point: {
    minWidth: 14,
    height: 14,
    position: "absolute",
    right: 10,
    top: 10,
    borderRadius: 7,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 2
  },
  itemContainer: {
    width: Dimensions.get("window").width,
    height: 70,
    backgroundColor: "#ffff",
    borderBottomWidth: 1,
    borderColor: "#f5f5f5"
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: 70
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "80%"
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10
  },
  title: {
    // marginBottom: 10,
    fontSize: 16,
    // fontWeight:"600"
    color: "#000000",
  },
})