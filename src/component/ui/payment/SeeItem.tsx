import { StyleSheet, Text, TouchableOpacity, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color'

const SeeItem = ({onPress}:{onPress:any}) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.seeItemContainer}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require('../../../assets/images/icon/icon-cart.png')} style={styles.iconCart} />
                    <Text style={styles.title}>Giỏ hàng</Text>
                </View>
                <Image source={require('../../../assets/images/icon/icon-arrow-br-right.png')} style={styles.iconArrowRight} />
            </View>
        </Pressable>
    )
}

export default SeeItem

const styles = StyleSheet.create({
    seeItemContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 23,
        elevation:1
    },
    title: {
        color: Color.textBrown,
        fontWeight: 'bold',
        fontSize: 18
    },
    iconCart: {
        width: 35,
        height: 25,
        marginEnd: 10
    },
    iconArrowRight: {
        width: 8,
        height: 14,
    },
})