import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import ButtomImage from '../../component/ui/ButtonImage'
import Loading from '../../component/ui/Loading'
// import Form from './user/component/FormLogin'
import ButtonImage from '../../component/ui/ButtonImage'
import { Color } from '../../contanst/color'
import { navigationType } from '../../component/navigation/ManageNavigation'
import { singUp } from '../../http/UserHTTP'
import Input from './component/Input'
import FormSignUp from './component/FormSignUp'

export type userSignUpType = {
    fullname: string,
    email: string,
    password: string,
    confirm: string
}

const SignUpScreen = ({ navigation }: { navigation: navigationType }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: true,
        password: true,
        fullname: true,
        confirmPass: true
    });

    //submit
    async function SubmitHandle(user: userSignUpType) {
        let { fullname, email, password, confirm } = { ...user }


        email = email.trim();
        password = password.trim()
        fullname = email.trim()
        confirm = confirm.trim()

        const fullnameIsValid = fullname.length > 0;
        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length >= 6;
        const confirmPassIsValid = confirm.length > 0;

        if (!emailIsValid || !passwordIsValid || !fullnameIsValid || !confirmPassIsValid) {
            setCredentialsInvalid({
                email: emailIsValid,
                password: passwordIsValid,
                fullname: fullnameIsValid,
                confirmPass: confirmPassIsValid
            })
            return
        }
        if (password !== confirm) {
            Alert.alert("Thông báo", "Mật khẩu xác nhận chưa trùng")
            return
        }
        try {
            setIsLoading(true);

            await singUp(user, 'client');
            Alert.alert("Good job", "Singup Success", [
                {
                    text: 'Oke',
                    onPress: () => navigation.goBack()
                }
            ])

            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            Alert.alert("Thông báo", "Đăng kí thất bại")

        }
    }
    //
    return (
        <KeyboardAvoidingView
        >
            <ScrollView>
                <Loading isLoading={isLoading} />

                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Đăng kí</Text>
                        <View style={styles.buttonImageContainer}>
                            <ButtonImage
                                source={require('../../assets/images/icon/icon-fb.png')}
                                style={[styles.buttonImage, { backgroundColor: '#fff' }]}
                                textColor='#fff'
                            />
                            <ButtonImage
                                source={require('../../assets/images/icon/icon-gg.png')}
                                style={[styles.buttonImage, { backgroundColor: '#fff' }]}
                                textColor='#fff'
                            />
                        </View>
                    </View>
                    <FormSignUp credentialsInvalid={credentialsInvalid} onSubmit={SubmitHandle} />

                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        flex: 1
    },
    headingContainer: {
        height: 67,
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center"
    },
    heading: {
        fontSize: 32,
        fontFamily: 'poppins',
        lineHeight: 72,
        letterSpacing: 0.12,
        fontWeight: '700',
        color: Color.primary200
    },
    title: {

    },
    welcome: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 30,
        letterSpacing: 0.12,
        width: 222
    },
    form: {
        marginTop: 20
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 13,
        borderRadius: 6,
        height: 50
    },
    buttonImage: {
        borderRadius: 10,
        height: 45,
        width: 45,
        backgroundColor: Color.primary350,

    },
    buttonImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 106

    },
    login: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 21,
        color: Color.primary200
    }
})