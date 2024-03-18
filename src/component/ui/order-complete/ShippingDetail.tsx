import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { billDeliveryResType, order_type } from '../../store/billDeliveryReducer'
import { formatLocation } from '../../../contanst/FormatAddress'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

const ShippingDetail = ({valueBill}:{valueBill:order_type | undefined}) => {
    const user=useSelector((state:RootState)=>state.user.value)
    const address=valueBill?.address
    function ShippingDetailRow({ label, content }: { label?: string, content?: string | number | null }) {
        return (
            <View style={styles.shippingRow}>
                <Text style={styles.lable}>{label}</Text>
                <Text style={[styles.lable, styles.content]}>{content}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shipping Detail</Text>
            <View>
                <ShippingDetailRow label='Date Shipping' content={valueBill && valueBill.timeOrder} />
                <ShippingDetailRow label='Shipper' content={user && user.fullname} />
                <ShippingDetailRow label='No. Resi' content={valueBill && valueBill.id} />
                <ShippingDetailRow label='Address' content={`${address}`} />

            </View>
        </View>
    )
}

export default ShippingDetail

const styles = StyleSheet.create({
    container: {
    },
    title: {
        color: "#000",
        fontSize: 18,
        letterSpacing: 0.5,
        fontWeight: '700',
        marginVertical: 20
    },
    shippingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical:10
    },
    lable: {
        fontSize: 16,
        fontFamily: 'poppins',
        letterSpacing: 0.5,
        color: '#BABFCE',
        fontWeight: '300'
    },
    content: {
        color: '#223263',
        fontWeight: '600',
        width:'50%',
        textAlign:'right'
    },
})