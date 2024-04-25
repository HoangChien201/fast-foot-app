import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../contanst/color'
import OrderShipperItem from '../../component/ui/shipper/OrderShipperItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../component/store/store'
import { getOrderTrackingDeliveringHTTP, getOrderTrackingWaitDeliveringHTTP } from '../../http/OrderTrackingHTTP'
import { useIsFocused } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import WaitDeliveringShipperComponent from '../../component/ui/shipper/WaitDeliveringShipperComponent'
import DeliveringShipperComponent from '../../component/ui/shipper/DeliveringShipperComponent'
import DeliveredShipperComponent from '../../component/ui/shipper/DeliveredShipperComponent'

const Stack=createMaterialTopTabNavigator()
const HomeShipperScreen = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      tabBarLabelStyle: {
          textTransform:'capitalize',
          fontWeight:'600',
          fontSize:14,
          color:Color.primary200
      },
      tabBarActiveTintColor:'red',
      
      
}}
    >
      <Stack.Screen 
        name='WaitDeliveringShipperComponent' 
        component={WaitDeliveringShipperComponent} 
        options={{
          title:'Unconfirm'
        }}
      />
      <Stack.Screen 
        name='DeliveringShipperComponent' 
        component={DeliveringShipperComponent} 
        options={{
          title:'Delivering'
        }}
      />
      <Stack.Screen 
        name='DeliveredShipperComponent' 
        component={DeliveredShipperComponent} 
        options={{
          title:'Done'
        }}
      />
    </Stack.Navigator>

  )
}

export default HomeShipperScreen

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor:"#fff",
    flex:1
  },
})
