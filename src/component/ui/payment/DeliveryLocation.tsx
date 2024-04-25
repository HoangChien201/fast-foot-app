import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'

import { Color } from '../../../contanst/color'
import { RootState } from '../../store/store'
import { getAddressByUser } from '../../../http/UserHTTP'
import { addressDeliveryType, addressType } from '../../store/userReducer'
import { AxiosResponse } from 'axios'
import { FormatAddressRecipient } from '../../../contanst/FormatAddress'
import { locationDeliveryType } from '../../store/locationDelireryReducer'

const DeliveryLocation = ({updateValuePayment}:{updateValuePayment:any}) => {
    const locationDelivery:locationDeliveryType|null=useSelector((state:RootState)=>state.locationDelivery.value)
    
    const user=useSelector((state:RootState)=>state.user.value)

    const navigation:NavigationProp<ReactNavigation.RootParamList>=useNavigation()

    function ChangeOnPress() {
        navigation.navigate('ManageAddressScreen')
    }
    
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <Text style={styles.title}>Delivery Address</Text>
                <TouchableOpacity onPress={ChangeOnPress}>
                    <Text style={styles.change}>Thay đổi</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.addressContainer}>
                <Image source={require('../../../assets/images/icon/icon-location.png')} style={styles.iconLocation} />
                <Text style={styles.address}>{
                    locationDelivery ?
                        FormatAddressRecipient(locationDelivery).replace('|','\n')
                            : ''
                }
                </Text>
            </View>
        </View>
    )
}

export default DeliveryLocation

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 103,
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        elevation:1
    },
    title: {
        color: Color.textBrown,
        fontWeight: 'bold',
        fontSize: 18
    },
    change: {
        fontSize: 14,
        color: Color.primary200,
        fontWeight: '400',
    },
    addressContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 15,
        alignItems:'center'
    },
    iconLocation: {
        width: 20,
        height: 30,
        marginEnd: 15
    },
    address: {
        color: Color.textBrown,
        fontSize: 14,
        fontWeight: "400",
        fontFamily: 'Klarna Text',
        flex:1
    }
})