import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RecentOrderItem from '../../../component/ui/profile/RecentOrderItem'

const RecentOrderScreen = () => {
  return (
    <View style={styles.container}>
      <RecentOrderItem/>
    </View>
  )
}

export default RecentOrderScreen

const styles = StyleSheet.create({
  container:{
    padding:16
  }
})