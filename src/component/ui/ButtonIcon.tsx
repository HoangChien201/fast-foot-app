import { View, Text, Pressable, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native'
import React from 'react'


import Icon from 'react-native-vector-icons/AntDesign'
import { Color } from '../../contanst/color'

const ButtonIcon = ({ name, size, color, onPress }: { name: string, size: number, color: string, onPress?: any }) => {
    
    return (
        <TouchableOpacity 
            onPress={onPress}>
            <View style={styles.container}>
                <Icon name={name} size={size} color={color} />
            </View>
        </TouchableOpacity>

    )
}

export default ButtonIcon

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        justifyContent:'center',
        alignItems:'center',
    }
})