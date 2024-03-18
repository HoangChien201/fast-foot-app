import { View, Text, StyleSheet, Pressable, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Animated, { runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useEvent, useSharedValue, withTiming } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { removeCart, changeQuantity, cartType, cartItemType } from '../../store/cartReducer'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../../contanst/color'
import ButtonIcon from '../ButtonIcon'
import { RootState } from '../../store/store'
import ShowOptionsDetail from './ShowOptionsDetail'
import { SumPriceOptionAProduct } from '../../../contanst/Calculate'
import { OptionIsSelectedType, OptionType } from '../../store/productReducer'
import { deleteCartItemHttp } from '../../../http/CartHTTP'
import CartItem from './CartItem'
const LIST_ITEM_HIGHT = 110

const CartItemAnimated = ({ data, onlyShow,simultaneousHandlers }: { data: cartItemType, onlyShow?: boolean }) => {
    const dispatch = useDispatch();
    //animated
    const translateX = useSharedValue(0)
    const itemHight = useSharedValue(LIST_ITEM_HIGHT)
    const opacity = useSharedValue(1);

    const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX
            if (translateX.value > 0) {
                translateX.value = 0
            }
        },
        onEnd: () => {
            if (translateX.value < -60) {
                translateX.value = -120
            }
            else if (translateX.value > -60) {
                translateX.value = 0
            }

        }
    })

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withTiming(translateX.value)
            }
        ]
    }))

    const rStyleCart = useAnimatedStyle(() => {
        return {
            height: 110,
            opacity: opacity.value
        }
    })

    function RemoveItemCart() {
        itemHight.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
                runOnJS(RemoveCart)()
            }
        })
        opacity.value = withTiming(0)
    }
    //
    async function RemoveCart() {
        const response=await deleteCartItemHttp(data.p_id,data.user_id)
        console.log(response);
        
        dispatch(removeCart(data.p_id))
    }

    return (
        <Animated.View style={[styles.container, rStyleCart]}>
            <View style={styles.buttonRemove}>
                <TouchableOpacity onPress={RemoveItemCart}>
                    <IconFontAwesome name='trash-o' size={40} color='#fff' />
                </TouchableOpacity>
            </View>
            <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGestureHandler}>
                <Animated.View style={rStyle}>
                    <CartItem data={data} />
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    )
}

export default CartItemAnimated;

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