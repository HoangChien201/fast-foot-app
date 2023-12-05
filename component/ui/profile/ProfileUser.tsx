import { View, Text, StyleSheet ,Image} from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const ProfileUser = () => {
    const user=useSelector((state:RootState)=>state.user.value)

    return (
        <View style={styles.profileUser}>
            <View style={styles.avatarContainer}>
                <Image source={{uri:user?.client?.avatar}} style={styles.avatar} />
            </View>
            <Text style={styles.nameUser}>{user?.client?.fullname}</Text>
        </View>
    )
}

export default ProfileUser;

const styles = StyleSheet.create({
    profileUser: {
        alignItems: 'center',

    },
    avatarContainer: {
        height: 60,
        width: 60,
        borderRadius: 40,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: "#fff"
    },
    avatar: {
        height: 60,
        width: 60,
    },
    nameUser: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        color: '#fff'
    },
})