import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Search from '../Search'
import ButtonIcon from '../ButtonIcon'
import { Color } from '../../../contanst/color'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import InfomationStaff from './InfomationStaff'

interface StaffItemProps{
}

const StaffItem:React.FC<StaffItemProps> = () => {
    const navigation:NavigationProp<ReactNavigation.RootParamList>=useNavigation()
    function RemoveOnpress() {
        console.log('remove');

    }
    function StaffItemOnPress(){
        navigation.navigate('StaffDetailScreen')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.staffItem} onPress={StaffItemOnPress}>
                    <InfomationStaff item/>
                    <View style={styles.buttonRemove}>
                        <ButtonIcon name='close' size={24} color='#000' onPress={RemoveOnpress} />
                    </View>
            </TouchableOpacity>
        </View>
    )
}

export default StaffItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        shadowColor: '#000',
        backgroundColor: '#fff',
        elevation: 10,
    },
    staffItem:{
        width: '100%',
        height: 100,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10

    },
    buttonRemove: {
        position: 'absolute',
        top: 10,
        right: 10
    },
})