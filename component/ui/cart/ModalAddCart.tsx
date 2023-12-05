import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { SetStateAction, useRef, useState } from 'react'
import AddCartComponent from './AddCartComponent'

interface ModalAddCartProp{
    visible:string,
    setVisible: React.Dispatch<React.SetStateAction<string>>
}

const ModalAddCart:React.FC<ModalAddCartProp> = ({visible,setVisible}) => {
    const hideModal=()=>{
        setVisible('')
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!visible}
        >
            <Pressable
                onPress={(event) => event.target == event.currentTarget && setVisible('')}
                style={[styles.modal]}
            >
                <View style={styles.container}>
                    <AddCartComponent id={visible} hideModal={hideModal}/>
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