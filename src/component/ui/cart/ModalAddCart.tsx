import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { SetStateAction, useRef, useState } from 'react'
import AddCartComponent from './AddCartComponent'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setDataAddCart } from '../../store/modalAddCartReducer'

interface ModalAddCartProp{
}

const ModalAddCart:React.FC<ModalAddCartProp> = () => {
    const value=useSelector((state:RootState)=>state.modalAddCart.value)
    const dispatch=useDispatch()

    const {visible,product_id}=value
    
    function hideModal(){
        dispatch(setDataAddCart({
            product_id:null,
            visible:false
        }))
    }
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <Pressable
                onPress={(event) => event.target == event.currentTarget && hideModal()}
                style={[styles.modal]}
            >
                <View style={styles.container}>
                    <AddCartComponent id={product_id} hideModal={hideModal}/>
                </View>
            </Pressable>
        </Modal>
    )
}

export default ModalAddCart

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        height: 600,
        width: '100%',
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,

    },
    modal: {
        flex: 1,
        
    }
})