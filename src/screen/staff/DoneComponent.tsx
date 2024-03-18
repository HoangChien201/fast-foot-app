import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { OrderTrackingType, getOrderTrackingDoneHTTP } from '../../http/OrderTrackingHTTP'
import OrderStaffItem from '../../component/ui/staff/OrderStaffItem'

const DoneComponent = ({orderStaffOnPressHandle}:{orderStaffOnPressHandle:any}) => {
  const [data,setData]=useState<Array<OrderTrackingType>>([])
  const isFocus=useIsFocused()
  async function getOrderTrackingDoneAPI() {
      const result:Array<OrderTrackingType>=await getOrderTrackingDoneHTTP()
      setData([...result])
  }

  //gọi api
  useEffect(()=>{
    getOrderTrackingDoneAPI()
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

export default DoneComponent

const styles = StyleSheet.create({})