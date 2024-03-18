import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import ButtonCustom from '../../component/ui/ButtonCustom'
import { Color } from '../../contanst/color'
import { sendMailForgotPassword } from '../../http/UserHTTP'
import { RootStackParamList, navigationType } from '../../component/navigation/ManageNavigation'
import { setToken } from '../../helper/AsyncStorageHelper'
import Input from './component/Input'
import { StackNavigationProp } from '@react-navigation/stack'

const SendMailScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
    const [email, setEmail] = useState('')

    function onSubmit() {
        try {
            (async function sendMail() {
                try {
                    const result = await sendMailForgotPassword(email);
                    setToken("token", result.token);
                    navigation.navigate("SendOTPScreen", {
                        email: email
                    })
                } catch (error) {
                    console.log('lỗi gửi mail',error);
                    
                }

            })()

        } catch (error) {
            throw error
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={[styles.text, styles.forgotPassword]}>Quên{"\n"}mật khẩu ?</Text>
                </View>
                <View>
                    <Input
                        placeholder='Email'
                        placeholderTextColor={Color.placeholderTextColor}
                        value={email}
                        onChangeTextField={(text: string) => setEmail(text)}
                    />
                </View>
                <Text style={[styles.text, styles.description]}><Text style={{ color: 'red' }}>*</Text> We will send you a message to set or reset your new password</Text>

            </View>
            <TouchableOpacity style={styles.buttonSubmit} onPress={onSubmit}>
                <Text style={styles.sendcodeText}>Gửi mã</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SendMailScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 43,
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
        color: Color.primary200,
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 48, /* 150% */
        width: 190
    },
    description: {
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 24, /* 150% */
        color: '#676767',
        marginTop: 28
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
    buttonSubmit: {
        height: 100
    },

    sendcodeText: {
        color: '#B2B2B2',
        fontSize: 24,
        marginTop: 34
    }
})