import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'

import { RootState } from '../../component/store/store'
import OurMenuItem from '../../component/ui/OurMenuItem';
import ViewAll from '../../component/ui/ViewAll';
import Search from '../../component/ui/Search';
import ProductItem from '../../component/ui/ProductItem';
import { Color } from '../../contanst/color';
import ModalAddCart from '../../component/ui/cart/ModalAddCart'
import { CategoryType, productType } from '../../component/store/productReducer';
import { getCategory } from '../../http/ProductHTTP';
import { AxiosResponse } from 'axios';
import Loading from '../../component/ui/Loading';



export default function MenuScreen() {
    const listProduct = useSelector((state: RootState) => state.product.value)
    const [isLoading,setIsLoading]=useState(false)
    const [categoryCurrent,setCategoryCurrent]=useState<number>()
    const [categories, setCategories] = useState<CategoryType[]>()

    async function getCategoryAPI() {
        setIsLoading(true)

        const categories: CategoryType[] = await getCategory()
        setCategories([...categories])

        setIsLoading(false)
    }

    useEffect(() => {
        getCategoryAPI()
    }, [])

    const MenuItem = ({ id,name, image }: {id:number, name: string, image: any }) => {
        return (
            <TouchableOpacity style={styles.ourMenuItem} onPress={()=>setCategoryCurrent(id)}>
                <OurMenuItem name={name} image={image} active={id===categoryCurrent}/>
            </TouchableOpacity>
        )
    }

    const ProductItemScreen = ({ product, type }: { product: productType, type: string }) => {
        return (
            <View style={styles.productItem}>
                <ProductItem product={product} type={type} />
            </View>
        )
    }

    
    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading}/>

            <Search editable={false}/>
            <View style={styles.ourMenuContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Category</Text>
                    <ViewAll />
                </View>
                {
                    categories &&
                    <FlatList
                        data={[...categories]}
                        horizontal={true}
                        renderItem={({ item }: { item: CategoryType }) => {
                            return <MenuItem name={item.name} image={item.image} id={item.id}/>
                        }}
                        keyExtractor={item => item.id.toString()} 
                        showsHorizontalScrollIndicator={false}
                        />
                        
                }
            </View>
            <View style={styles.featuredContainer}>
                <Text style={styles.title}>Featured item</Text>
                <FlatList
                    data={
                        !categoryCurrent ? listProduct :
                        listProduct.filter((product)=>product.category.id===categoryCurrent)
                    }
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return <ProductItemScreen product={item} type='colunm' />
                    }}
                    keyExtractor={item => item.id.toString()}
                    columnWrapperStyle={styles.flatListRow}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom:0,
        backgroundColor: '#fff',

    },
    flatListRow: {
        justifyContent: 'space-between'
    },
    ourMenuContainer: {
        marginTop: 10,
    },
    ourMenuItem: {
        width: 95,
        height: 100,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: Color.primary400,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderRadius: 10,
        margin: 5,
        overflow: 'hidden',
        justifyContent:'center'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        maxHeight:70,
        paddingVertical: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#000',
    },
    featuredContainer: {
        flex: 1,
    },
    productItem: {
        width: '45%',
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