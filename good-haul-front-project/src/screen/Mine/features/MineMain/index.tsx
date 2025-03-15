import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { Avatar } from "native-base"
import React from 'react'
import { selectUserInfo, selectToken } from "../../../../store/user/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import Setup from '../Setup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import SlideShow from "../../../../components/SlideShow"
export default function MineMain({ navigation }) {
  const userInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.personContainer} onPress={() => {
        if (token) {
          navigation.navigate("Setup");
        } else {
          navigation.navigate("Login");
        }
      }}>
        <Avatar bg="#fff" style={[!userInfo?.profile?.avatar && { borderColor: "#0891b2", borderWidth: 1 }]} source={{
          uri: userInfo?.profile?.avatar ? userInfo?.profile?.avatar : "https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/huoche.png"
        }} alignSelf="center" size="md" >
          AJ
        </Avatar>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#1E1414", marginLeft: 15 }}>
            {
              token ? userInfo?.profile?.name ? userInfo?.profile?.name :
                userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7) : "立即登录"
            }
          </Text>
          {
            userInfo?.profile?.sign && <Text style={{ fontSize: 13, marginLeft: 15, marginTop: 2 }}>{userInfo?.profile?.sign}</Text>
          }
        </View>

      </TouchableOpacity>
      <View style={styles.usuallyContainer}>
        <View>
          <Text style={{ fontSize: 15, color: "#1E1414" }}>常用功能</Text>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate('Home', {
              screen: 'Move'
            });
          }}>
            <MaterialCommunityIcons name="home-city" color={'#0891b2'} size={30} />
            <Text>搬家</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate('Home', {
              screen: 'Run'
            });
          }}>
            <MaterialCommunityIcons name="bicycle-cargo" color={'#0891b2'} size={30} />
            <Text>跑腿</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate('Order', {
              screen: 'All'
            });
          }}>
            <AntDesign name="book" color={'#0891b2'} size={30} />
            <Text>我的订单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate('Chat');
          }}>
            <AntDesign name="message1" color={'#0891b2'} size={30} />
            <Text>消息</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <SlideShow navigation={navigation}></SlideShow>
      </View>
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.listItem} onPress={() => {
          navigation.navigate("Rates");
        }}>
          <View style={styles.listTitle}>
            <Feather name="list" color={'#737373'} size={16} />
            <Text style={{ marginLeft: 5, fontWeight: "bold" }}>收费标准</Text>
          </View>
          <View>
            <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => {
          navigation.navigate("SuggestBack");
        }}>
          <View style={styles.listTitle}>
            <FontAwesome name="pencil-square-o" color={'#737373'} size={16} />
            <Text style={{ marginLeft: 5, fontWeight: "bold" }}>问题反馈</Text>
          </View>
          <View>
            <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => {
          navigation.navigate("Privacy");
        }}>
          <View style={styles.listTitle}>
            <Feather name="trello" color={'#737373'} size={16} />
            <Text style={{ marginLeft: 5, fontWeight: "bold" }}>隐私协议</Text>
          </View>
          <View>
            <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => {
          navigation.navigate("AboutUs");
        }}>
          <View style={styles.listTitle}>
            <Feather name="alert-circle" color={'#737373'} size={16} />
            <Text style={{ marginLeft: 5, fontWeight: "bold" }}>关于我们</Text>
          </View>
          <View>
            <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
          </View>
        </TouchableOpacity>
        {token &&
          <TouchableOpacity style={styles.listItem} onPress={() => {
            navigation.navigate("Setup");
          }}>
            <View style={styles.listTitle}>
              <FontAwesome6 name="user-gear" color={'#737373'} size={16} />
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>设置</Text>
            </View>
            <View>
              <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
            </View>
          </TouchableOpacity>
        }
      </View>
      {/* <Setup navigation={navigation}></Setup> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    paddingTop: 20
  },
  personContainer: {
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 10
  },
  usuallyContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 10,
    padding: 12
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80
  },
  item: {
    height: 52,
    width: 60,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10
  },
  sliderContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
  },
  listContainer: {
    width: Dimensions.get("window").width * 0.9,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffff",
    borderRadius: 15,
  },
  listItem: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listTitle: {
    flexDirection: "row",
    alignItems: "center"
  }
})