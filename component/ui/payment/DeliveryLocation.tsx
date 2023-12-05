import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'

import { Color } from '../../../contanst/color'
import { RootState } from '../../store/store'
import { getAddressByUser } from '../../../http/UserHTTP'
import { addressDeliveryType, addressType } from '../../store/userReducer'
import { AxiosResponse } from 'axios'
import { FormatAddress } from '../../../contanst/FormatAddress'

const DeliveryLocation = ({updateValuePayment,valueAddressDelivery}:{updateValuePayment:any,valueAddressDelivery:string|null}) => {
    const [addressDelivery,setAddressDelivery]=useState<addressDeliveryType>()
    
    const user=useSelector((state:RootState)=>state.user.value)

    const navigation:NavigationProp<ReactNavigation.RootParamList>=useNavigation()
    const router: RouteProp<{ params: { address: addressType } }, 'params'>=useRoute()

    useEffect(()=>{
        if(user?.address){
            (async function getAddressByUserAPI() {
            const addressUser:addressType=await getAddressByUser(user._id)
            setAddressDelivery({...addressUser,nameRecipient:user.username,phone:user.phone})
            
            })()
            
        }
    },[])

    const addressRouter=router?.params?.address
    //format address :  
    //ten nguoi nhan,
    //so nha, ten duong,phuong,quan,tp
    
    
    useEffect(()=>{
        updateValuePayment("deliveryLocation",addressRouter)
        if(addressRouter){
            setAddressDelivery((prevValue)=>{
                return {...prevValue,...addressRouter}
            })
        }
        
    },[addressRouter])
    function ChangeOnPress() {
        navigation.navigate('ManageAddressScreen',{
            data:addressDelivery
        })
    }
    
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <Text style={styles.title}>Delivery Location</Text>
                <TouchableOpacity onPress={ChangeOnPress}>
                    <Text style={styles.change}>Change</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.addressContainer}>
                <Image source={require('../../../assets/images/icon/icon-location.png')} style={styles.iconLocation} />
                <Text style={styles.address}>{FormatAddress(addressDelivery)}</Text>
            </View>
        </View>
    )
}

export default DeliveryLocation

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 103,
        borderRadius: 20,
        backgroundColor: Color.primary100,
        padding: 16,
        marginBottom: 16
    },
    title: {
        color: Color.textBrown,
        fontWeight: 'bold',
        fontSize: 18
    },
    change: {
        fontSize: 18,
        color: Color.primary200,
        fontWeight: '400',
    },
    addressContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 15
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
        fontFamily: 'Klarna Text'
    }
})