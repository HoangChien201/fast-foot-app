import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';

const Poster = () => {
  return (
    <Swiper style={styles.container} autoplayTimeout={2} autoplay={true}>
        <Image style={styles.image} source={require('../../assets/images/advertisement/poster-1.jpg')} />
        <Image style={styles.image} source={require('../../assets/images/advertisement/poster-3.jpg')} />
        <Image style={styles.image} source={require('../../assets/images/advertisement/poster-2.jpg')} />
    </Swiper>

  )
}

export default Poster;

const styles = StyleSheet.create({
  container: {
    height: 130,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,

  }
})