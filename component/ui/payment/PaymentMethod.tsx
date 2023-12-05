import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../../contanst/color'

type MethodType={id:string, name: string, icon: any }
const methods:MethodType[] = [
    {
        id:'method-card',
        name: 'Card Credit',
        icon: require('../../../assets/images/icon/icon-card-credit.png')
    },
    {
        id:'method-cash',
        name: 'Cash on delivery',
        icon: require('../../../assets/images/icon/icon-cash.png')
    },

]

const PaymentMethod = ({updateValuePayment}:{updateValuePayment:any}) => {
    const [isActiveMethod,setIsActiveMethod]=useState('')

    useEffect(()=>{
        if(isActiveMethod){
            const method=methods.find(item=>item.id===isActiveMethod)
            updateValuePayment("paymentMethod",method?.name)
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
            <Text style={styles.title}>Payment Method</Text>
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
        backgroundColor: Color.primary100,
        padding: 16,
        marginBottom: 23,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(109, 56, 5, 0.11)'
    },
    title: {
        color: Color.textBrown,
        fontWeight: 'bold',
        fontSize: 18
    },
    methodComponent: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        width: '100%',
        paddingHorizontal: 16,
    },
    iconMethod: {
        width: 40,
        height: 40,
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