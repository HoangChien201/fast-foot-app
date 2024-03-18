import { StyleSheet, Text, View, Image, Modal, TouchableOpacity,FlatList } from 'react-native'
import React, { useState } from 'react'

import CalendarPicker, { CalendarPickerProps, MomentParsable } from 'react-native-calendar-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CartItem from './cart/CartItem';

const ModalListCart = ({ isVisible, setVisible }: { isVisible: boolean, setVisible: any }) => {
    const listCart = useSelector((state: RootState) => state.cart.value)

    return (
        <Modal
            visible={isVisible}
            animationType='slide'

        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconBack} onPress={()=>setVisible(false)}>
                    <Image source={require('../../assets/images/icon/icon-back.png')} style={{ margin: 16 }} />
                </TouchableOpacity>
                <View>
                    <FlatList
                        data={listCart}
                        renderItem={({item})=>{
                            return (
                                <CartItem data={item} onlyShow={true}/>
                            )
                        }}
                        keyExtractor={(item)=>item._id}
                        scrollEnabled={false}
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