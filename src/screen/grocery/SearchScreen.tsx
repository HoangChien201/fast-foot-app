import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Search from '../../component/ui/Search'
import { product } from '../../contanst/contanst'
import ProductItem from '../../component/ui/ProductItem'
import { searchProductHTTP } from '../../http/ProductHTTP'

const SearchScreen = () => {
    const searchRecent :Array<{_id:string,name:string}>= [{_id:'1',name:'Cơm'}, {_id:'2',name:'Bò'}, {_id:'3',name:'Burger'}, {_id:'4',name:'Gà'}]
    const [resultSearch,setResultSearch]=useState([])
    function RecentItem({item}:any) {
        return (
            <TouchableOpacity style={styles.rencentItemContainer} onPress={RecenItemOnPress.bind(this,item.name)}>
                <Text style={styles.rencentItem}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    function RecenItemOnPress(name:string){
        searchProductAPI(name);

    }

    async function searchProductAPI(name:string) {
        const result=await searchProductHTTP(name);
        setResultSearch([...result])
    }

    function SearchOnChangeText(text:string){
        searchProductAPI(text);
    }

    return (
        <View style={styles.container}>
            <View style={{flex:0.2,padding:10}}>
                <Search editable={true} onChangeText={SearchOnChangeText}/>
                <View style={styles.searchRecent}>
                    <FlatList
                        data={searchRecent}
                        renderItem={({item})=>{
                            return (
                                <RecentItem item={item}/>
                            )
                        }}
                        keyExtractor={item =>item._id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            <View style={styles.resultSearch}>
                    <FlatList
                        data={resultSearch}
                        renderItem={({item})=>{
                            return (
                                <View style={styles.productItem}>
                                    <ProductItem product={item} type='row'/>
                                </View>
                            )
                        }}
                        keyExtractor={item=>item.id}
                        showsVerticalScrollIndicator={false}
                    />
            </View>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#EA4637",
        flex:1
    },
    searchRecent:{
        marginVertical:23,
    },
    rencentItemContainer: {
        borderRadius:15,
        borderColor:'#fff',
        borderWidth:1,
        height:32,
        width:100,
        justifyContent:"center",
        alignItems:"center",
        marginEnd:7
    },
    rencentItem: {
        fontSize:16,
        fontWeight:'400',
        fontFamily:'roboto',
        color:'#fff'
    },
    resultSearch:{
        flex:0.9,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        padding:16

    },
    productItem: {
        height: 120,
        width: "100%",
        overflow: 'hidden',
        borderRadius: 20,
        marginBottom: 10
      },
})