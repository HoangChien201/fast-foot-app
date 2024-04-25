import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome'
import IconButton from './IconButton';

type InputType={
    lable?:string, 
    password?:boolean, 
    inValid?:boolean, 
    value:string,
    onChangeTextField:any, 
    placeholder?:string
    placeholderTextColor?:string
}

const Input = (props:InputType) => {
    const { lable, password, inValid, value, onChangeTextField,placeholder,placeholderTextColor } = props;
    const [hidePassword, setHidePassword] = useState<boolean>(password ? true : false);



    function IconPasswordController() {
        if (hidePassword) {
            setHidePassword(false)
        } else {
            setHidePassword(true)
        }
    }
    function IconPassword() {
        return hidePassword ? <View style={styles.icon}>
            <IconButton name='eye-slash' size={24} color='#000' onPress={IconPasswordController} />
        </View> :
            <View style={styles.icon}>
                <IconButton name='eye' size={24} color='#000' onPress={IconPasswordController} />
            </View>
    }
    function OnChangeText(value) {
        onChangeTextField(value)
    }
    return (
        <View style={{flex:1}}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, , inValid && styles.invalidFail]}
                    secureTextEntry={hidePassword}
                    value={value}
                    onChangeText={OnChangeText} 
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    />
                {
                    password && <IconPassword />
                }

            </View>
            {
                inValid &&
                <View style={styles.invalidText}>
                    <Image source={require('../../../assets/images/icon/icon-warning.png')} />
                    <Text style={{ color: '#C30052', marginStart: 5 }}>Invalid {lable}</Text>
                </View>
            }


        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    lable: {
        width: 80,
        height: 21,
        fontFamily: 'poppins',
        fontWeight: '400',
        lineHeight: 21,
        fontSize: 16,
        letterSpacing: 0.12,
        marginVertical: 5,
    },
    input: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 10,
        minHeight:58,
        backgroundColor:'#fff'
    },
    inputContainer: {
        justifyContent: 'center'
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    invalidFail: {
        borderColor: '#C30052',
        borderWidth: 1,
    },
    invalidText: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})