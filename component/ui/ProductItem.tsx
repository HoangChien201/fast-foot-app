import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Pressable
}
    from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import { Color } from '../../contanst/color';
import { productType } from '../store/productReducer';

interface ProductItemProp {
    product: productType | undefined,
    type: string,
    addPress?: any
}


const ProductItem: React.FC<ProductItemProp> = ({ product, type, addPress }) => {
    const { _id, name, image, price, description } = { ...product };
    function AddPressHandle() {
        addPress(_id)
    }
    return (
        <Pressable style={({ pressed }) => pressed && styles.pressed}>

            <View style={[styles.container, type === 'row' && { flexDirection: 'row' }]}>
                <Image style={type === 'colunm' ? styles.imageColunm : styles.imageRow} source={{uri:image}} resizeMode='stretch' />
                <View style={[styles.infomationProductContainer, type === 'row' && { width: '70%' }]}>
                    <View>
                        <Text style={styles.name} ellipsizeMode='tail' numberOfLines={type === 'row' ? 1 : 2}>{name}</Text>
                        <Text style={styles.detail} ellipsizeMode='tail' numberOfLines={2}>{description}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.name}>${price}</Text>
                        {
                            addPress &&
                            <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={AddPressHandle}>
                                <View style={styles.add}>
                                    <Icon name='circle' color={Color.primary200} size={20} />
                                    <Text style={{ color: Color.primary200, fontWeight: 'bold' }}>Add</Text>
                                </View>
                            </Pressable>
                        }

                    </View>
                </View>
            </View>
        </Pressable>
    )
}
export default ProductItem;
const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    },
    container: {
        borderRadius: 15,
        width: '100%',
        height: '100%'
    },
    imageColunm: {
        width: '100%',
        height: '50%'
    },
    infomationProductContainer:{
        padding:10,
        flex:1,
        justifyContent:'space-between'
    },
    imageRow: {
        width: '30%',
        height: '100%'
    },
    name: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 2,
    },
    detail: {
        height: 40,
        fontSize: 12

    },
    add: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50,

    }
})