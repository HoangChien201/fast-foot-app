import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState,useEffect } from 'react'
import OptionsProductCartItem from './OptionsProductCartItem'
import { Color } from '../../../contanst/color';
import { OptionType } from '../../store/productReducer';


const arrayString: string[] = [];
const OptionOfTypeComponent = ({ itemOption,updateValueOption }: { itemOption: OptionType,updateValueOption:any }) => {
    const [optionDetails, setOptionDetails] = useState(arrayString);
    
    const optionDetailOnPress=(id:string)=>{
        setOptionDetails(prev=>{
            if(prev.includes(id)){
                return prev.filter(item=>item !==id)
            }
            return [...prev,id]
        })
    }

    //update danh sách id optionDetail
    useEffect(() => {
        updateValueOption({type:itemOption.name,ids:optionDetails})
      
    }, [optionDetails])
    
    return (
        <View>
            <Text style={styles.title}>{itemOption.name}</Text>
            <View style={styles.optionsMore}>
                <FlatList
                    data={itemOption.optionDetails}
                    renderItem={({ item, index }) => {
                        return (
                            <OptionsProductCartItem
                                active={optionDetails.includes(item)}
                                optionDetail={item}
                                optionPressHanle={optionDetailOnPress.bind(this,item)} />

                        )
                    }}
                    keyExtractor={item => item}
                    horizontal={true}
                />
            </View>

        </View>
    )
}

export default OptionOfTypeComponent

const styles = StyleSheet.create({
    optionsMore: {
        flexDirection: 'row',
        alignItems: "center"
    },
    title: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 18,
        marginVertical: 10
    },
})