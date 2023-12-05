import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Ionicon from 'react-native-vector-icons/Ionicons'

import ProductItem from '../ProductItem'
import { RootState } from '../../store/store'
import ButtonIcon from '../ButtonIcon'
import { Color } from '../../../contanst/color'
import OptionProductCartComponent from './OptionProductCartComponent'
import { OptionIsSelectedType, OptionType } from '../../store/productReducer'
import { addCart } from '../../store/cartReducer'
import { optionsProduct } from '../../../contanst/value'
import { SumPriceOptionAProduct } from '../../../contanst/Calculate'
import { addCartHttp, addCartItemHttp } from '../../../http/CartHTTP'
import { getClientbyUserHTPP, getClientbyUserHTTP } from '../../../http/UserHTTP'

export type valueOptionType = {
    options:OptionIsSelectedType,
    instrustions: string
}
//kiểu value option nhận về
    /*{
        "ten option":['idOoption',....],
        "ten option":['idOoption',....]
        }
    */
const AddCartComponent = ({ id, hideModal }: { id: string, hideModal: any }) => {
    const dispatch = useDispatch()

    const user=useSelector((state:RootState)=>state.user.value)
    const optionDetails=useSelector((state:RootState)=>state.optionDetail.value)
    const listProduct = useSelector((state: RootState) => state.product.value)

    const product = listProduct.find((item) => item._id === id)
    const [quantityValue, setQuantityValue] = useState('1');
    const [totalPrice, setTotalPrice] = useState(0)
    const [valueOption, setValueOption] = useState({})
    let { options:optionSelected, instructions }: { options?: OptionIsSelectedType, instructions?: string } = { ...valueOption }
    
    //option
    useEffect(() => {
        if (optionSelected && product) {
            const sumPriceOption = SumPriceOptionAProduct(optionSelected,optionDetails)
            setTotalPrice(sumPriceOption + (parseInt(quantityValue) * parseFloat(product?.price)))
        }
    }, [valueOption, quantityValue])

    //quantity
    function OnChangeTextQuantity(text: string) {
        setQuantityValue(text)
    }
    function IncreaseQuantity() {
        setQuantityValue((quantityValuePrev) => { return (parseInt(quantityValuePrev) + 1).toString() })
    }
    function DecreaseQuantity() {
        setQuantityValue((quantityValuePrev) => {
            return (parseInt(quantityValuePrev) - 1).toString()
        })
    }
    //quantity

    //option
    function UpdateValueOption(value: valueOptionType) {
        setValueOption(prevValueOption => {
            return { ...prevValueOption, ...value }
        })

    }
    //option


    const OnSubmit = async () => {
        if (product) {
            if (Object.getOwnPropertyNames(optionSelected).length < product?.options.length) {
                Alert.alert('Thông báo', 'Chưa chọn đủ option')
            }
            else {
                let optionIsSelected=Object.getOwnPropertyNames(optionSelected).map((item) => {
                    return [
                            item,
                            Object.getOwnPropertyDescriptor(optionSelected, item)?.value                    
                    ]
        
                })
                const resultCartDetail=await addCartItemHttp({
                    product: product?._id,
                    optionIsSelected: optionIsSelected,
                    quantity: parseInt(quantityValue),
                    instruction: instructions,
                    status:'cart',
                    cart:user?.client?.cart,
                    total:totalPrice
                })
                dispatch(addCart(resultCartDetail))
                hideModal()
            }
        }
    }

    return (

        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.productItem}>
                        <ProductItem product={product} type='row' />
                    </View>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.title}>Quantity:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50 }}>
                            <View style={styles.quantityController}>
                                <ButtonIcon name='minuscircleo' size={20} color={quantityValue === '0' ? Color.primary400 : Color.primary200} onPress={quantityValue === '0' ? null! : DecreaseQuantity} />
                                <TextInput value={quantityValue.toString()} style={styles.inputQuantity} keyboardType='numeric' onChangeText={OnChangeTextQuantity} />
                                <ButtonIcon name='pluscircleo' size={20} color={Color.primary200} onPress={IncreaseQuantity} />
                            </View>
                        </View>
                    </View>
                    <OptionProductCartComponent product={product} updateValue={UpdateValueOption} />
                </View>
                <TouchableOpacity style={styles.buttonSubmit} onPress={OnSubmit}>
                    <Ionicon name='bag' size={24} color='#fff' />
                    <Text style={styles.addToCart}>Add to cart - ${totalPrice.toFixed(2)}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default AddCartComponent

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: "space-between"
    },
    title: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 18,
        marginVertical: 10
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    quantityController: {
        flexDirection: 'row',
        height: '100%',
        justifyContent: "center",
        alignItems: 'center'

    },
    inputQuantity: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 50
    },
    optionsMore: {
        flexDirection: 'row',
        alignItems: "center"
    },
    inputInstruction: {
        borderRadius: 10,
        borderColor: Color.primary400,
        borderWidth: 1,
        minHeight: 50,
        paddingHorizontal: 10
    },
    buttonSubmit: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        backgroundColor: Color.primary200,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    addToCart: {
        fontSize: 18,
        color: '#fff',
        marginStart: 10,
        fontWeight: 'bold'
    },
    productItem: {
        height: 120,
        width: "100%",
        overflow: 'hidden',
        borderRadius: 20,
        marginBottom: 10
    },
})