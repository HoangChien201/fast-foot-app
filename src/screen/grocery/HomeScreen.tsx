import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../component/store/store'
import Poster from '../../component/ui/Poster'
import ProductItem from '../../component/ui/ProductItem'
import ModalAddCart from '../../component/ui/cart/ModalAddCart'
import {getProduct } from '../../http/ProductHTTP'
import { loadProduct } from '../../component/store/productReducer'
import Loading from '../../component/ui/Loading'
import HappyDeal from '../../component/ui/grocery/HappyDeal'
import RecentOrderProduct from '../../component/ui/grocery/RecentOrderProduct'
import RecommentProduct from '../../component/ui/grocery/RecommentProduct'
import Exclusively from '../../component/ui/grocery/Exclusively'
import AddressUserConponent from '../../component/ui/address/AddressUserConponent'
const HomeScreen = () => {
  const dispatch = useDispatch()
  const products= useSelector((state:RootState)=>state.product.value)

  const [visibleModalAdd, setVisibleModalAdd] = useState<number>();
  const [isLoading, setIsLoading] = useState(false)
  
  function OpenModalAdd(id: number): void {
    setVisibleModalAdd(id)
  }

  async function getProductAPI() {
    //hiện loading
    setIsLoading(true)

    const products = await getProduct()
    
    dispatch(loadProduct(products))

    //ẩn loading
    setIsLoading(false)
  }

  useEffect(()=>{
    getProductAPI()
  },[])


  function onScrollEndDrag(){
    // getProductAPI()
  }
  return (
    <View style={[styles.container, { opacity: visibleModalAdd ? 0.5 : 1 }]}>
      <Loading isLoading={isLoading} />
      <ModalAddCart visible={visibleModalAdd} setVisible={setVisibleModalAdd} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={onScrollEndDrag}>
          <AddressUserConponent/>
          <HappyDeal />
          <Poster />
          {/* <RecentOrderProduct openModalAdd={OpenModalAdd} /> */}
          {/* <RecommentProduct openModalAdd={OpenModalAdd} /> */}
          <Exclusively />

          <FlatList
            data={products}
            renderItem={({ item }) => {
              return (
                <View style={styles.productItem}>
                  <ProductItem product={item} type='row' addPress={OpenModalAdd} />
                </View>
              )
            }}
            keyExtractor={(item)=>item.id.toString()}
            scrollEnabled={false}
          />
        </ScrollView>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  mostPopularContainer: {
    flex: 1,
    marginTop: 10
  },
  productItem: {
    height: 120,
    width: "100%",
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#000'
  }
})