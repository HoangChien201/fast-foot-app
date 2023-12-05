import { StyleSheet, Text, View,Pressable } from "react-native";

import { Color } from "../../contanst/color";
export default function ViewAll({onPress}:{onPress?:any}){
    return <Pressable style={({pressed})=> pressed && styles.pressed} onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.text}>View All</Text>
        </View>
    </Pressable>
}
const styles=StyleSheet.create({
    pressed:{
        opacity:0.7
    },
    container:{
        width:80,
        height:"100%",
        backgroundColor:Color.primary150,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:Color.primary200,
        fontWeight:"bold"
    }
})