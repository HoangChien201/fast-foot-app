import { View, Text, StyleSheet, Pressable, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect,useCallback } from 'react'
import Animated, { runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useEvent, useSharedValue, withTiming } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { removeCart, changeQuantity, cartType, cartItemType } from '../../store/modalAddCartReducer'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../../contanst/color'
import ButtonIcon from '../ButtonIcon'
import { RootState } from '../../store/store'
import ShowOptionsDetail from './ShowOptionsDetail'
import {SumPriceOptionAProduct} from '../../../contanst/Calculate'
import { OptionIsSelectedType, OptionType } from '../../store/productReducer'
import { deleteCartItemHttp } from '../../../http/CartHTTP'
const LIST_ITEM_HIGHT = 110

const OrderCartItem = ({ data }: { data: cartItemType }) => {

    
    const dispatch = useDispatch();
    const { _id, optionIsSelected, instruction, quantity,product }:cartItemType = { ...data }
    const { name, image, description, price } = { ...product }
    let totalPrice=0;

    // [['name',['option']]] -> {'name':['option']}
    
    let optionIsSelectedObj=Object.fromEntries(optionIsSelected as Array<any>) //chuyển đổi từ dạng array sang object
    
    if(price){
        const sumPriceOption = SumPriceOptionAProduct(optionIsSelectedObj as OptionIsSelectedType,optionDetails) 
        totalPrice=sumPriceOption + (parseInt(quantity.toString()) * parseFloat(price))
    }

    return (
        <View >
            <View style={[styles.container]}>
                    <View style={[styles.cartContainer]}>
                        <Image style={styles.image} source={{uri:image}} resizeMode='cover' />
                        <View style={{ paddingHorizontal: 10, width: '70%' }}>
                            <Text style={styles.name} ellipsizeMode='tail' numberOfLines={1}>{name}</Text>
                            <Text style={styles.detail} ellipsizeMode='tail' numberOfLines={2}>{description}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50 }}>
                                <Text style={styles.name}>${totalPrice.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
            </View>
        </View>

    )
}

export default OrderCartItem;

const styles = StyleSheet.create({
    cartItemPressed: {
        backgroundColor:'#ccc'
    },
    container: {
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: Color.primary400,
        height:100
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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