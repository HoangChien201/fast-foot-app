import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { Color } from '../../contanst/color'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import CartItem from '../../component/ui/cart/CartItem'
import { billDeliveryType } from '../../component/store/billDeliveryReducer'
const OrderCompleteScreen = () => {
  const [isShowDetail, setIsShowDetail] = useState(false)
  const router:RouteProp<{ params: { value: billDeliveryType } }, 'params'>=useRoute()
  const valuePayment=router?.params?.value
  function OrderSummary() {
    return (
      <View style={styles.orderSummary}>
        <Text style={styles.title}>Order Summary</Text>
        <FlatList
          data={valuePayment.listCart}
          renderItem={
            ({item})=>{
              return <CartItem data={item} onlyShow/>
            }
          }
          keyExtractor={(item)=>item.id}
          
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }} >
        <View style={styles.headingContainer}>
          <Image source={require('../../assets/images/icon/icon-order-complete.png')} style={{ width: 60, height: 60 }} />
          <Text>Order Complete</Text>
        </View>
      </View>
      <View style={styles.orderDetailContainer}>
        <Text style={styles.title}>Active Order</Text>
        <View>
          <Text style={styles.orderID}>Order ID: {valuePayment.id}</Text>
          <Text style={styles.time}>{valuePayment.timeOrder}</Text>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <IconEntypo name='location-pin' size={24} color='#000' />
            <Text style={styles.address}>Địa chỉ giao</Text>
          </View>
        </View>
        <View style={styles.orderDetail}>
          {
            isShowDetail &&
            <OrderSummary />

          }
          <TouchableOpacity style={styles.iconArrowDown} onPress={()=>{setIsShowDetail(isShowDetail ? false : true)}}>
            <IconEntypo name={!isShowDetail ? 'chevron-thin-down' : 'chevron-thin-up'} size={24} color={Color.primary500} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default OrderCompleteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  headingContainer: {
    backgroundColor: Color.greenComplete,
    width: 200,
    height: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderDetailContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: 'bold',
  },
  orderID: {
    fontSize: 16,
    color: "#000"
  },
  time: {
    fontSize: 13,
    color: Color.primary400
  },
  address: {
    fontSize: 16,
    color: "#000"
  },
  iconArrowDown: {
    width: 100,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: "center",
    alignItems: 'center'

  },
  orderDetail: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 16
  },
  orderSummary:{
    flex:1,
    width:'100%'
  }
})