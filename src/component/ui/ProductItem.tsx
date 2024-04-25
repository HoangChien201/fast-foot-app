import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Pressable
}
from 'react-native';
import { productType } from '../store/productReducer';
import { useDispatch } from 'react-redux';
import { setDataAddCart } from '../store/modalAddCartReducer';
import { CURRENCY_VND } from '../../contanst/FormatCurrency';

interface ProductItemProp {
    product: productType | undefined,
    type: string,
}


const ProductItem: React.FC<ProductItemProp> = ({ product, type}) => {
    const dispatch=useDispatch()
    const { id, name, image, price, description } = { ...product };
    function AddPressHandle() {
        dispatch(setDataAddCart({
            product_id:id,
            visible:true
        }))
    }
    return (
        <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={AddPressHandle}>

            <View style={[styles.container, type === 'row' && { flexDirection: 'row' }]}>
                {
                    image &&
                    <Image style={type === 'colunm' ? styles.imageColunm : styles.imageRow} source={{ uri: image }} resizeMode='stretch' />
                }
                <View style={[styles.infomationProductContainer, type === 'row' && { width: '70%' }]}>
                    <View>
                        <Text style={styles.name} ellipsizeMode='tail' numberOfLines={type === 'row' ? 1 : 2}>{name}</Text>
                        <Text style={styles.detail} ellipsizeMode='tail' numberOfLines={2}>{description}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.name}>{CURRENCY_VND(price ? price : 0)}</Text>
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
    infomationProductContainer: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-between'
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