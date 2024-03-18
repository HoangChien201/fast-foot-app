import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color'

interface ChatItemComponentInterface{
    content:string,
    create_at:string,
    state:boolean //true:gửi,false:nhận
}

const ChatItemComponent:React.FC<ChatItemComponentInterface> = ({content,state,create_at}) => {
    return (
        <View style={[styles.container,{alignItems:state ? 'flex-end' : 'flex-start'}]}>
            <View style={[styles.contentChatContainer,{backgroundColor:state ? Color.chatSend : Color.chatReveice}]}>
                <Text style={styles.content}>{content}</Text>
            </View>
            <Text style={[styles.content, styles.hour]}>{create_at}</Text>
        </View>
    )
}

export default ChatItemComponent

const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems:'flex-end',
        marginBottom: 20,
        paddingHorizontal:10
    },
    contentChatContainer:{
        minHeight: 20,
        width: 216,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#ECEAEA',
    },
    content: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'regular',
        letterSpacing: 0.12,
        lineHeight: 20
    },
    hour: {

    }
})