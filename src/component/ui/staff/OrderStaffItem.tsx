import { Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import ButtonImage from '../ButtonImage'
import { OrderTrackingType } from '../../../http/OrderTrackingHTTP'
import { Status } from '../../../contanst/FormatStatus'

const OrderStaffItem = ({ order_tracking,onPressItem }: { order_tracking: OrderTrackingType,onPressItem?:any }) => {
    const {status}={...order_tracking}

    const {
        fullname:fullnameReceicer ,
        id:user_id }= {...order_tracking.user}

    const {
        id:order_id , 
        address }= {...order_tracking.order}


    function onPress() {
        onPressItem({
            user_id:user_id,
            order_id:order_id
        })
    }
    return (
        <View style={styles.container}>
            <Pressable style={({pressed})=>pressed && onPressItem && styles.pressed} onPress={onPressItem && onPress}>
                <View>
                    <View style={styles.flexRow}>
                        <View style={styles.flexRow}>
                            <Text style={styles.shipmentNumber}>#{order_id}112123</Text>
                        </View>
                        <View style={styles.statusOrderContainer}>
                            <Text style={styles.status}>{Status(status)}</Text>
                        </View>
                    </View>

                    <ButtonImage source={require('../../../assets/images/icon/icon-user.png')} children={fullnameReceicer} style={{marginTop:5,justifyContent:'start'}}/>

                    <View style={styles.deliveryAddressContainer}>
                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/images/icon/icon-location.png')}
                                style={styles.iconLocation}
                                resizeMode='contain'
                            />
                            <Text style={styles.address}>{address.replace('|','\n')}</Text>
                        </View>

                    </View>
                </View>
            </Pressable>
        </View>
    )
}

export default OrderStaffItem

const styles = StyleSheet.create({
    pressed: {
        opacity:0.8
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    container: {
        minHeight: 130,
        width: '100%',
        backgroundColor: Color.primary300,
        elevation: 2,
        padding: 16,
        borderRadius: 15,
        marginBottom:10
    },
    shipmentNumber: {
        color: Color.primary200,
        fontSize: 18,
        fontWeight: '700',
        marginStart: 5
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
        minHeight: 50,
    },
    iconLocation: {
        width: 18,
        height: 18
    },
    address: {
        color: Color.primary500,
        fontSize: 14,
        fontWeight: '400',
        flex: 1,
        marginStart: 10
    },
})