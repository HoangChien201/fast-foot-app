import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const ProfileUser = () => {
    const user = useSelector((state: RootState) => state.user.value)
    const avatar = user?.client?.avatar ? { uri: user?.client?.avatar } : require('../../../assets/images/anonymous/anonymous_male.jpg')
    const client=user?.client
    return (
        <View style={styles.profileUser}>
            <Image source={avatar} style={styles.avatar} />
            <View style={{flex:1}}>
                <Text style={styles.nameUser}>{client?.fullname}</Text>
                <Text style={styles.detail}>{user?.email}</Text>
                <View style={styles.line}></View>
                <Text style={styles.detail}>{client?.phone}</Text>
                <View style={styles.line}></View>
                <Text style={styles.detail} numberOfLines={2}>105/45/14 đường số 59, phường 14, Gò Vấp</Text>
            </View>
        </View>
    )
}

export default ProfileUser;

const styles = StyleSheet.create({
    profileUser: {
        borderRadius: 20,
        height: 155,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems:'center',
        paddingHorizontal:18
    },
    avatar: {
        height: 93,
        width: 93,
        marginRight:16
    },
    nameUser: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000'
    },
    detail:{
        fontWeight: '400',
        fontSize: 14,
        color: '#808080',
        width:'100%'
    },
    line:{
        height:0.5,
        width:'100%',
        marginVertical:5,
        backgroundColor:'#808080'
    }
})