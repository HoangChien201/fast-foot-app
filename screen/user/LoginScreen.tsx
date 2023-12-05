import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView,TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Loading from '../../component/ui/Loading';
import Form from './user/component/Form';
import ButtonImage from '../../component/ui/ButtonImage';
import { addUser, formLogin } from '../../component/store/userReducer';
import { Color } from '../../contanst/color';
import { login } from '../../http/UserHTTP';
import { navigationType } from '../../component/navigation/ManageNavigation';

export type credentialsInvalidType={
    email:boolean,
    password:boolean
}

const LoginScreen = ({ navigation }:{navigation:navigationType}) => {    
    const dispatch=useDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const [credentialsInvalid, setCredentialsInvalid] = useState<credentialsInvalidType>({
        email: true,
        password: true,
    });
    useEffect(()=>{
        //render lai form khi qua ve 
        const unsubscribe = navigation.addListener('focus', () => {
            setCredentialsInvalid({email:true,password:true})
        });
    
        return unsubscribe;
    },[navigation])

    function SignUpPressHandle() {
        navigation.navigate("SignUpScreen")
    }



    async function SubmitHandle(value:formLogin){
        const {email,password}:formLogin={...value}
        let emailValue:boolean | string=email.trim()
        emailValue=emailValue.includes('')

        let passwordValue:boolean | string=password.trim()
        passwordValue=passwordValue.length > 0

        if(!emailValue || !passwordValue){    
            setCredentialsInvalid({email:emailValue,password:passwordValue})
            return
        }
        setIsLoading(true)
        const result=await login(email,password)
        console.log(result);
        
        setIsLoading(false)
        dispatch(addUser(result))
    }

    return (
        <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                style={styles.container}
            >
                <ScrollView>
                    <Loading isLoading={isLoading}/>
                    <View >
                        <View>
                            <View>
                                <Text style={[styles.title, styles.text]}>Hello</Text>
                                <Text style={[styles.title, styles.text]}>Again !</Text>
                            </View>
                            <View>
                                <Text style={[styles.welcome, styles.text]}>Welcome back you've been missed</Text>
                            </View>
                        </View>
                        <Form onSubmit={SubmitHandle} login credentialsInvalid={credentialsInvalid}/>
                        <Text style={{ textAlign: 'center', marginVertical: 10 }}>or continue with</Text>
                        <View style={styles.buttonImageContainer}>
                            <ButtonImage children='Facebook' source={require('../../assets/images/icon/icon-fb.png')} style={styles.buttonImage}/>
                            <ButtonImage children='Google' source={require('../../assets/images/icon/icon-gg.png')} style={styles.buttonImage}/>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', marginVertical: 16 }}>
                            <Text>don't have an account ?</Text>
                            <TouchableOpacity onPress={SignUpPressHandle}>
                                <Text style={styles.signUp}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        flex: 1,
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
    signUp: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 21,
        color:Color.primary200
    },
})