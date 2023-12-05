import { FlatList, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'

type tableType={
    id:string,
    name:string,
    active:boolean
}

const listTable:tableType[]=[
    {
        id:'123',
        name:'1',
        active:false
    },
    {
        id:'314',
        name:'2',
        active:false
    },
    {
        id:'564',
        name:'3',
        active:false
    },
    {
        id:'456',
        name:'4',
        active:false
    },
    {
        id:'261',
        name:'5',
        active:true
    },
    {
        id:'631',
        name:'6',
        active:false
    },
    {
        id:'543',
        name:'7',
        active:true
    },
    {
        id:'975',
        name:'8',
        active:false
    },
    {
        id:'784',
        name:'9',
        active:false
    },
]
const TablesScreen = () => {
    function TableOnPress(){

    }
    function RenderItem({item}:{item:tableType}){        
        return (
            <TouchableOpacity onPress={TableOnPress}>
                <Image 
                style={styles.imageTable} 
                source={item.active ? require('../../assets/images/icon/icon-table-active.png') : require('../../assets/images/icon/icon-table-empty.png')}/>
            </TouchableOpacity>
        )
    }
  return (
    <View style={styles.container}>
        <FlatList
            data={listTable}
            renderItem={RenderItem}
            keyExtractor={item=>item.id}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={{flex:1,justifyContent:'space-between'}}
        />
    </View>
  )
}

export default TablesScreen

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:16
    },
    imageTable:{
        marginVertical:30
    }
})