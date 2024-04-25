import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderShipperItem from './OrderShipperItem'
import { getOrderTrackingDoneHTTP } from '../../../http/OrderTrackingHTTP'
import { useIsFocused } from '@react-navigation/native'

const DeliveredShipperComponent = () => {
    const [valueBill,setValueBill]=useState()
  const isFocus=useIsFocused()

  useEffect(()=>{
    (async function getBillAPI() {
      const resultBill=await getOrderTrackingDoneHTTP();
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

export default DeliveredShipperComponent

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        backgroundColor:"#fff",
        flex:1
      },
})