import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import * as Progress from 'react-native-progress';

import { Color } from '../../contanst/color'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { NavigationProp, ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import CartItem from '../../component/ui/cart/CartItem'
import { billDeliveryResType, billDeliveryType, order_type } from '../../component/store/billDeliveryReducer'
import DeliveryStatusComponent from '../../component/ui/order-complete/DeliveryStatusComponent';
import { product } from '../../contanst/contanst';
import ProductItem from '../../component/ui/ProductItem';
import ShippingDetail from '../../component/ui/order-complete/ShippingDetail';
import OrderSummary from '../../component/ui/payment/OrderSummary';
import { getOrderHTTP } from '../../http/BillHTTP';
import { socket } from '../../helper/SocketHandle';
import { userType } from '../../component/store/userReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../component/store/store';
import { postLocalNotification } from '../../notifications/Events';
interface OrderCompleteScreenProp {
  navigation: NavigationProp<ParamListBase>
}
const OrderCompleteScreen: React.FC<OrderCompleteScreenProp> = ({ navigation }) => {
  const router: RouteProp<{ params: { bill_id: number } }, 'params'> = useRoute()
  const [valueBill, setValueBill] = useState<order_type>()
  const [isLoading, setIsLoading] = useState(true)

  const bill_id = router?.params?.bill_id

  

  useEffect(() => {
    (async function getBillDelivery() {
      const bill = await getOrderHTTP(bill_id);
      setValueBill(bill)
      setIsLoading(false)
    })()

  }, [bill_id])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackImage: () => <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}><Image source={require('../../assets/images/icon/icon-arrow-down.png')} /></TouchableOpacity>
    })
  }, [])

  function Product() {
    return (
      <View style={styles.productContainer}>
        <Text style={styles.title}>Product</Text>
        <FlatList
          data={product}
          renderItem={({ item }) => {
            return (
              <View style={styles.productItem}>
                <ProductItem product={item} type='row' />
              </View>
            )
          }}
        />
      </View>
    )
  }



  return (
    <ScrollView>
      <View style={styles.container}>
        <DeliveryStatusComponent bill_id={bill_id} />
        {/* <View style={styles.userContainer}>
          <View style={styles.flexRow}>
            <View style={styles.avatarContainer}>
              {
                valueBill &&
                <Image
                  source={{ uri: valueBill.staff.avatar }}
                  style={styles.avatar}
                  resizeMode='cover'
                />
              }

            </View>
            <Text style={styles.nameUser}>{valueBill && valueBill?.staff.fullname}</Text>
          </View>

          <TouchableOpacity style={styles.iconPhoneContainer}>
            <Image style={styles.iconPhone} source={require('../../assets/images/icon/telephone-call.png')} />
          </TouchableOpacity>
        </View> */}
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