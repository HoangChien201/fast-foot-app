import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity, Dimensions, Alert, NativeAppEventEmitter } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { NativeModules, NativeEventEmitter } from 'react-native';

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { CreatePaymentOrder } from '../../http/PaymentZalo';
import ModalBottomTabSheetComponent from '../../component/ui/ModalBottomTabSheetComponent';

const VoucherScreen = () => {
  const [money, setMoney] = React.useState('10000')
  const [token, setToken] = React.useState('')
  const [returncode, setReturnCode] = React.useState('')


  async function createOrder(money) {

    let amount = parseInt(money)
    let appuser = "ZaloPayDemo"
    let embeddata = "{}"
    let item = "[]"
    let description = "Merchant description for order #"
    var order = {
      'app_user': appuser,
      'amount': amount,
      'embed_data': embeddata,
      'item': item,
      'description': description,
    }

    console.log(order)
    const response = await CreatePaymentOrder(order)
    const data = response
    console.log(data)
    setToken(data.zp_trans_token)
    setReturnCode(data.return_code)

  }


  function payOrder() {

  }
  const [visible,setVisible]=useState(false)
  function onPress() {
    // var payZP = NativeModules.PayZaloBridge;
    // payZP.payOrder(token);

    // console.log(token);
    console.log('opress');
    setVisible(true)
    
  }
  console.log('render');
  

  return (
    <View style={styles.container}>
      <Button
        onPress={onPress}
        title="Present Modal"
        color="black"
      />

      <ModalBottomTabSheetComponent visible={visible} setVisible={setVisible} snapPointsProp={['100%']}>
      <Text>Awesome 🎉</Text>

      </ModalBottomTabSheetComponent>
    </View>
  )
}

export default VoucherScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    elevation: 6,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
    padding: 10
  },
  title: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    justifyContent: 'center',
    alignItems: "center",
    position: 'absolute',
    right: 20
  }
})



