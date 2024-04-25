import { ScrollView, StyleSheet,View, Alert } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'


import DeliveryLocation from '../../component/ui/payment/DeliveryLocation'
import ExpectedTime from '../../component/ui/payment/ExpectedTime'
import OrderSummary from '../../component/ui/payment/OrderSummary'
import { Color } from '../../contanst/color'
import PaymentMethod from '../../component/ui/payment/PaymentMethod'
import SeeItem from '../../component/ui/payment/SeeItem'
import ModalListCart from '../../component/ui/ModalListCart'
import { RootState } from '../../component/store/store'
import { CreateOrderRequest} from '../../component/store/billDeliveryReducer'
import { addBillDeliveryHttp } from '../../http/BillHTTP'
import { locationDeliveryType } from '../../component/store/locationDelireryReducer'
import { FormatAddressRecipient } from '../../contanst/FormatAddress'
import PaymentCashHandle from '../../component/ui/payment/PaymentCashHandle'
import { PaymentZaloHandle } from '../../component/ui/payment/PaymentZaloHandle'
import { setOrderTracking } from '../../component/store/orderTrackingReducer'
import Loading from '../../component/ui/Loading'
import { clearCartReducer } from '../../component/store/cartReducer'
import { clearCartItemHttp } from '../../http/CartHTTP'

interface PaymentProp {
  navigation: NavigationProp<ParamListBase>
}
const PaymentScreen: React.FC<PaymentProp> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.value)
  const locationDelivery: locationDeliveryType | null = useSelector((state: RootState) => state.locationDelivery.value)


  const dispatch=useDispatch()
  const [isVisibleModalSeeItem, setIsVisibleModalSeeItem] = useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [valuePayment, setValuePayment] = useState({
    expectedTime: null,
    paymentMethod: null,
  })

  async function OnSubmit() {
    const {
      expectedTime,
      paymentMethod,
    } = { ...valuePayment }
    const deliveryLocation = locationDelivery ? FormatAddressRecipient(locationDelivery) : null

    if (!expectedTime || !paymentMethod || !deliveryLocation) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        textBody: 'Have the field empty',
        title: 'Warning',
        button: 'OK'
      })
      return
    }
    if (user) {
      const bill: CreateOrderRequest = {
        address: deliveryLocation,
        payment: false,
        methodPayment: paymentMethod,
        expectedTime: expectedTime,
        user: user?.id,
        charges:1000
      }

      try {
        const createOrder = await addBillDeliveryHttp(bill)

        if(!createOrder) return
        dispatch(setOrderTracking({
          order_id:createOrder.id
        }))

        //chuyển sang app khi chọn phương thức thanh toán momo
        if (createOrder.methodPayment === 'zalo') { 
          setIsLoading(true)
          PaymentZaloHandle(createOrder.total,createOrder.id,navigation)
          setTimeout(()=>{
            setIsLoading(false)
          },3000)

        } else {

          //thanh toán bằng tiền mặt -- chuyển sang màn hình theo giõi đơn
          PaymentCashHandle(createOrder.id,navigation)

        }
        clearCart()
      } catch (error) {
        Alert.alert("Lỗi", "" + error)
      }
    }
  }

  async function clearCart(){
    dispatch(clearCartReducer())
    await clearCartItemHttp(user?.id)
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
      <Loading isLoading={isLoading}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <DeliveryLocation updateValuePayment={updateValuePayment} />

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