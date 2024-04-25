import { StyleSheet, Text, View, Image, Modal, TouchableOpacity,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import CalendarPicker, { CalendarPickerProps, MomentParsable } from 'react-native-calendar-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CartItem from './cart/CartItem';
import { userType } from '../store/userReducer';
import { getCartByUserHttp } from '../../http/CartHTTP';
import { cartItemType, cartResponeType } from '../store/modalAddCartReducer';

const ModalListCart = ({ isVisible, setVisible }: { isVisible: boolean, setVisible: any }) => {
    const user:userType=useSelector((state:RootState)=>state.user.value)
    const [cart,setCart]=useState<Array<cartItemType>>()
    async function getCart() {
        const respone= await getCartByUserHttp(user.id)
        setCart(respone.cart)
    }

    useEffect(()=>{
        getCart()
    },[])
    
    return (
        <Modal
            visible={isVisible}
            animationType='slide'

        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconBack} onPress={()=>setVisible(false)}>
                    <Image source={require('../../assets/images/icon/icon-back.png')} style={{ margin: 16 }} />
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <FlatList
                        data={cart}
                        renderItem={({item})=>{
                            return (
                                <CartItem data={item} onlyShow={true}/>
                            )
                        }}
                        keyExtractor={(item)=>item.product.id.toString()}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ModalListCart

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    iconBack: {
        width: 30,
        marginEnd:24
    }
})