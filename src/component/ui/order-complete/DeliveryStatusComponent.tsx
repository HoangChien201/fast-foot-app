import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { checkOrderTrackingHTTP } from '../../../http/OrderTrackingHTTP';
import { socket } from '../../../helper/SocketHandle';
import { postLocalNotification } from '../../../notifications/Events';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';

const DeliveryStatusComponent = ({ order_id }: { order_id: number | string }) => {
  const [valueProcess, setValueProcess] = useState(-1)
  const navigation = useNavigation()
  const user = useSelector((state: RootState) => state.user.value)

  async function getOrderTracking() {
    if (user) {
      const checkOrder = await checkOrderTrackingHTTP(order_id)

      switch (checkOrder.status) {
        case 1:
          setValueProcess(0)
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Notification',
            textBody: 'Your order is confirmed',
          })
          break;

        case 3:
          setValueProcess(0.5)
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Notification',
            textBody: 'Your order is delivering',
          })
          break;
        case 4:
          setValueProcess(1)
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Your order is delivered',
            button: 'OK',
            autoClose:true,
            onPressButton: () => {
              navigation.navigate('GroceryBottomTab')
            }
          })
          break;
        case 5:
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Warning',
            textBody: 'Your order be cancled',
          })
          try {
            navigation.navigate('GroceryBottomTab')
  
          } catch (error) {
  
          }
          break;
      }
    
    }

  }
  useEffect(() => {
    getOrderTracking()
    //xử lý khi có thông báo
    socket.on(`notification-${user?.id}`, (notification) => {
      getOrderTracking()
    })
    //
  }, [])
  function MileStone({ text, active }: { text: string, active?: boolean }): JSX.Element {
    return (
      <View style={styles.milestoneContainer}>
        {
          active ? <Image style={styles.successIcon} source={require('../../../assets/images/icon/success-active.png')} />
            :
            <Image style={styles.successIcon} source={require('../../../assets/images/icon/success-inactive.png')} />
        }
        <Text style={styles.milestone}>{text}</Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.processBar}>
        <Progress.Bar progress={valueProcess} width={null} height={3} unfilledColor='#ccc' borderColor='#fff' />
      </View>
      <MileStone text='Preparing' active={valueProcess >= 0} />
      <MileStone text='Arriving' active={valueProcess >= 0.5} />
      <MileStone text='Success' active={valueProcess >= 1} />

    </View>
  )
}

export default DeliveryStatusComponent

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
  },
  processBar: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: '5%'
  },
  milestoneContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  milestone: {
    color: "#9098B1",
    fontSize: 14,
    fontFamily: 'poppins',
    letterSpacing: 0.5
  },
  successIcon: {
    height: 35,
    width: 35
  },
})