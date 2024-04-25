import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAOrderTrackingRequest, OrderTrackingType, getOneOrderTrackingHTTP } from '../../http/OrderTrackingHTTP'
import OrderStaffItem from '../../component/ui/staff/OrderStaffItem';
import { OrderDetailType, getOrderDetailByOrderHTTP } from '../../http/BillHTTP';
import OrderCartItem from '../../component/ui/cart/OrderCartItem';
import OrderDetailItem from '../../component/ui/order-complete/OrderDetailItem';
import ButtonCustom from '../../component/ui/ButtonCustom';
import { Color } from '../../contanst/color';
import Loading from '../../component/ui/Loading';
import ConfirmStaffContainer from '../../component/ui/staff/ConfirmStaffContainer';

const OrderStaffDetailComponent = ({orderTrackingActive,close}:{orderTrackingActive:GetAOrderTrackingRequest,close:any }) => {
  const {user_id,order_id}={...orderTrackingActive}
  const [orderTracking,setOrderTracking]=useState<OrderTrackingType>()
  const [orderDetails,setOrderDetails]=useState<Array<OrderDetailType>>([])
  const [isLoading,setIsLoading]=useState(false)
  async function getOneOrderTrackingAPI() {
    setIsLoading(true)
      const responeOrderTracking=await getOneOrderTrackingHTTP(order_id)
      const responeOrderDetails= await getOrderDetailByOrderHTTP(order_id)
      setOrderDetails([...responeOrderDetails])
      setOrderTracking({...responeOrderTracking})
    setIsLoading(false)

  }
  console.log('orderStaffDetails','render');
  
  useEffect(()=>{
    getOneOrderTrackingAPI()
  },[])
  return (
    <View style={styles.container}>
        <Loading isLoading={isLoading}/>
        <TouchableOpacity style={styles.toolbar} onPress={close}>
          <Image source={require('../../assets/images/icon/icon-arrow-down.png')} />
        </TouchableOpacity>
        {
          orderTracking &&
          <OrderStaffItem order_tracking={orderTracking}/>
        }
        <FlatList
          data={orderDetails}
          renderItem={({item})=>{
            return (
              <OrderDetailItem item={item}/>
            )
          }}
        />
        {
          orderTracking && ![2,3,4].includes(orderTracking.status) &&
          <ConfirmStaffContainer order_id={orderTracking.order.id} closeModal={close}/>
        }
    </View>
  )
}

export default OrderStaffDetailComponent

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingBottom:60
  },
  toolbar:{
    height:50,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:"center"
  },
  
})