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
import { addBill, order_type } from '../../component/store/billDeliveryReducer'
import { clearCart } from '../../component/store/cartReducer'
import { addBillDeliveryHttp } from '../../http/BillHTTP'
import { getStaffShipperDeliveryHTTP } from '../../http/UserHTTP'
import { clearCartItemHttp } from '../../http/CartHTTP'
import axios from 'axios'
import { onPressPaymentMomo } from '../../contanst/PaymentMomoHandle'
import { socket } from '../../helper/SocketHandle'
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
    } = { ...valuePayment }

    if (!expectedTime || !paymentMethod || !listCart) {
      Alert.alert("Notification", "All field need to be entered")
      return
    }
    // const staffShipper = await getStaffShipperDeliveryHTTP();
    if (user?.id) {
      const bill: order_type = {
        address: 'deliveryLocation',
        payment: true,
        methodPayment: paymentMethod,
        expectedTime: expectedTime,
        user: user?.id,
      }

      const billDeliveryRes = await addBillDeliveryHttp(bill)

      // //chuyển sang app khi chọn phương thức thanh toán momo
      // if (billDeliveryRes?.methodPayment === 'momo') {
      //   const valuePaymentMomoApp = {
      //     merchantname: 'FastFood',
      //     merchantcode: 'FF01', //Tên đối tác
      //     merchantNameLabel: 'Thanh toán hóa đơn', //Label để hiển thị tên đối tác trên app MoMo
      //     amount: 20000, //giá
      //     enviroment: '0', //"0"?: SANBOX , "1"?: PRODUCTION
      //     action: 'gettoken', //Giá trị là gettoken. KHÔNG THAY ĐỔI
      //     partner: 'merchant', //Giá trị là merchant. KHÔNG THAY ĐỔI
      //     description: 'Thanh toán đồ ăn', //Mô tả chi tiết
      //     appScheme: 'momocgv20170101', //Partner Scheme Id được cung cấp bởi MoMo - 
      //   }
      //   onPressPaymentMomo(valuePaymentMomoApp)

      // }

      socket.emit('notification',{
        to:'staff',
        content:'Đặt hàng'
      })

      navigation.navigate("OrderCompleteScreen", {
        bill_id: billDeliveryRes.id
      })
      Alert.alert("Notification", "Payment Success")
    }



    distpatch(clearCart())
    clearCartItemHttp(user?.id)


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