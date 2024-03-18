import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { RootState } from '../../component/store/store'

import CartItem from '../../component/ui/cart/CartItem'
import ButtonIcon from '../../component/ui/ButtonIcon'
import { Color } from '../../contanst/color'
import ButtonCustom from '../../component/ui/ButtonCustom'
import { TotalPriceCart } from '../../contanst/Calculate'
import { NavigationProp, ParamListBase, useIsFocused } from '@react-navigation/native'
import { getCartByUserHttp } from '../../http/CartHTTP'
import { cartResponeType, setCart } from '../../component/store/cartReducer'
import CartItemAnimated from '../../component/ui/cart/CartItemAnimated'
import SubTotalCart from '../../component/ui/cart/SubTotalCart'


interface CartScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const listCart = useSelector((state: RootState) => state.cart.value.cart)
  const user = useSelector((state: RootState) => state.user.value)


  useEffect(() => {
    (async function getApiCartByClient() {
      if (user) {
        const result: cartResponeType = await getCartByUserHttp(user.id)
        dispatch(setCart(result))
        console.log('getAPi');

      }
    })()

  }, [isFocused])
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarBadge: listCart.length,
    })
  }, [listCart])

  const CartUser = () => {

    function ToCheckOutOnPress() {
      navigation.navigate('PaymentScreen')
    }
    const scrollRef=useRef(null)
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={listCart}
          renderItem={({ item }) => {
            return (
              <View style={{marginVertical:10}}>
                <CartItemAnimated simultaneousHandlers={scrollRef} data={item} />
              </View>
            )
          }}
          keyExtractor={(item) => item.p_id ? item.p_id.toString() : item.product_id.toString()}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
        />
        <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: "#fff" }}>
          <SubTotalCart />
          <View style={styles.button}>
            <ButtonCustom textColor='#fff' onPress={ToCheckOutOnPress}>Procced to Checkout</ButtonCustom>
          </View>
        </View>
      </View>
    )
  }

  function CartUserEmpty() {
    return (
      <View>
        <Image source={require('../../assets/images/bill-empty.jpg')} style={styles.imageBillEmpty} />
        <Text style={{ textAlign: 'center', marginTop: 20 }}>There is not on going order right now.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Giỏ Hàng</Text>
      {
        listCart.length === 0 ? <CartUserEmpty /> : <CartUser />
      }


    </View>
  )
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',

  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10
  },
  itemCart: {
    height: 110,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: Color.primary400,
    borderRadius: 20
  },
  button: {
    borderRadius: 30,
    backgroundColor: Color.primary200,
    height: 50,
    overflow: 'hidden',
    marginBottom: 10
  },

  imageBillEmpty: {
    height: '80%',
    width: '100%'
  }
})