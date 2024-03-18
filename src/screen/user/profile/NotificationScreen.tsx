import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Color } from '../../../contanst/color'
import NotificaitonItem from '../component/NotificaitonItem'

const NotificationScreen = () => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity>
            <Text style={{ color: Color.primary200, fontWeight: '500', marginEnd: 10 }}>Đánh dấu đã đọc</Text>
          </TouchableOpacity>
        )
      }
    })
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thông báo</Text>
      <NotificaitonItem/>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {

  },
  heading: {
    color:'#000',
    fontSize:20,
    marginStart:20,
    fontWeight:'600',
    marginBottom:20
  },
})