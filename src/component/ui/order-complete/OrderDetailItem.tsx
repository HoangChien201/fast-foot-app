import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OrderDetailType } from '../../../http/BillHTTP'
import { Color } from '../../../contanst/color';

const OrderDetailItem = ({ item }: { item: OrderDetailType }) => {
    const product = item.product

    return (
        <View style={styles.container}>
            <View style={[styles.cartContainer]}>
                <Image style={styles.image} source={{ uri: product.image }} resizeMode='cover' />
                <View style={{ paddingHorizontal: 10, width: '70%' }}>
                    <Text style={styles.name} ellipsizeMode='tail' numberOfLines={2}>{product.name}</Text>
                    <Text style={styles.detail} ellipsizeMode='tail' numberOfLines={2}>{product.description}</Text>
                    <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50 }}>
                                <Text style={styles.name}>${totalPrice.toFixed(2)}</Text>
                            </View> */}
                </View>
            </View>
        </View>
    )
}

export default OrderDetailItem

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
        minHeight: 100,
        maxHeight:150
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
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
})