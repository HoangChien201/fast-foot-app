import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import { credentialsInvalidType } from '../LoginScreen'
import { Color } from '../../../contanst/color'
import ButtonCustom from '../../../component/ui/ButtonCustom'

const FormSignUp = ({ onSubmit, credentialsInvalid }: { onSubmit: any, credentialsInvalid: credentialsInvalidType }) => {
    const [valueForm, setValueForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { email, password }: credentialsInvalidType = { ...credentialsInvalid }

    function OnChangeTextField(type: string, value: string) {
        setValueForm((prevValue) => {
            return { ...prevValue, [type]: value, }
        })

    }

    function SubmitHandle() {
        onSubmit(valueForm)
    }
    return (
       

                <View style={styles.container}>
                    <View style={styles.inputWrapper}>

                        <Input
                            inValid={!email}
                            value={valueForm.fullName}
                            onChangeTextField={OnChangeTextField.bind(this, 'full-name')}
                            placeholder='Họ tên'
                            placeholderTextColor='#A0A0A0'
                        />
                        <Input
                            inValid={!email}
                            value={valueForm.email}
                            onChangeTextField={OnChangeTextField.bind(this, 'email')}
                            placeholder='Email'
                            placeholderTextColor='#A0A0A0'
                        />
                        <Input
                            inValid={!email}
                            value={valueForm.password}
                            onChangeTextField={OnChangeTextField.bind(this, 'password')}
                            placeholder='Mật khẩu'
                            placeholderTextColor={Color.placeholderTextColor}
                        />
                        <Input
                            inValid={!email}
                            value={valueForm.confirmPassword}
                            onChangeTextField={OnChangeTextField.bind(this, 'confirm')}
                            placeholder='Xác nhận mật khẩu'
                            placeholderTextColor={Color.placeholderTextColor}
                        />
                    </View>
                    <View style={styles.button}>
                        <ButtonCustom children='Đăng kí' textColor='#fff' onPress={SubmitHandle} />
                    </View>
                </View>
          
    )
}

export default FormSignUp

const styles = StyleSheet.create({
    container: {

    },
    inputWrapper: {
        height: 284,
        justifyContent: "space-between"
    },
    button: {
        marginTop: 36,
        borderRadius: 50,
        height: 50,
        backgroundColor: Color.primary200,
        overflow: 'hidden'
    },
})