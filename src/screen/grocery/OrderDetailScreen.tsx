import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { NavigationProp, ParamListBase, RouteProp, useRoute } from '@react-navigation/native'

import { Color } from '../../contanst/color'
import { billDeliveryResType, billDeliveryType } from '../../component/store/billDeliveryReducer'
import CartItem from '../../component/ui/cart/CartItem'
import { getBillDeliveryHTTP } from '../../http/BillHTTP'
import Loading from '../../component/ui/Loading'
import OrderCartItem from '../../component/ui/cart/OrderCartItem'

interface OrderDetailScreenProp {
    navigation: NavigationProp<ParamListBase>
  }

const OrderDetailScreen:React.FC<OrderDetailScreenProp> = ({navigation}) => {
    const router: RouteProp<{ params: { value: string } }, 'params'> = useRoute()
    const [valueBill, setValueBill] = useState<billDeliveryResType>()
    const [isLoading, setIsLoading] = useState(true)

    const idBill = router?.params?.idBill


    useEffect(() => {
        (async function getBillDelivery() {
            const bill = await getBillDeliveryHTTP(idBill);
            setValueBill(bill)
            setIsLoading(false)
        })()

    }, [idBill])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackImage:()=><TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}><Image source={require('../../assets/images/icon/icon-arrow-down.png')}/></TouchableOpacity>
        })
    },[])

    return (
        <View style={styles.container}>
            {
                isLoading ? <Loading isLoading={isLoading} />
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={styles.headingContainer}>
                            <View style={styles.idContainer}>
                                <Text style={styles.title}>Order ID: </Text>
                                <Text style={styles.idOrder}>{valueBill && valueBill._id}</Text>
                            </View>
                            <Text style={styles.time}>{valueBill && valueBill.timeOrder.toString()}</Text>
                        </View>
                        <View style={styles.estimateDeliveryTimeContainer}>
                            <Text style={styles.description}>Your estimate delivery time</Text>
                            <Text style={styles.timeEstimate}>15 minute</Text>
                        </View>
                        <View style={styles.userContainer}>
                            <View style={styles.flexRow}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                        source={{ uri: valueBill?.staff.avatar }}
                                        style={styles.avatar}
                                    />
                                </View>
                                <Text style={styles.nameUser}>{valueBill && valueBill.staff.fullname}</Text>
                            </View>

                            <TouchableOpacity style={styles.iconPhoneContainer}>
                                <Image style={styles.iconPhone} source={require('../../assets/images/icon/telephone-call.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.paymentInfoContainer}>
                            <Text style={styles.title}>Payment Info</Text>
                            <View style={styles.flexRow}>
                                <Text style={styles.titleInfo}>Method: </Text>
                                <Text style={styles.methodPayment}>{valueBill && valueBill.methodPayment}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.titleInfo}>Status: </Text>
                                <Text style={styles.statusPayment}>{valueBill && valueBill.payment}</Text>
                            </View>
                        </View>
                        <View style={styles.orderSummaryContainer}>
                            <Text style={styles.title}>Order Summary</Text>
                            <FlatList
                                data={valueBill?.cart}
                                renderItem={
                                    ({ item }) => {
                                        return <OrderCartItem data={item} />
                                    }
                                }
                                keyExtractor={(item) => item._id}
                                scrollEnabled={false}
                            />
                        </View>
                    </ScrollView>
            }

        </View>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 80,
        overflow: 'hidden',
        marginEnd: 10
    },
    avatar: {
        width: '100%',
        height: '100%',

    },
    headingContainer: {

    },
    idContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    title: {
        color: "#000",
        fontSize: 18,
        letterSpacing: 0.24,
        fontWeight: 'bold',
        marginVertical: 10
    },
    idOrder: {
        color: '#7cabb1',
        fontSize: 18,
        letterSpacing: 0.24,
        fontWeight: 'bold'

    },
    time: {
        fontSize: 16,
        color: Color.primary400
    },
    estimateDeliveryTimeContainer: {
        width: '100%',
        alignItems: "center",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: Color.primary400

    },
    timeEstimate: {
        fontSize: 30,
        color: "#000",
        letterSpacing: 0.24,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    nameUser: {
        color: "#000",
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconPhoneContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Color.primary150
    },
    iconPhone: {
        width: '40%',
        height: '40%'
    },
    paymentInfoContainer: {
        height: 80,
        justifyContent: "space-between"
    },
    titleInfo: {
        fontSize: 16,
        color: Color.primary400,
        fontWeight: '500'
    },
    methodPayment: {
        fontSize: 16,
        color: Color.primary500,
        fontWeight: '600'
    },
    statusPayment: {
        color: '#8ac5aa',
        fontSize: 16,
        fontWeight: '600'

    },
    orderSummaryContainer: {
        marginTop: 10
    }
})