import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Color } from '../../../contanst/color'
import { TotalPriceCart } from '../../../contanst/Calculate'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { loadOptionDetail } from '../../store/optionDetailReducer'

type OrderSummaryType={
  subTotal:number,
  tax:number,
  deliveryPrice:number,
}

const OrderSummary = ({OnSubmit,updateValuePayment}:{OnSubmit:any,updateValuePayment:any}) => {

  const listCart=useSelector((state:RootState)=>state.cart.value)
  const listProduct = useSelector((state: RootState) => state.product.value)
  const optionDetail = useSelector((state: RootState) => state.optionDetail.value)

  function OrderSummaryComponent({ name, price }: { name: string, price: string }): JSX.Element {
    return (
      <View style={styles.orderSummaryComponent}>
        <Text style={styles.childrenOrderSummaryComponent}>{name}</Text>
        <Text style={styles.childrenOrderSummaryComponent}>{price}</Text>
      </View>
    )
  }

  const orderSummary:OrderSummaryType={
    subTotal:TotalPriceCart(listProduct,listCart,optionDetail),
    tax:3.00,
    deliveryPrice:5.00,
  }
  const total=orderSummary.subTotal + orderSummary.tax + orderSummary.deliveryPrice
  useEffect(()=>{
    updateValuePayment("summary",{...orderSummary,total:total.toFixed(2)})
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Sammery</Text>
      <View>
        <OrderSummaryComponent name='Subtotal' price={`$${orderSummary.subTotal.toFixed(2)}`} />
        <OrderSummaryComponent name='Tax' price={`$${orderSummary.tax.toFixed(2)}`} />
        <OrderSummaryComponent name='Delivery Price' price={`$${orderSummary.deliveryPrice.toFixed(2)}`} />
        <View style={styles.line}></View>

        <View style={styles.orderSummaryComponent}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.title}>${total.toFixed(2)}</Text>
        </View>

      </View>
      <TouchableOpacity style={styles.buttonSubmit} onPress={OnSubmit}>
          <Text style={styles.checkout}>Checkout - ${total.toFixed(2)}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default OrderSummary

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: Color.primary100,
    padding: 16,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(109, 56, 5, 0.11)',
    marginTop: 16
  },
  title: {
    color: Color.textBrown,
    fontWeight: 'bold',
    fontSize: 18
  },
  orderSummaryComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  childrenOrderSummaryComponent: {
    color: Color.textBrown,
    fontFamily: "Klarna Text",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
  buttonSubmit: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    backgroundColor: Color.primary200,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  checkout: {
    fontSize: 18,
    color: '#fff',
    marginStart: 10,
    fontWeight: 'bold'
  },
})