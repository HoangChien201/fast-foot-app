import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductItem from '../ProductItem'
import { product } from '../../../contanst/contanst'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { getProductTopHTTP } from '../../../http/ProductHTTP'

const RecommentProduct = ({openModalAdd}:{openModalAdd:any}) => {

  const products=useSelector((state:RootState)=> state.product.value)

  const [productTop,setProductTop]=useState([])

  async function getRroductTop() {
      const result = await getProductTopHTTP()
      setProductTop(result)
  }

  useEffect(()=>{
    getRroductTop()
  },[])

  const renderItem=({item}:{item:{product:string,amount:number}})=>{
    const product=products.find(product=>product._id === item.product)
    return (
      <View style={styles.productItem}>
        <ProductItem product={product} addPress={openModalAdd} type='row' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đề xuất cho bạn</Text>
      <FlatList
        data={productTop}
        renderItem={renderItem}
        keyExtractor={(item) => item.product}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default RecommentProduct

const styles = StyleSheet.create({
    container:{
        marginBottom:16
    },
    heading: {
        fontSize: 24,
        fontFamily: 'poppins',
        letterSpacing: 0.67,
        fontWeight: '700',
        color:'#000',
        marginVertical:10
    },
    productItem: {
        height:120,
        width: 360,
        overflow: 'hidden',
        borderRadius: 20,
        marginRight:10
      },
})