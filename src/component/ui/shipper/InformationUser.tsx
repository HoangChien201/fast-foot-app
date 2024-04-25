import { StyleSheet, Text, View,Image,TouchableOpacity,Linking } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color'
import { order_type } from '../../store/billDeliveryReducer'
import { userType } from '../../store/userReducer'

const InformationUser = ({user}:{user:userType}) => {
    function callPhoneHandle(){
        Linking.openURL(`tel:${user.phone}`)
    }   
    return (
        <View style={styles.userContainer}>
            <View style={styles.flexRow}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{uri:user.avatar}}
                        style={styles.avatar}
                    />
                </View>
                <Text style={styles.nameUser}>{user.fullname}</Text>
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
        width:'100%',
        alignItems:'center',
    },
    nameUser: {
        color: "#000",
        fontSize: 20,
        fontWeight: 'bold',
        flex:1,
        textAlign:'center'
    },
    iconPhoneContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Color.primary150,
    },
    iconPhone: {
        width: '40%',
        height: '40%'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex:1
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        overflow: 'hidden',
        justifyContent:"center",
        alignContent:"center",
        marginVertical:10
    },
    avatar: {
        width: '100%',
        height: '100%',

    },
})