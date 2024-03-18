import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../../contanst/color'

const AddressTypeComponent = ({updateValueAddress}:{updateValueAddress:any}) => {
    const [isAddressTypeActive, setIsAddressTypeActive] = useState('')

    useEffect(()=>{
        updateValueAddress("addressType",isAddressTypeActive)
    },[isAddressTypeActive])

    function AddressType({ type }: { type: string }): JSX.Element {
        let active = false;
        if (isAddressTypeActive === type) {
            active = true
        }
        return (
            <TouchableOpacity onPress={()=>setIsAddressTypeActive(type)}>
                <View style={[styles.addressTypeContainer, active && styles.active]}>
                    <Text style={[styles.type, { color: active ? Color.primary200 : Color.textBrown }]}>{type}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Address Type</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AddressType type='Home' />
                <AddressType type='Office' />
            </View>
        </View>
    )
}

export default AddressTypeComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor:Color.backgroundInput,
        height:50,
        paddingStart:27
    },
    title: {
        color: Color.textBrown1,
        fontWeight: '400',
        fontSize: 16
    },
    addressTypeContainer: {
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Color.backgroundInput,
        marginEnd: 10,
        borderRadius:14
    },
    type: {

    },
    active: {
        borderColor: Color.primary200
    }
})