import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../component/store/store'

import CartItem from '../../component/ui/cart/CartItem'
import ButtonIcon from '../../component/ui/ButtonIcon'
import { Color } from '../../contanst/color'
import ButtonCustom from '../../component/ui/ButtonCustom'
import { TotalPriceCart } from '../../contanst/Calculate'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { getCartHttp } from '../../http/CartHTTP'
import { setCart } from '../../component/store/cartReducer'


interface CartScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const dispatch=useDispatch()

  const listCart = useSelector((state: RootState) => state.cart.value)
  const listProduct = useSelector((state: RootState) => state.product.value)
  const optionDetail = useSelector((state: RootState) => state.optionDetail.value)
  const user=useSelector((state:RootState)=>state.user.value)

  useEffect(()=>{
    (async function getApiCartByClient(){
      if(user?.client?._id){
        const cartValue=await getCartHttp(user?.client?.cart)        
        dispatch(setCart(cartValue.cartItem))
      }
    })()
    
  },[])

  useLayoutEffect(()=>{
    navigation.setOptions({
      tabBarBadge: listCart.length, 
    })
  },[listCart])

  const CartUser = () => {

    function ToCheckOutOnPress() {
      navigation.navigate('PaymentScreen')
    }
    return (
      <View style={{ flex: 1 }}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={listCart}
            renderItem={(cartItem) => {
              return <CartItem data={cartItem.item} />

            }}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
          />
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0,backgroundColor:"#fff" }}>
          <View style={styles.subTotalContainer}>
            <Text style={styles.title}>Subtotal</Text>
            <Text style={styles.price}>${TotalPriceCart(listProduct,listCart,optionDetail).toFixed(2)}</Text>

          </View>
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
      <Text style={styles.heading}>My Cart</Text>
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
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    height: 40,
    margin: 10,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  price: {

  },
  imageBillEmpty: {
    height: '80%',
    width: '100%'
  }
})