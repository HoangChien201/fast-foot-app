import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ALERT_TYPE,Toast } from 'react-native-alert-notification'

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
        title:"Fast food",
        body:"You have new order"
      })

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'FastFood',
        title: 'You have new order',
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