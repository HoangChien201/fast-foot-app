import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { getOrderTrackingDeliveringHTTP } from '../../../http/OrderTrackingHTTP'
import OrderShipperItem from './OrderShipperItem'

const DeliveringShipperComponent = () => {
  const [valueBill,setValueBill]=useState()
  const isFocus=useIsFocused()

  useEffect(()=>{
    (async function getBillAPI() {
      const resultBill=await getOrderTrackingDeliveringHTTP();
      setValueBill(resultBill)
    })()
  },[isFocus])
  return (
    <View style={styles.container}>
      {
          valueBill && 
          <FlatList
            data={valueBill}
            renderItem={({item})=>{
              return (
                  <OrderShipperItem orderTracking={item}/>
              )
            }}
            keyExtractor={item=>item.order.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        }
    </View>
  )
}

export default DeliveringShipperComponent

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor:"#fff",
    flex:1
  },
})