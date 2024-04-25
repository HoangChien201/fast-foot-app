import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { OrderTrackingType, getOrderTrackingWaitDeliveringHTTP } from '../../../http/OrderTrackingHTTP'
import OrderShipperItem from './OrderShipperItem'
import { socket } from '../../../helper/SocketHandle'
import { userType } from '../../store/userReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

const WaitDeliveringShipperComponent = () => {
  const user:userType|null=useSelector((state:RootState)=>state.user.value)
  const [valueBill,setValueBill]=useState<Array<OrderTrackingType>>()
  const isFocus=useIsFocused()

  async function getBillAPI() {
    const resultBill=await getOrderTrackingWaitDeliveringHTTP();
    setValueBill(resultBill)
  }
  useEffect(()=>{
    getBillAPI()
  },[isFocus])

  useEffect(()=>{
    socket.on(`notification-shipper`,(noti)=>{
      getBillAPI()
      Toast.show({
        type: ALERT_TYPE.INFO,
          title: 'New order',
          textBody: 'You have a new order',
      })
    })
  },[])

  
  return (
    <View style={styles.container}>
      {
          valueBill && 
          <FlatList
            data={valueBill}
            renderItem={({item})=>{
              return (
                  <OrderShipperItem orderTracking={item}/>
              )
            }}
            keyExtractor={item=>item.order.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        }
    </View>
  )
}

export default WaitDeliveringShipperComponent

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor:"#fff",
    flex:1
  },
})