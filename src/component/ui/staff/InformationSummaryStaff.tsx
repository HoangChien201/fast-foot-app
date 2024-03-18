import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color'

const InformationSummaryStaff = () => {
    function Information({ title, children }:{ title:string, children:string }) {
        return (
            <View style={styles.informationContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.children}>{children}</Text>

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Information title='Experience' children='1 years'/>
            <View style={styles.line}></View>
            <Information title='Bills' children='12'/>
        </View>
    )
}

export default InformationSummaryStaff

const styles = StyleSheet.create({
    container: {
        height:40,
        flexDirection:"row",
        paddingVertical:5
    },
    line:{
        height:'100%',
        width:1,
        backgroundColor:'#fff'
    },
    informationContainer: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        color:Color.primary300,
        fontSize:16,

    },
    children: {
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    },
})