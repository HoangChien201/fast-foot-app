import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import UnConfirmComponent from './UnConfirmComponent'
import ConfirmComponent from './ConfirmedComponent'
import DoneComponent from './DoneComponent'
import { GetAOrderTrackingRequest } from '../../http/OrderTrackingHTTP'
import OrderStaffDetailComponent from './OrderStaffDetailComponent'
import DeliveringStaffComponent from './DeliveringStaffComponent'

const StaffScreen = ({ route }: { route: RouteProp<ParamListBase> }) => {
    const nameRoute = route.name
    const [orderTrackingActive,setOrderTrackingActive]=useState<GetAOrderTrackingRequest | null>(null)
    function ComponentMain() {
        switch (nameRoute) {
            case 'UnConfirmScreen':
                return <UnConfirmComponent orderStaffOnPressHandle={OrderStaffOnPressHandle}/>
            case 'ConfirmedScreen':
                return <ConfirmComponent orderStaffOnPressHandle={OrderStaffOnPressHandle}/>
            case 'DeliveringScreen':
                return <DeliveringStaffComponent orderStaffOnPressHandle={OrderStaffOnPressHandle}/>
            case 'DoneScreen':
                return <DoneComponent orderStaffOnPressHandle={OrderStaffOnPressHandle}/>
        }
    }

    function OrderStaffOnPressHandle(value:GetAOrderTrackingRequest){
        setOrderTrackingActive({
            order_id:value.order_id,
            user_id:value.user_id
        })
    }

    function CloseModal(){
        setOrderTrackingActive(null)
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={!!orderTrackingActive}
                animationType='fade'
            >
                {
                    orderTrackingActive &&
                    <OrderStaffDetailComponent orderTrackingActive={orderTrackingActive} close={CloseModal}/>
                }
            </Modal>
            <ComponentMain/>
        </View>
    )
}

export default StaffScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal:16
    }
})