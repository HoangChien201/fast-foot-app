import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ButtonImage from '../ButtonImage'
import SocketIOClient from 'socket.io-client'
import { userType } from '../../store/userReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export type MessageRequest = {
    user_id_send: number,
    user_id_receice: number,
    message: string,
}

export type MessageRespone = {
    message_id:number,
    user_send: userType,
    message: string,
    create_at:Date,
    status:number
}

const TextingComponent = ({onSendMessage}:{onSendMessage:any}) => {
    const [message, setMessage] = useState('')
    const user:userType=useSelector((state:RootState)=>state.user.value)
    const socket = SocketIOClient('http://192.168.0.101:9999/')

    const sendMessage = () => {
        onSendMessage({
            user_id_send: user?.id,
            user_id_receice: 1,
            message: message,
        })       
        setMessage('')
    };
    function onChangeText(text: string) {
        setMessage(text)
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Nhập tin nhắn'
                onChangeText={onChangeText}
                multiline={true}
                value={message}
            />

            <TouchableOpacity onPress={sendMessage}>
                <Image source={require('../../../assets/images/icon/send.png')} style={styles.buttonSend} />
            </TouchableOpacity>
        </View>
    )
}

export default TextingComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor:'#fff'
    },
    buttonSend: {
        width: 24,
        height: 24
    },
    input: {
        minHeight: 40,
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#ccc',
        borderRadius: 25,
        marginEnd: 10
    }
})