import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Color } from '../../../contanst/color'
import OptionsProductCartItem from './OptionsProductCartItem'
import { productType, OptionType } from '../../store/productReducer'
import OptionOfTypeComponent from './OptionOfTypeComponent'


const OptionProductCartComponent = ({ product, updateValue }: { product?: productType, updateValue: any }) => {
    const [valueInstruction, setValueInstruction] = useState('')
    const [valueOptions, setValueOptions] = useState({})
    useEffect(() => {

        updateValue({
            options: valueOptions,
            instructions: valueInstruction
        })

    }, [valueOptions, valueInstruction])


    //kiểu value option nhận về
    /*{
        "ten option":['idOoption',....],
        "ten option":['idOoption',....]
        }
    */

    const updateValueOptions = (value: { type: string, ids: Array<string> }) => {
        setValueOptions((prevOption) => {
            return { ...prevOption, [value.type]: value.ids }
        })
    }

    //hiện danh sách các option theo từng option
    const renderItemOptions = ({ item: itemOption }: { item: OptionType }) => {
        return (
            <OptionOfTypeComponent itemOption={itemOption} updateValueOption={updateValueOptions} />
        )
    }

    return (
        <View>
            <View style={{flex:1}}>
                <FlatList
                    data={product?.options}
                    renderItem={renderItemOptions}
                    keyExtractor={item => item.name}
                    scrollEnabled={false}
                    
                />
            </View>
            <View>
                <Text style={styles.title}>Special instructions</Text>
                <View>
                    <TextInput
                        placeholder='Add note (extra cheese, etc...'
                        value={valueInstruction}
                        onChangeText={(text) => setValueInstruction(text)}
                        style={styles.inputInstruction}
                        multiline={true}
                        numberOfLines={2}
                    />
                </View>
            </View>
        </View>
    )
}

export default OptionProductCartComponent

const styles = StyleSheet.create({
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
    title: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 18,
        marginVertical: 10
    },
})