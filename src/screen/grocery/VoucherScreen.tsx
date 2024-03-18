import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React from 'react'
import { NativeModules, NativeEventEmitter } from 'react-native';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { CreateOrder } from '../../http/PaymentZalo';

const VoucherScreen = () => {
  const [money, setMoney] = React.useState('10000')
  const [token, setToken] = React.useState('')
  const [returncode, setReturnCode] = React.useState('')


  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }

  async function createOrder(money) {
    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime()
    let key1 = '8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn'
    let appid = 554
    let amount = parseInt(money)
    let appuser = "ZaloPayDemo"
    let apptime = (new Date).getTime()
    let embeddata = "{}"
    let item = "[]"
    let description = "Merchant description for order #" + apptransid
    let hmacInput = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item
    // let mac =sha256(hmacInput+ "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q")
    let mac = CryptoJS.HmacSHA256(hmacInput, key1)
    console.log("hmacInput: " + hmacInput);
    console.log("mac: " + mac)
    console.log('====================================');
    var order = {
      'app_user': appuser,
      'amount': amount,
      'embed_data': embeddata,
      'item': item,
      'description': description,
    }

    console.log(order)
    const response= await CreateOrder(order)
    const data=response
    console.log(data)
    setToken(data.zp_trans_token)
    setReturnCode(data.return_code)

  }


  function payOrder() {

  }
  function onPress() {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);

    console.log(token);
  }


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Button title='Pay' onPress={() => {
        createOrder(500)
      }} />
      <Button title='Zalo' onPress={onPress} />
    </View>
  )
}

export default VoucherScreen;
const styles = StyleSheet.create({
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



