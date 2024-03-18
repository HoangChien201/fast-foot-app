import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Color } from '../../../contanst/color'
import { TotalPriceCart } from '../../../contanst/Calculate'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { loadOptionDetail } from '../../store/optionDetailReducer'
import { CURRENCY_VND } from '../../../contanst/FormatCurrency'

type OrderSummaryType = {
  subTotal: number,
  tax: number,
  deliveryPrice: number,
}

const OrderSummary = ({ OnSubmit, updateValuePayment }: { OnSubmit?: any, updateValuePayment?: any }) => {

  const cart = useSelector((state: RootState) => state.cart.value)
  const listProduct = useSelector((state: RootState) => state.product.value)
  const optionDetail = useSelector((state: RootState) => state.optionDetail.value)

  function OrderSummaryComponent({ name, price }: { name: string, price: string }): JSX.Element {
    return (
      <View style={styles.orderSummaryComponent}>
        <Text style={styles.childrenOrderSummaryComponent}>{name}</Text>
        <Text style={[styles.childrenOrderSummaryComponent]}>{price}</Text>
      </View>
    )
  }

  const orderSummary: OrderSummaryType = {
    subTotal: cart.total,
    tax: 10000,
    deliveryPrice: 15000,
  }
  const total = orderSummary.subTotal + orderSummary.tax + orderSummary.deliveryPrice

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tóm tắt đơn hàng</Text>
      <View>
        <OrderSummaryComponent name='Tổng tiền' 
        price={`${CURRENCY_VND(orderSummary.subTotal)}`} />
        <OrderSummaryComponent name='Thuế' price={`${CURRENCY_VND(orderSummary.tax)}`} />
        <OrderSummaryComponent name='Phí giao hàng' price={`${CURRENCY_VND(orderSummary.deliveryPrice)}`} />
        <View style={styles.line}></View>

        <View style={styles.orderSummaryComponent}>
          <Text style={styles.title}>Thành tiền</Text>
          <Text style={styles.title}>{CURRENCY_VND(total)}</Text>
        </View>

      </View>
      {/* <View>
        <OrderSummaryComponent name='Subtotal' price={`123.000đ`} />
        <OrderSummaryComponent name='Tax' price={`10.000đ`} />
        <OrderSummaryComponent name='Delivery Price' price={`30.000đ`} />
        <View style={styles.line}></View>

        <View style={styles.orderSummaryComponent}>
          <Text style={styles.title}>Total</Text>
          <Text style={[styles.title,{color:Color.primary200}]}>${`143.000đ`}</Text>
        </View>

      </View> */}
      {
        OnSubmit &&
        <TouchableOpacity style={styles.buttonSubmit} onPress={OnSubmit}>
          <Text style={styles.checkout}>Checkout - ${total.toFixed(3)}</Text>
        </TouchableOpacity>

      }
    </View>
  )
}

export default OrderSummary

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
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
    fontSize: 16,
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