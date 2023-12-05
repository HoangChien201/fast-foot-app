import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Input from './Input'
import Remember from './Remember'
import ButtonCustom from '../../../../component/ui/ButtonCustom'
import { Color } from '../../../../contanst/color'
import { credentialsInvalidType } from '../../LoginScreen'


const Form = ({ onSubmit, login, credentialsInvalid }:{ onSubmit:any, login?:boolean, credentialsInvalid:credentialsInvalidType }) => {

    const [valueForm, setValueForm] = useState({ email: 'hoang@gmail.com', password: '123456' })
    const { email, password }:credentialsInvalidType = { ...credentialsInvalid }

    function OnChangeTextField(type:string, value:string) {
        setValueForm((prevValue) => {
            return { ...prevValue, [type]: value, }
        })

    }

    function SubmitHandle() {
        onSubmit(valueForm)
    }
    return (
        <View style={styles.form}>
            <Input lable='Username' inValid={!email} value={valueForm.email} onChangeTextField={OnChangeTextField.bind(this, 'email')} requireField />
            <Input lable='Password' password={true} inValid={!password} value={valueForm.password} onChangeTextField={OnChangeTextField.bind(this, 'password')} requireField />
            <Remember />
            <View style={styles.button}>
                <ButtonCustom children={login ? 'Login' : 'Sign up'} textColor='#fff' onPress={SubmitHandle} />
            </View>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    button: {
        borderRadius: 50,
        height: 50,
        backgroundColor:Color.primary200,
        overflow:'hidden'
    },

})