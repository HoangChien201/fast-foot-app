import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Color } from '../../contanst/color'

interface ButtonCustomProps{
    children?:string,
    textColor?:string,
    onPress?:any,
    style?:any
}

const ButtonCustom:React.FC<ButtonCustomProps> = ({children,textColor,onPress,style}) => {
    return (
        <Pressable style={({pressed})=>pressed && styles.pressed } onPress={onPress}>
            <View style={[styles.container,style]}>
                <Text style={[styles.text,{color:textColor}]}>{children}</Text>
            </View>
        </Pressable>
    )
}

export default ButtonCustom;

const styles = StyleSheet.create({
    pressed:{
        // backgroundColor:'rgba(225,225,225,0.8)'
        opacity:0.8
    },
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:"center",
    },
    text:{
        fontSize:20,
        fontWeight:"bold"
    }
})