import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StaffItem from '../../component/ui/staff/StaffItem'

const StaffsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>StaffsScreen</Text>
      <StaffItem/>

    </View>
  )
}

export default StaffsScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:16,

  }
})