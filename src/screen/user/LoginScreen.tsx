import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../component/ui/Loading';
// import FormLogin from './user/component/FormLogin';
import { addUser, formLogin } from '../../component/store/userReducer';
import { Color } from '../../contanst/color';
import { login } from '../../http/UserHTTP';
import FormLogin from './component/FormLogin';
import { useNavigation } from '@react-navigation/native';

export type credentialsInvalidType = {
    email: boolean,
    password: boolean
}

const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigation=useNavigation()
    const [isLoading, setIsLoading] = useState(false);
    const [credentialsInvalid, setCredentialsInvalid] = useState<credentialsInvalidType>({
        email: true,
        password: true,
    });

    useEffect(() => {
        //render lai form khi qua ve 
        const unsubscribe = navigation.addListener('focus', () => {
            setCredentialsInvalid({ email: true, password: true })
        });

        return unsubscribe;
    }, [navigation])

    async function SubmitHandle(value: formLogin) {
        const { email, password }: formLogin = { ...value }
        let emailValue: boolean | string = email.trim()
        emailValue = emailValue.includes('@')

        let passwordValue: boolean | string = password.trim()
        passwordValue = passwordValue.length > 0

        if (!emailValue || !passwordValue) {
            setCredentialsInvalid({ email: emailValue, password: passwordValue })
            return
        }
        try {
            setCredentialsInvalid({ email: emailValue, password: passwordValue })
            setIsLoading(true)
            const result = await login(email, password)
            dispatch(addUser(result.data))
        } catch (error) {
            setIsLoading(false);
            Alert.alert("Error","Email or password incorrect")
        }

    }

    return (

        <View style={styles.container}>
            <Loading isLoading={isLoading} />
            <View style={styles.wrapper}>
                <FormLogin onSubmit={SubmitHandle} login credentialsInvalid={credentialsInvalid} />
            </View>
        </View>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.backgroundGray
    },
    text: {
        letterSpacing: 0.12,
    },
    title: {
        fontSize: 48,
        fontFamily: 'poppins',
        lineHeight: 72,
        fontWeight: 'bold',
    },
    welcome: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 30,
        width: 222,
    },
    form: {
        marginTop: 20
    },
    wrapper: {
        flex: 1
    },
    signUp: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 21,
        color: Color.primary200
    },
})