import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderShipperItem from '../../component/ui/shipper/OrderShipperItem'
import { order_type } from '../../component/store/billDeliveryReducer'
import OrderStaffItem from '../../component/ui/staff/OrderStaffItem'
import { OrderTrackingType, getOrderTrackingUnConfirmHTTP } from '../../http/OrderTrackingHTTP'
import { useIsFocused } from '@react-navigation/native'
import { socket } from '../../helper/SocketHandle'
import { postLocalNotification } from '../../notifications/Events'


const UnConfirmComponent = ({orderStaffOnPressHandle}:{orderStaffOnPressHandle:any}) => {
  const [data,setData]=useState<Array<OrderTrackingType>>([])
  const isFocus=useIsFocused()
  async function getOrderTrackingUnConfirmAPI() {
      const result:Array<OrderTrackingType>=await getOrderTrackingUnConfirmHTTP()
      setData([...result])
  }

  //gọi api
  useEffect(()=>{
    getOrderTrackingUnConfirmAPI()
    socket.on('notification-staff',(notification)=>{
      getOrderTrackingUnConfirmAPI()
      postLocalNotification({
        title:"Đơn hàng mới",
        body:"Bạn có đơn hàng mới"
      })
    })
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

export default UnConfirmComponent

const styles = StyleSheet.create({})