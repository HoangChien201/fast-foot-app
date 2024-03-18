import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { CURRENCY_VND } from '../../../contanst/FormatCurrency'

const SubTotalCart = () => {
    const cart_value=useSelector((state:RootState)=>state.cart.value)
    return (
        <View style={styles.subTotalContainer}>
            <Text style={styles.title}>Subtotal</Text>
            <Text style={styles.price}>{CURRENCY_VND(cart_value.total)}</Text>
        </View>
    )
}

export default SubTotalCart

const styles = StyleSheet.create({
    subTotalContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        height: 40,
        margin: 10,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    price: {

    },
})

function dispatch(arg0: any) {
    throw new Error('Function not implemented.')
}
