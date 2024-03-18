import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonCustom from '../../component/ui/ButtonCustom'
import { Color } from '../../contanst/color'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../component/store/store'

const WelcomeScreen = () => {
    const navigation=useNavigation()
    const user=useSelector((state:RootState)=>state.user.value)
    
    const address=user.address
    
    function buttonOnPress(){
        navigation.navigate("ManageAddressScreen")
    }
    function buttonContinueOnPress(){
        navigation.navigate("GroceryBottomTab")
    }
    return (
        <View style={styles.container}>
            <View style={{alignItems:'center'}}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/logo/logo-main.png')} style={styles.logo} />
                </View>
                <View>
                    <Text style={styles.heading}>Chào mừng đến{"\n"}FastFood</Text>
                    <Text style={styles.description}>Mở khóa thế giới thực phẩm bằng cách thiết lập địa chỉ giao hàng của bạn.</Text>
                </View>
            </View>
            {
                !address ? 
                <ButtonCustom onPress={buttonOnPress} textColor={Color.primary200} children='Cho chúng tôi địa chỉ của bạn' style={styles.buttonSubmit} />
                :
                <Text style={styles.buttonContinue} onPress={buttonContinueOnPress}>Tiếp tục</Text>
            }
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        padding:45,
        flex:1,
        backgroundColor:'#FF4B3A',
        justifyContent:'space-between',
        alignItems:'center'
    },
    logoContainer: {
        width:120,
        height:120,
        borderRadius:120,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    logo: {
        width:120,
        height:100
    },
    heading: {
        fontSize:40,
        color:"#fff",
        textAlign:'center',
        fontWeight:'300'
    },
    description: {
        color:"#fff",
        fontSize:18,
        width:284,
        textAlign:'center'
    },
    buttonSubmit: {
        backgroundColor:'#fff',
        borderRadius:30,
        height:50,
        paddingHorizontal:20,
        overflow:'hidden'
    },
    buttonContinue:{
        fontSize:18,
        color:"#fff",
        textAlign:'right',
        marginEnd:20
    }
})