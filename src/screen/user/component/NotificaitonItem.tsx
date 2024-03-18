import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificaitonItem = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/logo/logo-main.png')} style={styles.logo} />
            <View style={styles.contentContainer}>
                <Text style={styles.content}>Đơn hàng đang được quán chuẩn bị</Text>
                <Text style={styles.date}>11/12/2023</Text>
            </View>
        </View>
    )
}

export default NotificaitonItem

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height:90,
        alignItems:"center",
        backgroundColor:"#FEF7DC"

    },
    active:{
        backgroundColor:"#FEF7DC"
    },
    logo: {
        width: 100,
        height: 66
    },
    contentContainer: {
        justifyContent:'space-between',
    },
    content: {
        color:'#000',
        fontSize:16,
        fontWeight:'500',
        letterSpacing:0.12
    },
    date: {
        color:'#47463D',
        fontSize:14,
        fontWeight:'300',
        letterSpacing:0.12,
        marginVertical:5
    },
})