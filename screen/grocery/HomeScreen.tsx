import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../component/store/store'
import Poster from '../../component/ui/Poster'
import ProductItem from '../../component/ui/ProductItem'
import ModalAddCart from '../../component/ui/cart/ModalAddCart'
import { getOptionDetail, getOptionDetailAll, getProduct } from '../../http/ProductHTTP'
import { loadProduct } from '../../component/store/productReducer'
import { loadOptionDetail } from '../../component/store/optionDetailReducer'
import Loading from '../../component/ui/Loading'
const HomeScreen = () => {
  const dispatch=useDispatch()
  const listProduct = useSelector((state: RootState) => state.product.value)
  const [visibleModalAdd,setVisibleModalAdd]=useState('');
  const [isLoading,setIsLoading]=useState(false)

  const listPoster = [
    require("../../assets/images/advertisement/poster-1.jpg"),
    require("../../assets/images/advertisement/poster-2.jpg"),
    require("../../assets/images/advertisement/poster-3.jpg")]

    function OpenModalAdd(id:string):void{
      setVisibleModalAdd(id)
    }

    async function getProductAPI(){
      //hiện loading
      setIsLoading(true)

      const products=await getProduct()
      const optionDetail=await getOptionDetailAll()
      dispatch(loadProduct(products))
      dispatch(loadOptionDetail(optionDetail))

      //ẩn loading
      setIsLoading(false)
    }

    useEffect(()=>{
      getProductAPI()
    },[])

  return (
    <View style={[styles.container,{opacity:visibleModalAdd ? 0.5 : 1}]}>
      <Loading isLoading={isLoading}/>
      <ModalAddCart visible={visibleModalAdd} setVisible={setVisibleModalAdd}/>

      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            listPoster.map((item, index) => {
              return <Poster image={item} key={index} />
            })
          }

          <View style={styles.mostPopularContainer}>

            <Text style={styles.title}>Most Popular Items</Text>
            {

              listProduct.length >0 && listProduct.map((item, index) => {
                return (
                  <View style={styles.productItem} key={index}>
                    <ProductItem product={item} type='row' addPress={OpenModalAdd}/>
                  </View>
                )
              })

            }
          </View>

        </ScrollView>
      </>
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
    height:120,
    width: "100%",
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom:10
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#000'
  }
})