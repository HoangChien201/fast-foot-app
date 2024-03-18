import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { OptionIsSelectedType, OptionOfTitle, OptionType } from '../../store/productReducer'
import { getOptionDetailAll } from '../../../http/ProductHTTP'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const ShowOptionsDetail = ({ options, instructions }: { options: Array<OptionType>, instructions?: string }) => {
    const optionDetails=useSelector((state:RootState)=>state.optionDetail.value)
        
    function Option({ title }: { title:string }) {
        
        const optionDetailIsSelected=optionDetails.filter((item)=>{
            const idOptionDetail=Object.getOwnPropertyDescriptor(options, title)?.value
            if(idOptionDetail.includes(item._id)){  
                return item
            }
        }).map((item)=>item.name)
        
        return (
            <View style={styles.optionContainer}>
                <Text style={styles.title}>{title}: </Text>
                <Text style={styles.options}>{optionDetailIsSelected.join(',')}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {
                Object.getOwnPropertyNames(options).map((item) => {
                    return (
                        <View key={item}>
                            <Option title={item}/>
                        </View>
                    )
                })
            }
            {
                instructions &&
                <View style={styles.optionContainer}>
                    <Text style={styles.title}>Instruction: </Text>
                    <Text style={styles.options}>{instructions}</Text>
                </View>
            }
        </View>
    )
}

export default ShowOptionsDetail

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000'
    },
    options: {

    },
})