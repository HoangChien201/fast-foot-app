import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Input from './Input'
import Remember from './Remember'
import ButtonCustom from '../../../component/ui/ButtonCustom'
import { Color } from '../../../contanst/color'
import { credentialsInvalidType } from '../LoginScreen'
import ButtonImage from '../../../component/ui/ButtonImage'
import { useNavigation } from '@react-navigation/native'
import { navigationType } from '../../../component/navigation/ManageNavigation'


const FormLogin = ({ onSubmit, credentialsInvalid }: { onSubmit: any, login?: boolean, credentialsInvalid: credentialsInvalidType }) => {

    const navigation:navigationType=useNavigation()

    const [valueForm, setValueForm] = useState({ email: 'customer@gmail.com', password: '123456' })
    const { email, password }: credentialsInvalidType = { ...credentialsInvalid }

    function OnChangeTextField(type: string, value: string) {
        setValueForm((prevValue) => {
            return { ...prevValue, [type]: value, }
        })

    }

    function forgorPasswordOnPress(){
        navigation.navigate("SendMailScreen")
    }

    function SubmitHandle() {
        onSubmit(valueForm)
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    placeholderTextColor={Color.placeholderTextColor}
                    inValid={!email}
                    value={valueForm.email}
                    onChangeTextField={OnChangeTextField.bind(this, 'email')}
                />
                <Input
                    placeholder='Password'
                    placeholderTextColor={Color.placeholderTextColor}
                    password={true}
                    inValid={!password}
                    value={valueForm.password}
                    onChangeTextField={OnChangeTextField.bind(this, 'password')} 
                />
            </View>
            <TouchableOpacity onPress={forgorPasswordOnPress}>
                <Text style={styles.forgotPassword}>Forget passowrd ?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <ButtonCustom children='Login' textColor='#fff' onPress={SubmitHandle} />
            </View>
            <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: '700', color: "#000", textAlign: 'center' }}>or</Text>
            <View style={styles.buttonImageContainer}>
                <ButtonImage
                    children='Login with Facebook'
                    source={require('../../../assets/images/icon/icon-fb.png')}
                    style={[styles.buttonImage, { backgroundColor: '#1877F2' }]}
                    textColor='#fff'
                />
                <ButtonImage
                    children='Login with Google'
                    source={require('../../../assets/images/icon/icon-gg.png')}
                    style={[styles.buttonImage, { backgroundColor: '#fff' }]} />
            </View>
        </View>
    )
}

export default FormLogin

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 48
    },
    button: {
        borderRadius: 50,
        height: 50,
        backgroundColor: Color.primary200,
        overflow: 'hidden'
    },
    buttonImage: {
        borderRadius: 50,
        height: 50,
    },
    buttonImageContainer: {
        width: '100%',
        height: 118,
        justifyContent: "space-between"
    },
    inputContainer: {
        height: 160,
        justifyContent: "space-between"
    },
    forgotPassword: {
        color: Color.primary200,
        fontSize: 14,
        fontWeight: '700',
        marginVertical: 18
    }

})