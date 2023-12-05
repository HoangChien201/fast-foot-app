import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import DeliveryLocation from '../../component/ui/payment/DeliveryLocation'
import ExpectedTime from '../../component/ui/payment/ExpectedTime'
import OrderSummary from '../../component/ui/payment/OrderSummary'
import { Color } from '../../contanst/color'
import PaymentMethod from '../../component/ui/payment/PaymentMethod'
import SeeItem from '../../component/ui/payment/SeeItem'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import ModalListCart from '../../component/ui/ModalListCart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../component/store/store'
import { addBill, billDeliveryType } from '../../component/store/billDeliveryReducer'
import { clearCart } from '../../component/store/cartReducer'
import { addBillDeliveryHttp } from '../../http/BillHTTP'
import { getStaffShipperDeliveryHTTP } from '../../http/UserHTTP'
import { FormatAddress } from '../../contanst/FormatAddress'
import { clearCartItemHttp } from '../../http/CartHTTP'
interface PaymentProp {
  navigation: NavigationProp<ParamListBase>
}
const PaymentScreen: React.FC<PaymentProp> = ({ navigation }) => {
  const listCart = useSelector((state: RootState) => state.cart.value)
  const user = useSelector((state: RootState) => state.user.value)
  const distpatch = useDispatch()

  const [isVisibleModalSeeItem, setIsVisibleModalSeeItem] = useState(false)
  const [valuePayment, setValuePayment] = useState({
    deliveryLocation: null,
    expectedTime: null,
    paymentMethod: null,
    summary: null,
    listCart: listCart,
    timeOrder: '',
    id: ''
  })

  
  async function OnSubmit() {
    const {
      deliveryLocation,
      expectedTime,
      paymentMethod,
      summary,
      listCart } = { ...valuePayment }
      
    if (!deliveryLocation || !expectedTime || !paymentMethod || !summary || !listCart) {
      Alert.alert("Notification", "All field need to be entered")
      return
    }

    valuePayment.timeOrder = new Date().toISOString()

    const staffShipper=await getStaffShipperDeliveryHTTP();
    const bill: billDeliveryType = {
      dateExpected: expectedTime,
      deliveryLocation: deliveryLocation,
      cart: listCart,
      timeOrder: new Date().toISOString(),
      staff: staffShipper[0],
      payment: 'paid',
      methodPayment: 'card',
      expectedTime: expectedTime,
      client: user?.client?._id,
      summary:summary
    }    

    
    const billDeliveryRes = await addBillDeliveryHttp(bill)
    Alert.alert("Notification","Payment Success")
    
    distpatch(clearCart())
    clearCartItemHttp(user?.client?.cart)
    navigation.navigate("OrderDetailScreen", {
      idBill: billDeliveryRes._id
    })


  }

  function updateValuePayment(type: string, value: any) {
    setValuePayment(prevValuePayment => {
      return { ...prevValuePayment, [type]: value }
    })
  }
  function SeeItemOnPress() {
    setIsVisibleModalSeeItem(true)
  }
  
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <DeliveryLocation updateValuePayment={updateValuePayment} valueAddressDelivery={valuePayment.deliveryLocation} />

        <ExpectedTime updateValuePayment={updateValuePayment} />

        <SeeItem onPress={SeeItemOnPress} />

        <PaymentMethod updateValuePayment={updateValuePayment} />

        <OrderSummary OnSubmit={OnSubmit} updateValuePayment={updateValuePayment} />


      </ScrollView>
      <ModalListCart isVisible={isVisibleModalSeeItem} setVisible={setIsVisibleModalSeeItem} />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1
  },
  title: {
    color: Color.textBrown,
    fontWeight: 'bold',
    fontSize: 18
  },

})