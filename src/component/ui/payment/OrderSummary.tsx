import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../../contanst/color'
import { TotalPriceCart } from '../../../contanst/Calculate'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { loadOptionDetail } from '../../store/optionDetailReducer'
import { CURRENCY_VND } from '../../../contanst/FormatCurrency'
import { cartItemType, cartsRespone } from '../../store/modalAddCartReducer'
import { getCartByUserHttp } from '../../../http/CartHTTP'

type OrderSummaryType = {
  subTotal: number,
  deliveryPrice: number,
}

const OrderSummary = ({ OnSubmit, updateValuePayment }: { OnSubmit?: any, updateValuePayment?: any }) => {

  const [subTotal, setSubtotal] = useState<number>(0)
  const listProduct = useSelector((state: RootState) => state.product.value)
  const user = useSelector((state: RootState) => state.user.value)

  async function getApiCartByClient() {
    if (user) {
      try {
        const result: cartsRespone = await getCartByUserHttp(user.id)
        setSubtotal(parseInt(result.total))
      } catch (error) {
        console.log("lỗi giỏ hàng paytment");
        
      }

    }
  }
  useEffect(() => {
    getApiCartByClient()

  }, [])

  function OrderSummaryComponent({ name, price }: { name: string, price: string }): JSX.Element {
    return (
      <View style={styles.orderSummaryComponent}>
        <Text style={styles.childrenOrderSummaryComponent}>{name}</Text>
        <Text style={[styles.childrenOrderSummaryComponent]}>{price}</Text>
      </View>
    )
  }

  const orderSummary: OrderSummaryType = {
    subTotal: subTotal,
    deliveryPrice: 1000,
  }
  const total = orderSummary.subTotal+ orderSummary.deliveryPrice

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tóm tắt đơn hàng</Text>
      <View>
        <OrderSummaryComponent name='Subtotal'
          price={`${CURRENCY_VND(orderSummary.subTotal)}`} />
        <OrderSummaryComponent name='Charges' price={`${CURRENCY_VND(orderSummary.deliveryPrice)}`} />
        <View style={styles.line}></View>

        <View style={styles.orderSummaryComponent}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.title}>{CURRENCY_VND(total)}</Text>
        </View>

      </View>
      {
        OnSubmit &&
        <TouchableOpacity style={styles.buttonSubmit} onPress={OnSubmit}>
          <Text style={styles.checkout}>Checkout - {CURRENCY_VND(total)}</Text>
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