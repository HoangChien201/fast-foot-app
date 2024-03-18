import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../../contanst/color'
import { getOptionDetail } from '../../../http/ProductHTTP'

interface OptionProductCartProp {
    active?: boolean,
    optionDetail:string,
    optionPressHanle:any
}

const OptionsProductCartItem: React.FC<OptionProductCartProp> = ({ active, optionDetail,optionPressHanle }) => {
    const [optionDetailData,setOptionDetailData]=useState({})
    const idOptionDetail=optionDetail
    
    async function getOptionDetailAPI(){
        const optionDetail=await getOptionDetail(idOptionDetail.toString())
        
        setOptionDetailData(optionDetail)
    }
    useEffect(() => {
      getOptionDetailAPI()
    }, [])
    
    return (
        <TouchableOpacity onPress={optionPressHanle}>
            <View style={[styles.container, active && styles.active]}>
                <View style={[styles.iconContainer, { borderColor: active ? Color.primary200 : Color.primary400 }]}>
                    {
                        active &&
                        <IconFontAwesome name='circle' size={14} color={Color.primary200} />
                    }
                </View>
                <View style={styles.detailOpiton}>
                    <Text style={styles.nameOption}>{optionDetailData.name}</Text>
                    {
                        optionDetailData.price &&
                        <Text style={styles.priceOption}>+${optionDetailData.price}</Text>
                    }
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default OptionsProductCartItem

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 10,
        height: 60,
        backgroundColor: Color.primary300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10,
        borderColor: Color.primary300,
        paddingHorizontal:10

    },
    active: {
        borderColor: Color.primary200,
        backgroundColor: Color.primary150
    },
    iconContainer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Color.primary200,
        alignItems: 'center',
        justifyContent: "center",
        marginEnd: 10
    },
    detailOpiton: {

    },
    nameOption: {
        color: '#000',
        fontWeight: '400',
        fontSize: 14
    },
    priceOption: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14

    },
})