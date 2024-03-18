import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExclusivelyItem from './ExclusivelyItem'

const Exclusively = () => {
    const data = ['Giảm tới 33%',
        'Giảm giá đặc biệt cho đơn hàng trực tuyến',
        'Ưu đãi độc quyền cho thành viên VIP',
        'Mua 3 sản phẩm, giảm ngay 20.000!']
    const backgroundColors = ['#C80019', '#F1A100', '#EE6100', '#F14FB1']
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Duy nhất tại của hàng</Text>
            <FlatList
                data={data}
                renderItem={({item,index})=>{
                    return <ExclusivelyItem title={item} backgroundColor={backgroundColors[index]} />
                }}
                keyExtractor={(item)=>item}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            
        </View>
    )
}

export default Exclusively

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        height: 150,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'poppins',
        letterSpacing: 0.67,
        fontWeight: '700',
        color: '#000',
        marginVertical: 10
    },
})