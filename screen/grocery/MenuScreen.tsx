import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'

import { RootState } from '../../component/store/store'
import OurMenuItem from '../../component/ui/OurMenuItem';
import ViewAll from '../../component/ui/ViewAll';
import Search from '../../component/ui/Search';
import ProductItem from '../../component/ui/ProductItem';
import { listMenuItems } from '../../contanst/value'
import { Color } from '../../contanst/color';
import ModalAddCart from '../../component/ui/cart/ModalAddCart'
import { CategoryType, productType } from '../../component/store/productReducer';
import { getCategory } from '../../http/ProductHTTP';
import { AxiosResponse } from 'axios';
import Loading from '../../component/ui/Loading';



export default function MenuScreen() {
    const listProduct = useSelector((state: RootState) => state.product.value)
    const [visibleModalAdd, setVisibleModalAdd] = useState('');
    const [isLoading,setIsLoading]=useState(false)
    const [categoryCurrent,setCategoryCurrent]=useState('')

    const [categories, setCategories] = useState<AxiosResponse<CategoryType[], any>>()

    async function getCategoryAPI() {
        setIsLoading(true)

        const categories: AxiosResponse<CategoryType[], any> = await getCategory()
        setCategories([...categories])

        setIsLoading(false)
    }

    useEffect(() => {
        getCategoryAPI()
    }, [])

    

    function OpenModalAdd(id: string): void {
        setVisibleModalAdd(id)
    }

    const MenuItem = ({ id,name, image }: {id:string, name: string, image: any }) => {
        return (
            <TouchableOpacity style={styles.ourMenuItem} onPress={()=>setCategoryCurrent(id)}>
                <OurMenuItem name={name} image={image} active={id===categoryCurrent}/>
            </TouchableOpacity>
        )
    }

    const ProductItemScreen = ({ product, type, addPress }: { product: productType, type: string, addPress: any }) => {
        return (
            <View style={styles.productItem}>
                <ProductItem product={product} type={type} addPress={addPress} />
            </View>
        )
    }

    
    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading}/>
            <ModalAddCart visible={visibleModalAdd} setVisible={setVisibleModalAdd} />

            <Search />
            <View style={styles.ourMenuContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Our Menu</Text>
                    <ViewAll />
                </View>
                {
                    categories &&
                    <FlatList
                        data={[...categories]}
                        horizontal={true}
                        renderItem={({ item }: { item: CategoryType }) => {
                            return <MenuItem name={item.name} image={item.image} id={item._id}/>
                        }}
                        keyExtractor={item => item._id} 
                        showsHorizontalScrollIndicator={false}
                        />
                        
                }
            </View>
            <View style={styles.featuredContainer}>
                <Text style={styles.title}>Featured Items</Text>
                <FlatList
                    data={
                        !categoryCurrent ? listProduct :
                        listProduct.filter((product)=>product.category._id===categoryCurrent)
                    }
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return <ProductItemScreen product={item} type='colunm' addPress={OpenModalAdd} />
                    }}
                    keyExtractor={item => item._id}
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
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingVertical: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#000',
    },
    featuredContainer: {
        marginVertical: 10,
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