import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useThrottle } from "../../../../utils/hooks/throttleHook"
export default function CodeSubFieldInput({ confirmCodeLogin }) {

  let [codeList, setCodeList]: any = useState([]);
  // let [inputValue, setInputValue]: any = useState();
  let [activeNumber, setActiveNumber]: any = useState(0);
  const inputRef1: any = useRef(null);
  const inputRef2: any = useRef(null);
  const inputRef3: any = useRef(null);
  const inputRef4: any = useRef(null);
  const changeText = (type) => {
    return (text) => {
      if (text) {
        if (codeList.length + 1 == type) {
          setCodeList((preList) => {
            return [...preList, text]
          })
          if (type == 1) {
            inputRef2.current.focus();
          } else if (type == 2) {
            inputRef3.current.focus();
          } else if (type == 3) {
            inputRef4.current.focus();
          }
        } else {
          setCodeList((preList) => {
            preList.splice(type - 1, 1, text)
            return [...preList]
          })
        }
      } else {
        if (codeList.length == type) {
          setCodeList((preList) => {
            preList.pop()
            return [...preList]
          })
          if (type == 2) {
            inputRef1.current.focus();
          } else if (type == 3) {
            inputRef2.current.focus();
          } else if (type == 4) {
            inputRef3.current.focus();
          }
        } else {
          setCodeList((preList) => {
            preList.splice(type - 1, 1, "")
            return [...preList]
          })
          if (type == 1) {
            inputRef1.current.focus();
          }
          if (type == 2) {
            inputRef2.current.focus();
          } else if (type == 3) {
            inputRef3.current.focus();
          } else if (type == 4) {
            inputRef4.current.focus();
          }
        }

      }
    }

  }
  const originCodeLogin = () => {
    confirmCodeLogin(codeList.join("")); //本质上这里还应该启动加载圈！防止用户继续进行什么操作！
  }
  const codeLogin = useThrottle(originCodeLogin, 5000); //delay设置大一些
  useEffect(() => {
    if (codeList.length === 4) {
      codeLogin();
    }
  }, [codeList])
  return (
    <View style={{ marginBottom: 50, alignItems: "center" }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TextInput value={codeList[0]} style={[styles.textInputStyle, activeNumber == 1 && styles.activeStyle]}
          onChangeText={changeText(1)}
          onFocus={() => {
            setActiveNumber(1)
          }}
          autoFocus={true}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          ref={inputRef1}
        />
        <TextInput value={codeList[1]} style={[styles.textInputStyle, activeNumber == 2 && styles.activeStyle]}
          onChangeText={changeText(2)}
          onFocus={() => {
            setActiveNumber(2)
          }}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          ref={inputRef2}
        />
        <TextInput value={codeList[2]} style={[styles.textInputStyle, activeNumber == 3 && styles.activeStyle]}
          onChangeText={changeText(3)}
          onFocus={() => {
            setActiveNumber(3)
          }}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          ref={inputRef3}
        />
        <TextInput value={codeList[3]} style={[styles.textInputStyle, activeNumber == 4 && styles.activeStyle]}
          onChangeText={changeText(4)}
          onFocus={() => {
            setActiveNumber(4)
          }}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          ref={inputRef4}
        />
      </View>
      {/*
    // TODO ：这个用input覆盖下面4个框的计划宣告破产，因为无法用样式控制文字间隔距离，
    // 但是如果我们不用input覆盖下面，我们又无法得知用户的删除事件，因为空文本框删除是不会触发onChangeText的！
    // 所以无法做到分格前删的功能，除非是输入满了才能做到！
    <TextInput value={inputValue}
      style={{
        backgroundColor: 'transparent',
        borderColor: "red",
        position: "relative",
        top: -50,
        borderWidth: 1,
        // color: 'white',
        width: "72%",
        zIndex: 1000, // 设置层级，确保TextInput在其他内容上方
        color: 'transparent'
      }}
    // autoFocus={true}
    // onChangeText={changeTextTransparent()}
    /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: "16%",
    marginRight: "2%",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16
  },
  activeStyle: {
    borderColor: "#0891b2",
  }
})