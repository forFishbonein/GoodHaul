import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';


export default function SlideShow({ navigation }) {

  return (

    <Swiper
      style={styles.swiper}
      height={200}
      horizontal={true}
      autoplay={true}
      loop={true}
      paginationStyle={{ bottom: 10 }}
      showsButtons={false}>
      <Image source={require('./images/image1.png')} style={styles.img} />
      <Image source={require('./images/image2.png')} style={styles.img} />
      <Image source={require('./images/image3.png')} style={styles.img} />
      <TouchableOpacity onPress={() => {
        navigation.navigate("AboutUs");
      }}>
        <Image source={require('./images/image4.png')} style={styles.img} />
      </TouchableOpacity>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  swiper: {
  },
  img: {
    width: Dimensions.get('window').width * 0.9,
    alignSelf: "center",
    height: 100,
    borderRadius: 10
  }
});