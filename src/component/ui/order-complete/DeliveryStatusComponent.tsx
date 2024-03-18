import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { billDeliveryResType, billDeliveryType } from '../../store/billDeliveryReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { checkOrderTrackingHTTP, getOrderTrackingHTTP } from '../../../http/OrderTrackingHTTP';
import { socket } from '../../../helper/SocketHandle';
import { postLocalNotification } from '../../../notifications/Events';

const DeliveryStatusComponent = ({ bill_id }: { bill_id: number }) => {
  const [valueProcess, setValueProcess] = useState(-1)
  const user = useSelector((state: RootState) => state.user.value)

  async function getOrderTracking() {
    if (user) {
      const checkOrder = await checkOrderTrackingHTTP(bill_id)
      if (checkOrder.status == 1) {
        setValueProcess(0)
        return
      }
      if (checkOrder.status == 2) {
        setValueProcess(0.5)
        return
      }
      if (checkOrder.status == 3) {
        setValueProcess(1)
        return
      }
    }

  }
  useEffect(() => {
    getOrderTracking()
    //xử lý khi có thông báo
    socket.on(`notification-${user?.id}`, (msg) => {
      postLocalNotification({
        title: 'Thông báo',
        body: msg.content
      })
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