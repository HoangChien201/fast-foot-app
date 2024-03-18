import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { product } from '../../../contanst/contanst'
import ProductItem from '../ProductItem'
import { Color } from '../../../contanst/color'
import { getRecentProductOrderHTTP } from '../../../http/UserHTTP'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const RecentOrderProduct = ({ openModalAdd }: { openModalAdd: any }) => {
  const user = useSelector((state: RootState) => state.user.value)
  const products=useSelector((state:RootState)=> state.product.value)

  const [recentProduct,setRecentProduct]=useState([])

  async function getRecentProductOrdered() {
    if (user) {
      const result = await getRecentProductOrderHTTP(user.id)      
      setRecentProduct(result)
    }
  }

  useEffect(()=>{
    getRecentProductOrdered()
  },[])

  const renderItem=({item}:{item:string})=>{
    const product=products.find(product=>product.id === item)
    return (
      <View style={styles.productItem}>
        <ProductItem product={product} addPress={openModalAdd} type='colunm' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đặt lại lần nữa</Text>
      <FlatList
        data={recentProduct}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default RecentOrderProduct

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  heading: {
    fontSize: 24,
    fontFamily: 'poppins',
    letterSpacing: 0.67,
    fontWeight: '700',
    color: '#000',
    marginVertical: 10

  },
  productItem: {
    width: 160,
    height: 300,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: Color.primary400,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',

  },
})