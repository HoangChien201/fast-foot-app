import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigationType } from '../../../component/navigation/ManageNavigation'
const Remember = () => {
    const navigation:navigationType=useNavigation()
    function ForgotPasswordPressHandle() {
        navigation.navigate("SendMailScreen")
    }

    function IconCheckBox() {
        return (
            <Icon name='checkbox-blank-outline' size={24} color='#000' />
            // <Icon name='checkbox-marked' size={24} color='#000'/>

        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.remember}>
                <IconCheckBox />
                <Text>Remember</Text>
            </View>
            
        </View>
    )
}

export default Remember

const styles = StyleSheet.create({
    container: {
        height: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:10
    },
    remember: {
        flexDirection: "row",
        alignItems: 'center'
    }
})