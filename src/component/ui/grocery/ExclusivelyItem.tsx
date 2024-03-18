import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ExclusivelyItem = ({title,backgroundColor}:{title:string,backgroundColor:string}) => {
  return (
    <View style={[styles.container,{backgroundColor:backgroundColor}]}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </View>
  )
}

export default ExclusivelyItem

const styles = StyleSheet.create({
    container:{
        height:80,
        width:140,
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        marginRight:10
    },
    title:{
        fontSize:20,
        fontFamily:'poppin',
        color:"#fff",
        fontWeight:'bold',
        textAlign:'center'
    }
})