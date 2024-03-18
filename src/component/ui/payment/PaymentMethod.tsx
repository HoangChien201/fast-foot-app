import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../../contanst/color'

type MethodType={id:string, name: string, icon: any }
const methods:MethodType[] = [
    {
        id:'momo',
        name: 'Thanh toán bằng ví Momo',
        icon: require('../../../assets/images/icon/icon_momo.png')
    },
    {
        id:'cash',
        name: 'Thanh toán khi nhận hàng',
        icon: require('../../../assets/images/icon/icon-cash.png')
    },

]

const PaymentMethod = ({updateValuePayment}:{updateValuePayment:any}) => {
    const [isActiveMethod,setIsActiveMethod]=useState('')

    useEffect(()=>{
        if(isActiveMethod){
            updateValuePayment("paymentMethod",isActiveMethod)
        }
    },[isActiveMethod])

    function MethodComponent({method}:{method:MethodType}) {
        return (
            <Pressable onPress={()=>setIsActiveMethod(method.id)}>
                <View style={styles.methodComponent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={method.icon} style={styles.iconMethod} resizeMode='contain' />
                        <Text style={styles.nameMethod}>{method.name}</Text>
                    </View>
                    {
                        isActiveMethod===method.id && 
                        <Image source={require('../../../assets/images/icon/icon-tick-green.png')} />
                    }
                </View>
            </Pressable>

        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phương thức thanh toán</Text>
            <View>
                <FlatList
                    data={methods}
                    renderItem={({ item, index }) => {
                        if (index == 0) {
                            return <MethodComponent method={item} />
                        }
                        return (
                            <View>
                                <View style={styles.line}></View>
                                <MethodComponent method={item} />
                            </View>
                        )
                    }}
                    keyExtractor={item=>item.id}
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 23,
        elevation:2
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(109, 56, 5, 0.11)'
    },
    title: {
        color: Color.textBrown,
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical:10
    },
    methodComponent: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height:60,
        width: '100%',
        paddingHorizontal: 16,
    },
    iconMethod: {
        width: 30,
        height: 30,
        marginEnd: 10
    },
    nameMethod: {
        color: Color.textBrown,
        fontFamily: "Klarna Sans",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        textTransform: "capitalize",
    },
})