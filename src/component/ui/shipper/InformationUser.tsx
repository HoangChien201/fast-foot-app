import { StyleSheet, Text, View,Image,TouchableOpacity,Linking } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color'
import { billDeliveryResType } from '../../store/billDeliveryReducer'

const InformationUser = ({bill}:{bill:billDeliveryResType}) => {
    function callPhoneHandle(){
        Linking.openURL(`tel:${bill.deliveryLocation.phone}`)
    }   
    return (
        <View style={styles.userContainer}>
            <View style={styles.flexRow}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{uri:bill.client.avatar}}
                        style={styles.avatar}
                    />
                </View>
                <Text style={styles.nameUser}>{bill.deliveryLocation.nameRecipient}</Text>
            </View>

            <TouchableOpacity style={styles.iconPhoneContainer} onPress={callPhoneHandle}>
                <Image style={styles.iconPhone} source={require('../../../assets/images/icon/telephone-call.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default InformationUser

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width:'100%',
        paddingHorizontal:24
    },
    nameUser: {
        color: "#000",
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconPhoneContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Color.primary150
    },
    iconPhone: {
        width: '40%',
        height: '40%'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 80,
        overflow: 'hidden',
        marginEnd: 10
    },
    avatar: {
        width: '100%',
        height: '100%',

    },
})