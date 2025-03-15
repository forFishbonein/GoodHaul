import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLoginRedux } from "../../../../store/user/userSlice"
import { useToast } from "native-base"
import AlertWarning from '../../../../components/AlertWarning'
import { Button, Avatar, Modal, Input, Radio, Icon, Pressable } from 'native-base'
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from "../../../../store/user/userSlice"
import Entypo from 'react-native-vector-icons/Entypo'
import { genderTable } from "../../../../constant/name"
import formData from "../../../../utils/formDate"
import useUserApi from "../../../../apis/user"
import { setUserInfo } from "../../../../store/user/userSlice"
import { useIsFocused } from '@react-navigation/native'; // 导入导航钩子
import _ from 'lodash';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default function Setup({ navigation }) {
  // const isFocused = useIsFocused(); // 获取当前页面是否处于焦点状态
  // useEffect(() => {
  //   if (isFocused) {
  //     // 当进入当前页面时执行的操作
  //     StatusBar.setBackgroundColor('#ffffff');
  //   }
  // }, [isFocused]); // 依赖 isFocused 状态的变化
  const userInfo = useSelector(selectUserInfo);

  const { modifyName, modifyGender, modifySign, getStsUrl, checkIfHavePassword, modifyPassword } = useUserApi();
  useEffect(() => {
    navigation.setOptions({
      title: "个人信息",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: "none", // 设置粗体字体
      },
    })
  }, [])

  let { doLogout } = useLoginRedux();
  let toast = useToast();
  const dispatch = useDispatch();
  const confirmLogout = async () => {
    //@ts-ignore
    await dispatch(doLogout);
    //@ts-ignore
    navigation.navigate('Login', {
      screen: 'CodeLogin'
    });
    let toastOption = {
      status: "success",
      title: "已退出登录！"
    }
    toast.show({
      placement: "top", //在上方弹出
      render: ({
        id
      }) => {
        return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
      }
    });
  }
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [genderUser, setGenderUser] = useState("");
  const [signUser, setSignUser] = useState("");
  useEffect(() => {
    setNameUser(userInfo?.profile?.name)
    setGenderUser(userInfo?.profile?.gender)
    setSignUser(userInfo?.profile?.sign)
  }, [userInfo])
  const modifyTheName = async () => {
    let res = await modifyName(nameUser);
    setShowModal(false);
    let copyUserInfo = _.cloneDeep(userInfo);
    copyUserInfo.profile.name = nameUser
    //@ts-ignore
    dispatch(setUserInfo(copyUserInfo))
  }
  const modifyTheGender = async () => {
    let res = await modifyGender(genderUser);
    setShowModal2(false);
    let copyUserInfo = _.cloneDeep(userInfo);
    copyUserInfo.profile.gender = genderUser
    //@ts-ignore
    dispatch(setUserInfo(copyUserInfo))
  }
  const modifyTheSign = async () => {
    let res = await modifySign(signUser);
    setShowModal3(false);
    let copyUserInfo = _.cloneDeep(userInfo);
    copyUserInfo.profile.sign = signUser
    //@ts-ignore
    dispatch(setUserInfo(copyUserInfo))
  }
  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: '存储权限',
          message: '应用程序需要访问您的存储来读取文件',
          buttonNeutral: '稍后向我询问',
          buttonNegative: '取消',
          buttonPositive: '确认',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  function getContentBeforeQuestionMark(url) {
    const questionMarkIndex = url.indexOf('?');
    if (questionMarkIndex !== -1) {
      return url.substring(0, questionMarkIndex);
    }
    return url;
  }
  const selectImage = () => {
    //先请求文件读取权限
    requestStoragePermission().then(() => {
      launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
        if (!response.didCancel) {
          getStsUrl(response.assets[0].fileName).then(res => {
            let imgOssUrl = getContentBeforeQuestionMark(res.data.url)
            console.log(imgOssUrl)
            RNFetchBlob.fetch('PUT', res.data.url, {
              'Content-Type': "text/plain", //这个必须要是文件类型，不然就会报签名错误（后端生成时是由后缀名，不传签名验证对不上）
            }, RNFetchBlob.wrap(response.assets[0].originalPath))
              .then(res => {
                let copyUserInfo = _.cloneDeep(userInfo);
                copyUserInfo.profile.avatar = imgOssUrl
                //@ts-ignore
                dispatch(setUserInfo(copyUserInfo))
                // console.log(res);
                let toastOption = {
                  status: "success",
                  title: "修改头像成功！"
                }
                toast.show({
                  placement: "top", //在上方弹出
                  render: ({
                    id
                  }) => {
                    return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
                  }
                });
                setShowModal4(false)
              })
              .catch(err => {
                console.log(err);
              })
          }).catch(err => {
            console.log(err);
          })
        }
      });
    })
  };
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  let [oldPassword, setOldPassword]: any = useState();
  let [password, setPassword]: any = useState();
  let [havePasswordFlag, setHavePasswordFlag]: any = useState(false);
  const checkIfPassword = async () => {
    let res = await checkIfHavePassword();
    setHavePasswordFlag(res.data);
    setShowModal5(true);
  }
  const confirmModifyPassword = async () => {
    if ((!havePasswordFlag || oldPassword) && password) {
      if (/^.{6,32}$/.test(password)) {
        try {
          let res = await modifyPassword(oldPassword, password);
          if (res.data) {
            let toastOption = {
              status: "success",
              title: "密码修改成功！"
            }
            toast.show({
              placement: "top", //在上方弹出
              render: ({
                id
              }) => {
                return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
              }
            });
            setOldPassword("");
            setPassword("");
            setShowModal5(false)
          }
        } catch (e) {
          if (e.message === "旧密码不正确！") {
            let toastOption = {
              status: "error",
              title: e.message
            }
            toast.show({
              placement: "top", //在上方弹出
              render: ({
                id
              }) => {
                return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
              }
            });
          }
          setOldPassword("");
        }
      } else {
        let toastOption = {
          status: "warning",
          title: "新密码必须在6-32位之间！"
        }
        toast.show({
          placement: "top", //在上方弹出
          render: ({
            id
          }) => {
            return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
          }
        });
      }
    } else {
      let toastOption = {
        status: "warning",
        title: "请将内容填写完整！"
      }
      toast.show({
        placement: "top", //在上方弹出
        render: ({
          id
        }) => {
          return <AlertWarning id={id} toast={toast} toastOption={toastOption}></AlertWarning>
        }
      });
    }
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Text style={{ color: "#1E1414" }}>头像</Text>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {
              setShowModal4(true);
            }}>
              <Avatar bg="#fff" style={[!userInfo?.profile?.avatar && { borderColor: "#0891b2", borderWidth: 1 }]} source={{
                uri: userInfo?.profile?.avatar ? userInfo?.profile?.avatar : "https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/huoche.png"
              }} alignSelf="center" size="md" >
                AJ
              </Avatar>
            </TouchableOpacity>
          </View>
          <View style={styles.listItem}>
            <Text style={{ color: "#1E1414" }}>账号</Text>
            <Text>{userInfo?.phone}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ color: "#1E1414" }}>昵称</Text>

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {
              setShowModal(true);
            }}>
              <Text style={{ marginRight: 5 }}>
                {userInfo?.profile?.name ? userInfo?.profile?.name : "去设置"}
              </Text>
              <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
            </TouchableOpacity>
          </View>
          <View style={styles.listItem}>
            <Text style={{ color: "#1E1414" }}>性别</Text>

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {
              setShowModal2(true);
            }}>
              <Text style={{ marginRight: 5 }}>
                {userInfo?.profile?.gender ? genderTable[userInfo?.profile?.gender] : "去设置"}
              </Text>
              <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
            </TouchableOpacity>
          </View>
          <View style={styles.listItem}>
            <Text style={{ color: "#1E1414" }}>个性签名</Text>

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {
              setShowModal3(true);
            }}>
              <Text style={{ marginRight: 5 }}>
                {userInfo?.profile?.sign ? userInfo?.profile?.sign : "去设置"}
              </Text>
              <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
            </TouchableOpacity>
          </View>
          <View style={styles.listItem}>
            <Text style={{ color: "#1E1414" }}>上次登陆时间</Text>
            <Text>{formData(userInfo?.lastLoginTime)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ color: "#1E1414" }}>账号创建时间</Text>
            <Text>{formData(userInfo?.accountCreateTime)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ color: "#1E1414" }}>密码</Text>

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={checkIfPassword}>
              <Text style={{ marginRight: 5 }}>
                修改密码
              </Text>
              <Entypo name="chevron-thin-right" color={'#737373'} size={16} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: Dimensions.get("window").width, backgroundColor: "#ffff", height: 55, justifyContent: "center" }}>
          <Button size="md" variant="link" onPress={confirmLogout}>退出登录</Button>
        </View>
      </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>设置昵称</Modal.Header>
          <Modal.Body>
            <Input variant="filled" placeholder="请填写昵称" value={nameUser} onChangeText={(text) => { setNameUser(text) }} />
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={modifyTheName}>
              确认设置
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>设置性别</Modal.Header>
          <Modal.Body>
            <Radio.Group name="设置性别" accessibilityLabel="设置性别" value={genderUser} onChange={nextValue => {
              setGenderUser(nextValue);
            }}>
              <Radio value="M" my={1}>
                男
              </Radio>
              <Radio value="F" my={1}>
                女
              </Radio>
            </Radio.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={modifyTheGender}>
              确认设置
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModal3} onClose={() => setShowModal3(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>设置个性签名</Modal.Header>
          <Modal.Body>
            <Input variant="filled" placeholder="请填写个性签名" value={signUser} onChangeText={(text) => { setSignUser(text) }} />
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={modifyTheSign}>
              确认设置
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModal4} onClose={() => setShowModal4(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>修改头像</Modal.Header>
          <Modal.Body>
            <Avatar bg="#fff" style={{ borderColor: "#0891b2", borderWidth: 1 }} source={{
              uri: userInfo?.profile?.avatar ? userInfo?.profile?.avatar : "https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/huoche.png"
            }} alignSelf="center" size="md" >
              AJ
            </Avatar>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={selectImage}>
              修改
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModal5} onClose={() => setShowModal5(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>修改密码</Modal.Header>
          <Modal.Body>
            {havePasswordFlag ?
              <Input placeholder="请输入旧密码" variant="underlined" value={oldPassword}
                type={show2 ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow2(!show2)} >
                    <Icon as={<MaterialIcons name={show2 ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                  </Pressable>}
                onChangeText={(text) => { setOldPassword(text) }} />
              : null}
            <Input value={password} size="md" placeholder="请输入6-32位新密码" variant="underlined"
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)} >
                  <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                </Pressable>}
              onChangeText={(text) => { setPassword(text) }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={confirmModifyPassword}>
              确认
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: "space-between"
  },
  listContainer: {
    width: Dimensions.get("window").width,
    backgroundColor: "#ffff",
  },
  listItem: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: "#f5f5f5"
  },
})