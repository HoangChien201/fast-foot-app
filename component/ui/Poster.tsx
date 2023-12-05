import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'

const Poster = ({image}:{image:any}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image}/>
    </View>
  )
}

export default Poster;

const styles=StyleSheet.create({
    container:{
        width:"100%",
        height:100,
        marginVertical:10
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:20,

    }
})