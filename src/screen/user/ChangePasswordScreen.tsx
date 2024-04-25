import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import ButtonCustom from '../../component/ui/ButtonCustom'
import { Color } from '../../contanst/color'
import Input from './component/Input'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { updateUserHTTP } from '../../http/UserHTTP'
import { navigationType } from '../../component/navigation/ManageNavigation'


const ChangePasswordScreen = () => {
    const route=useRoute()
    const navigation=useNavigation()
    const idUser = route.params?.id
    const [valuePassword, setValuePassword] = useState({
        password: '',
        confirm: ''
    })
    function onSubmit() {
        try {
            if (!valuePassword.confirm || !valuePassword.password) {
                Alert.alert("Notification", "Password or confirm password is invalid")
                return
            }
            if (valuePassword.confirm !== valuePassword.password) {
                Alert.alert("Notification", "Password and confirm password do not match")
                return
            }

            (async function updateUser() {

                const result = await updateUserHTTP(idUser, { password: valuePassword.password })
                Alert.alert("Notification", "Reset password success",
                    [
                        {
                            text: 'Oke',
                            onPress: () => navigation.navigate('LoginScreen'),
                        }
                    ])

            })()
        } catch (error) {
            throw error
        }
    }

    function onChangeTextHanle(type: string, value: string) {
        setValuePassword((prevValue) => {
            return { ...prevValue, [type]: value }
        })

    }
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={[styles.forgotPassword, styles.text]}>Reset Password</Text>
                </View>
                <View>
                    <Input password onChangeTextField={onChangeTextHanle.bind(this, 'password')} lable='New passowrd' value={valuePassword.password} />
                </View>
                <View>
                    <Input password onChangeTextField={onChangeTextHanle.bind(this, 'confirm')} lable='Confirm new passowrd' value={valuePassword.confirmPassword} />
                </View>
            </View>
            <View style={styles.button}>
                <ButtonCustom textColor='#fff' children='Submit' onPress={onSubmit} />
            </View>
        </View>
    )
}

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        justifyContent: "space-between",
        flex: 1
    },
    text: {
        color: "#4E4B66",
        /* Display/Medium Bold */
        fontFamily: "poppins",
        letterSpacing: 0.12,
        marginBottom: 8
    },
    forgotPassword: {

        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 48, /* 150% */
        width: 190
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24, /* 150% */
    },
    lable: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21, /* 150% */
    },
    input: {
        height: 48,
        padding: 10,
        borderRadius: 6,
        borderColor: "#4E4B66",
        borderWidth: 1,
    },
    button: {
        borderRadius: 6,
        backgroundColor: Color.primary200,
        height: 50
    }
})