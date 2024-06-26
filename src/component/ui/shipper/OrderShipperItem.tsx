import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { OrderTrackingType } from '../../../http/OrderTrackingHTTP'
import { Status } from '../../../contanst/FormatStatus'

const OrderShipperItem = ({ orderTracking }: { orderTracking:OrderTrackingType }) => {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    function onPress() {
        navigation.navigate('OrderShipperDetailScreen', {
            data: orderTracking.order.id
        })
    }
    return (
        <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress}>
            <View style={styles.container}>
                <View>

                    <View style={styles.flexRow}>
                        <View style={styles.shipmentContainer}>
                            <Text style={styles.title}>ID</Text>
                            <Text style={styles.shipmentNumber}>{orderTracking.order.id}</Text>
                        </View>
                        <View style={styles.statusOrderContainer}>
                            <Text style={styles.status}>{Status(orderTracking.status)}</Text>
                        </View>
                    </View>

                    <View style={styles.deliveryAddressContainer}>
                        <Text style={styles.title}>Delivery Address</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5,alignItems:'center' }}>
                            <Image
                                source={require('../../../assets/images/icon/icon-location.png')}
                                style={styles.iconLocation}
                                resizeMode='contain'
                            />
                            <Text style={styles.address}>{orderTracking.order.address.replace('|','\n')}</Text>
                        </View>

                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default OrderShipperItem

const styles = StyleSheet.create({
    pressed: {
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    container: {
        height: 200,
        width: '100%',
        backgroundColor: Color.primary300,
        elevation: 2,
        padding: 16,
        borderRadius: 15,
        marginVertical:10
    },
    shipmentNumber: {
        color: Color.primary200,
        fontSize: 18,
        fontWeight: '700'
    },
    title: {
        textTransform: 'uppercase',
        color: Color.primary500,
        fontSize: 12,
        marginVertical: 5,
        fontWeight: '400'
    },
    statusOrderContainer: {
        backgroundColor: Color.statusDone,
        minWidth: 50,
        height: 25,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10
    },
    status: {
        color: '#fff'
    },
    deliveryAddressContainer: {
        height: '60%',
        borderRadius: 15,
        paddingHorizontal: 10,
        backgroundColor: Color.primary350,
        marginTop: 10,
        elevation: 8,
        justifyContent:'center'

    },
    iconLocation: {
        width: 18,
        height: 18
    },
    address: {
        color: Color.primary500,
        fontSize: 14,
        fontWeight: '400',
        flex: 1
    },
})