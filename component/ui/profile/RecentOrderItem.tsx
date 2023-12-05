import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color';
import { billDeliveryResType } from '../../store/billDeliveryReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const RecentOrderItem = ({bill}:{bill:billDeliveryResType}) => {

    const listProduct=useSelector((state:RootState)=>{return state.product.value})

    const listImage = bill.cart.filter((item,index)=>{
        return index < 3
    })
    .map((item)=>{
        const product=listProduct.find(product=>product._id===item.product)
        return product?.image
    })

    const nameProduct= bill.cart.filter((item,index)=>{
        return index < 3
    })
    .map((item)=>{
        const product=listProduct.find(product=>product._id===item.product)
        return product?.name
    })

    return (
        <Pressable style={({pressed})=>pressed && styles.pressed}>
        <View style={styles.container}>
            <View style={[styles.box, { flexDirection: 'row' }]}>
                {
                    listImage.map((item, index) => {
                        return (
                            <Image source={{uri:item}} style={[styles.image, { left: index * 33 }]} key={index} />
                        )
                    })
                }
            </View>
            <View style={styles.box}>
                <Text style={styles.name} numberOfLines={1}>{nameProduct.join(', ')}</Text>
            </View>
            <View style={[styles.box, { flexDirection: 'column' }]}>
                <Text style={styles.date}>{bill.timeOrder}</Text>
                <View style={styles.priceWrapper}>
                    <Text style={styles.price}>${bill.summary.total.toFixed(2)}</Text>
                </View>
            </View>
        </View>
        </Pressable>
    )
}

export default RecentOrderItem;

const styles = StyleSheet.create({
    pressed:{
        opacity:0.7
    },
    container: {
        width: '100%',
        height: 100,
        backgroundColor: Color.primary150,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical:5
    },
    box: {
        width: '30%',
        height: '100%',
        justifyContent: "center",
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        position: 'absolute',
        borderRadius: 25
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        fontStyle:"italic"
    },
    date: {
        color: '#000'
    },
    priceWrapper: {
        width:80,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:15,
        marginTop:5
    },
    price: {
        color: '#000',
        fontWeight: 'bold',
        
    },
})