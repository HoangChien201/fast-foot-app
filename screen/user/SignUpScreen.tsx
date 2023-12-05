import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import ButtomImage from '../../component/ui/ButtonImage'
import Loading from '../../component/ui/Loading'
import Form from './user/component/Form'
import ButtonImage from '../../component/ui/ButtonImage'
import { Color } from '../../contanst/color'
import { navigationType } from '../../component/navigation/ManageNavigation'
import { singUp } from '../../http/UserHTTP'

const SignUpScreen = ({ navigation }:{navigation:navigationType}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: true,
        password: true,
    });

    function LoginPressHandle() {
        navigation.navigate("LoginScreen")
    }

    //submit
    async function SubmitHandle(user:{email:string,password:string}) {
        let { email, password } = { ...user }

        
        email = email.trim();
        password = password.trim()
        
        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length >= 6;

        if (!emailIsValid || !passwordIsValid) {
            setCredentialsInvalid({
                email: emailIsValid,
                password: passwordIsValid
            })
            return
        }
        try {
            await singUp(email,password,'client');
            Alert.alert("Good job","Singup Success",[
                {
                    text:'Oke',
                    onPress:()=>navigation.goBack()
                }
            ])
        } catch (error) {
            console.log(error);
            
        }
        


    }
    //
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
            style={styles.container}
        >
            <ScrollView>
                <Loading isLoading={isLoading} />
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={[styles.title]}>Hello</Text>
                    </View>
                    <View>
                        <Text style={[styles.welcome]}>Signup to get Started</Text>
                    </View>
                </View>
                <Form onSubmit={SubmitHandle} credentialsInvalid={credentialsInvalid} />
                <Text style={{ textAlign: 'center', marginVertical: 10 }}>or continue with</Text>
                <View style={styles.buttonImageContainer}>
                    <ButtonImage children='Facebook' source={require('../../assets/images/icon/icon-fb.png')} style={styles.buttonImage} />
                    <ButtonImage children='Google' source={require('../../assets/images/icon/icon-gg.png')} style={styles.buttonImage} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', marginVertical: 16 }}>
                    <Text>don't have an account ?</Text>
                    <TouchableOpacity onPress={LoginPressHandle}>
                        <Text style={styles.login}>Login</Text>
                    </TouchableOpacity>
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
    headerContainer: {
        height: 171,
        justifyContent: "center"
    },
    title: {
        fontSize: 48,
        fontFamily: 'poppins',
        lineHeight: 72,
        letterSpacing: 0.12,
        fontWeight: 'bold'
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
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 6,
        height: 50,
        backgroundColor:Color.primary350,
        width:174
    },
    buttonImageContainer: {
        flexDirection: 'row',
        width:'100%',
        justifyContent:'space-between'
    },
    login: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 21,
        color:Color.primary200
    }
})