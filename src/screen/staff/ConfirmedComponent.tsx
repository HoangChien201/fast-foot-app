import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { OrderTrackingType, getOrderTrackingConfirmedHTTP } from '../../http/OrderTrackingHTTP'
import { useIsFocused } from '@react-navigation/native'
import OrderStaffItem from '../../component/ui/staff/OrderStaffItem'

const ConfirmComponent = ({orderStaffOnPressHandle}:{orderStaffOnPressHandle:any}) => {
  const [data,setData]=useState<Array<OrderTrackingType>>([])
  const isFocus=useIsFocused()
  async function getOrderTrackingConfirmedAPI() {
      const result:Array<OrderTrackingType>=await getOrderTrackingConfirmedHTTP()
      setData([...result])
  }

  //gọi api
  useEffect(()=>{
    getOrderTrackingConfirmedAPI()
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

export default ConfirmComponent

const styles = StyleSheet.create({})