import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const AddressUserConponent = () => {
  const user=useSelector((state:RootState)=>state.user.value)
  const address=user?.address
  
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={require('../../../assets/images/icon/icon-home.png')} style={styles.icon} />
      <View>
        <Text style={styles.type}>Home</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AddressUserConponent

const styles = StyleSheet.create({
  container: {
    height:55,
    flexDirection:'row',
    alignItems:"center",
    padding:5,
    marginVertical:10
  },
  icon: {
    width:35,
    height:35,
    marginEnd:10
  },
  type: {
    color:'#000',
    fontFamily:"poppins",
    fontSize:17,
    fontWeight:"700"
  },
  address: {
    color:'#B2B2B2',
    fontFamily:"poppins",
    fontSize:16,
    fontWeight:"400",
    width:300
  },
})