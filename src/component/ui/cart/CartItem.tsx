import { View, Text, StyleSheet, Pressable, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Animated, { runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useEvent, useSharedValue, withTiming } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { removeCart, changeQuantity, cartType, cartItemType, cartResponeType, setCart, cartItemUpdateType } from '../../store/cartReducer'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../../contanst/color'
import ButtonIcon from '../ButtonIcon'
import { RootState } from '../../store/store'
import ShowOptionsDetail from './ShowOptionsDetail'
import { SumPriceOptionAProduct } from '../../../contanst/Calculate'
import { OptionIsSelectedType, OptionType } from '../../store/productReducer'
import { deleteCartItemHttp, getCartByUserHttp, updateCartItemHttp } from '../../../http/CartHTTP'
import { CURRENCY_VND } from '../../../contanst/FormatCurrency'
const LIST_ITEM_HIGHT = 110

const CartItem = ({ data, onlyShow }: { data: cartItemType, onlyShow?: boolean }) => {
    const dispatch = useDispatch();
    const user=useSelector((state:RootState)=>state.user.value)

    async function getApiCartByClient(){
        if(user){
          const result:cartResponeType=await getCartByUserHttp(user.id)        
          dispatch(setCart(result))
          console.log('getAPi');
          
        }
    }
    async function updateApiCartByClient(value_change:cartItemUpdateType){
        if(user){
          const result=await updateCartItemHttp(p_id,user_id,value_change)        
        }
    }

    const { user_id, instruction, quantity,
        p_id,
        p_name,
        p_price,
        p_image,
        p_description,
        p_quantity,
        p_categoryId,
        total, }: cartItemType = { ...data }

    async function IncreaseQuantity() {
        dispatch(changeQuantity({
            id: p_id,
            quantity: parseInt(quantity.toString()) + 1
        }))
        await updateApiCartByClient({quantity:parseInt(quantity.toString()) + 1})
        await getApiCartByClient()
    }
    async function DecreaseQuantity() {
        if (quantity > 0) {
            dispatch(changeQuantity({
                id: p_id,
                quantity: parseInt(quantity.toString()) - 1
            }))
            await updateApiCartByClient({quantity:parseInt(quantity.toString()) - 1})
        }
        await getApiCartByClient()
    }

    async function OnChangeTextQuantity(text: string) {
        dispatch(changeQuantity({
            id: p_id,
            quantity: text
        }))
        if(isNaN(parseInt(text))){
            await updateApiCartByClient({quantity:parseInt(text)})
            await getApiCartByClient()
        }
        else{
            Alert.alert("Thông báo","Tham số không phải là số")
        }

    }
    return (

        <View style={[styles.cartContainer]}>
            <Image style={styles.image} source={{ uri: p_image }} resizeMode='cover' />
            <View style={{ paddingHorizontal: 10, width: '70%' }}>
                <Text style={styles.name} ellipsizeMode='tail' numberOfLines={1}>{p_name}</Text>
                <Text style={styles.detail} ellipsizeMode='tail' numberOfLines={2}>{p_description}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50 }}>
                    <Text style={styles.name}>{CURRENCY_VND(p_price)}</Text>
                    <View style={styles.quantityContainer}>
                        {/* xử lý trường hợp hiện thị xem danh sanh bên hóa đón */}
                        {
                            !onlyShow &&
                            <ButtonIcon name='minuscircleo' size={20} color={parseInt(quantity.toString()) === 0 ? Color.primary400 : Color.primary200} onPress={DecreaseQuantity} />

                        }
                        <TextInput value={quantity.toString()} style={styles.inputQuantity} keyboardType='numeric' onChangeText={OnChangeTextQuantity} />

                        {/* xử lý trường hợp hiện thị xem danh sanh bên hóa đón */}
                        {
                            !onlyShow &&
                            <ButtonIcon name='pluscircleo' size={20} color={Color.primary200} onPress={IncreaseQuantity} />
                        }
                    </View>
                </View>
            </View>
        </View>


    )
}

export default CartItem;

const styles = StyleSheet.create({
    cartItemPressed: {
        backgroundColor: '#ccc'
    },
    container: {
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: Color.primary400,
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 110,
        backgroundColor: '#fff'
    },
    image: {
        width: '28%',
        height: '85%',
        borderRadius: 15,
        margin: '1%'
    },
    name: {
        color: '#000',
        fontWeight: 'bold',
        width: '60%',
        fontSize: 18,
        marginVertical: 2,

    },
    detail: {
        fontSize: 12
    },
    add: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50,

    },
    quantityContainer: {
        flexDirection: 'row',
        height: '100%',
        justifyContent: "center",
        alignItems: 'center'

    },
    inputQuantity: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 50
    },
    buttonRemove: {
        backgroundColor: 'red',
        position: 'absolute',
        right: 10,
        height: '80%',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    }
})