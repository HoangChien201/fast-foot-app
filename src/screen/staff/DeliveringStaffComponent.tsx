import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { OrderTrackingType, getOrderTrackingConfirmedHTTP, getOrderTrackingDeliveringHTTP } from '../../http/OrderTrackingHTTP'
import { useIsFocused } from '@react-navigation/native'
import OrderStaffItem from '../../component/ui/staff/OrderStaffItem'

const DeliveringStaffComponent = ({orderStaffOnPressHandle}:{orderStaffOnPressHandle:any}) => {
  const [data,setData]=useState<Array<OrderTrackingType>>([])
  const isFocus=useIsFocused()
  async function getOrderTrackingDeliveringAPI() {
      const result:Array<OrderTrackingType>=await getOrderTrackingDeliveringHTTP()
      setData([...result])
  }
  
  //gọi api
  useEffect(()=>{
    getOrderTrackingDeliveringAPI()
  },[isFocus])
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item})=>{
          return (
            <OrderStaffItem order_tracking={item} onPressItem={orderStaffOnPressHandle}/>
          )
        }}
        keyExtractor={item=>item.order.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default DeliveringStaffComponent

const styles = StyleSheet.create({})