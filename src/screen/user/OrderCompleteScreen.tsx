import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import * as Progress from 'react-native-progress';

import { Color } from '../../contanst/color'
import { NavigationProp, ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import {  order_type } from '../../component/store/billDeliveryReducer'
import DeliveryStatusComponent from '../../component/ui/order-complete/DeliveryStatusComponent';
import ShippingDetail from '../../component/ui/order-complete/ShippingDetail';
import { getOneOrderHTTP } from '../../http/BillHTTP';
import { useSelector } from 'react-redux';
import { RootState } from '../../component/store/store';
interface OrderCompleteScreenProp {
  navigation: NavigationProp<ParamListBase>
}
const OrderCompleteScreen: React.FC<OrderCompleteScreenProp> = ({ navigation }) => {
  const [valueBill, setValueBill] = useState<order_type>()
  const [isLoading, setIsLoading] = useState(true)

  const orderTracking=useSelector((state:RootState)=>{return state.orderTracking.value})

  const {order_id}=orderTracking

  useEffect(() => {
    (async function getBillDelivery() {
      setIsLoading(true)
      const bill = await getOneOrderHTTP(order_id);
      setValueBill(bill)
      setIsLoading(false)
    })()

  }, [order_id])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackImage: () => <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}><Image source={require('../../assets/images/icon/icon-arrow-down.png')} /></TouchableOpacity>
    })
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <DeliveryStatusComponent order_id={order_id} />
        
        <ShippingDetail valueBill={valueBill} />
        {/* <OrderSummary /> */}
      </View>
    </ScrollView>
  )
}

export default OrderCompleteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  productContainer: {
    flex: 1
  },
  productItem: {
    height: 120,
    width: "100%",
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    color: "#000",
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: '700',
    marginVertical: 20
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20
  },
  nameUser: {
    color: "#000",
    fontSize: 20,
    fontWeight: 'bold'
  },
  iconPhoneContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Color.primary150
  },
  iconPhone: {
    width: '40%',
    height: '40%'
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 80,
    overflow: 'hidden',
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,

  },
})