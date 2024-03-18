import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../contanst/color'
import OrderShipperItem from '../../component/ui/shipper/OrderShipperItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../component/store/store'
import { getAllBillDeliveryHTTP } from '../../http/BillHTTP'

const HomeShipperScreen = () => {
  const user=useSelector((state:RootState)=>state.user.value)
  const [valueBill,setValueBill]=useState()
  useEffect(()=>{
    (async function getBillAPI() {
      const resultBill=await getAllBillDeliveryHTTP();
      setValueBill(resultBill)
    })()
  },[])
  
  return (
    <View style={styles.container}>
        {
          valueBill && 
          <FlatList
            data={valueBill}
            renderItem={({item})=>{
              return (
                  <OrderShipperItem bill={item}/>
              )
            }}
            keyExtractor={item=>item._id}
            showsVerticalScrollIndicator={false}
          />
        }
        
    </View>

  )
}

export default HomeShipperScreen

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor:"#fff",
    flex:1
  },
})
