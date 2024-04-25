import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { order_type } from '../../store/billDeliveryReducer'
import { Color } from '../../../contanst/color'

const InfomationOrder = ({ order }: { order: order_type }) => {
    return (
        <View>
            <View style={styles.informationShipmentContainer}>
                <View style={styles.shipmentWrapper}>
                    <Text style={styles.shipmentText}>Hóa đơn #</Text>
                    <Text style={styles.idText}>{order.id}</Text>
                </View>
            </View>

            <View style={styles.locationDeliveryContainer}>
                <View style={styles.addressWrapper}>
                    <Image
                        source={require('../../../assets/images/icon/icon-restaurant.png')}
                        style={styles.icon}
                        resizeMode='contain' />
                    <Text style={styles.address}>Fast Food Restaurant</Text>
                </View>

                <View style={styles.addressWrapper}>
                    <Image
                        source={require('../../../assets/images/icon/icon-location.png')}
                        style={styles.icon}
                        resizeMode='contain' />
                    <Text style={styles.address}>{order.address.replace('|','\n')}</Text>

                </View>
            </View>
        </View>
    )
}

export default InfomationOrder

const styles = StyleSheet.create({

    informationShipmentContainer: {
        height: 80,
        width: '100%',
        borderColor: '#000',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        justifyContent: "center"
    },
    shipmentWrapper: {
        alignItems: 'center'
    },
    shipmentText: {
        color: "#000",
        fontFamily: "Klarna Text",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "700",
    },
    idText: {
        color: "#6D3805",
        fontFamily: "Klarna Text",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "700",
    },
    locationDeliveryContainer: {},
    addressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    address: {
        color: Color.primary200,
        fontFamily: "Klarna Text",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "400",
        flex: 1
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10
    },
})