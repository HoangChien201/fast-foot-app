import { StyleSheet, Text, View,Pressable } from "react-native";

import { Color } from "../../contanst/color";
import React from "react";
export default function ViewAll({onPress}:{onPress?:any}){
    return <Pressable style={({pressed})=> pressed && styles.pressed} onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.text}>See all</Text>
        </View>
    </Pressable>
}
const styles=StyleSheet.create({
    pressed:{
        opacity:0.7
    },
    container:{
        height:30,
        backgroundColor:Color.primary150,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10
    },
    text:{
        color:Color.primary200,
        fontWeight:"bold"
    }
})