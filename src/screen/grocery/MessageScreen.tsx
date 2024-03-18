import { Button, FlatList, FlatListProps, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ChatItemComponent from '../../component/ui/chat/ChatItemComponent'
import TextingComponent, { MessageRequest, MessageRespone } from '../../component/ui/chat/TextingComponent'
import { userType } from '../../component/store/userReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../../component/store/store'
import { getMessageHttp } from '../../http/MessageHTTP'
import { socket } from '../../helper/SocketHandle'

const MessageScreen = () => {
  const user:userType=useSelector((state:RootState)=>state.user.value)
  const [messages, setMessages] = useState<Array<MessageRespone>>([])
  const scrollViewRef= useRef<FlatList>(null);

  async function getMessageAPI() {
      const result:Array<MessageRespone>= await getMessageHttp(1,user.id)      
      setMessages([...result])
  }


  useLayoutEffect(() => {
    getMessageAPI()
    socket.on(`message-${user.id}`, (msg: MessageRequest) => {
      getMessageAPI()
    });
  },[])

  function onSendMessage(value:MessageRequest){
    socket.emit('message',value) 
    setTimeout(()=>{
      getMessageAPI()
    },1000)
  }



  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollViewRef}
        data={messages}
        renderItem={({item}) => {
          return (
            <ChatItemComponent
              state={user?.id === item.user_send.id}
              content={item.message}
              create_at='02:20 AM'
            />
          )
        }}
        onContentSizeChange={()=>scrollViewRef.current?.scrollToEnd()}
        showsVerticalScrollIndicator={false}
      />
      <TextingComponent onSendMessage={onSendMessage}/>
    </View>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-between'
  }
})