import { View, Text, StyleSheet, Pressable, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect,useCallback } from 'react'
import Animated, { runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useEvent, useSharedValue, withTiming } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { removeCart, changeQuantity, cartType, cartItemType } from '../../store/cartReducer'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../../contanst/color'
import ButtonIcon from '../ButtonIcon'
import { RootState } from '../../store/store'
import ShowOptionsDetail from './ShowOptionsDetail'
import {SumPriceOptionAProduct} from '../../../contanst/Calculate'
import { OptionIsSelectedType, OptionType } from '../../store/productReducer'
import { deleteCartItemHttp } from '../../../http/CartHTTP'
const LIST_ITEM_HIGHT = 110

const CartItem = ({ data,onlyShow }: { data: cartItemType,onlyShow?:boolean }) => {
    const listProduct = useSelector((state: RootState) => state.product.value)
    const optionDetails = useSelector((state: RootState) => state.optionDetail.value)

    const [isShowOption,setIsShowOption]=useState(false)
    
    const dispatch = useDispatch();
    const { _id, optionIsSelected, instruction, quantity,product:idProduct }:cartItemType = { ...data }
    const product = listProduct.find(item => item._id === idProduct)
    const { name, image, description, price } = { ...product }
    let totalPrice=0;

    // [['name',['option']]] -> {'name':['option']}
    
    let optionIsSelectedObj=Object.fromEntries(optionIsSelected as Array<any>) //chuyển đổi từ dạng array sang object
    
    if(price){
        const sumPriceOption = SumPriceOptionAProduct(optionIsSelectedObj as OptionIsSelectedType,optionDetails) 
        totalPrice=sumPriceOption + (parseInt(quantity.toString()) * parseFloat(price))
    }

    function IncreaseQuantity() {
        dispatch(changeQuantity({
            id: _id,
            quantity: parseInt(quantity.toString()) + 1
        }))
    }
    function DecreaseQuantity() {
        dispatch(changeQuantity({
            id: _id,
            quantity: parseInt(quantity.toString()) - 1
        }))
    }

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

    function OnChangeTextQuantity(text: string) {
        dispatch(changeQuantity({
            id: _id,
            quantity: text
        }))
    }

    async function RemoveCart() {
        await deleteCartItemHttp(_id)
        dispatch(removeCart(_id))
    }

    return (
        <Pressable 
            onPress={()=>setIsShowOption(prevSelect => prevSelect ? false : true)}>
            <Animated.View style={[styles.container, rStyleCart]}>
                <View style={styles.buttonRemove}>
                    <TouchableOpacity onPress={RemoveItemCart}>
                        <IconFontAwesome name='trash-o' size={40} color='#fff' />
                    </TouchableOpacity>
                </View>
                <PanGestureHandler onGestureEvent={panGestureHandler}>
                    <Animated.View style={[styles.cartContainer, rStyle]}>
                        <Image style={styles.image} source={{uri:image}} resizeMode='cover' />
                        <View style={{ paddingHorizontal: 10, width: '70%' }}>
                            <Text style={styles.name} ellipsizeMode='tail' numberOfLines={1}>{name}</Text>
                            <Text style={styles.detail} ellipsizeMode='tail' numberOfLines={2}>{description}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50 }}>
                                <Text style={styles.name}>${totalPrice.toFixed(2)}</Text>
                                <View style={styles.quantityContainer}>
                                {/* xử lý trường hợp hiện thị xem danh sanh bên hóa đón */}
                                    {
                                        !onlyShow &&
                                        <ButtonIcon name='minuscircleo' size={20} color={parseInt(quantity.toString()) === 0 ? Color.primary400 : Color.primary200} onPress={quantity === 0 ? null! : DecreaseQuantity} />

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
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
            {
                isShowOption && 
                <ShowOptionsDetail options={optionIsSelectedObj as Array<OptionType>} instructions={instruction}/>
            }
        </Pressable>

    )
}

export default CartItem;

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