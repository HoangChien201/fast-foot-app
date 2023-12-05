import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import ButtonCustom from '../../component/ui/ButtonCustom'
import { Color } from '../../contanst/color'
import { sendMailForgotPassword } from '../../http/UserHTTP'
import { navigationType } from '../../component/navigation/ManageNavigation'
import { setToken } from '../../helper/AsyncStorageHelper'

const SendMailScreen = ({navigation}:{navigation:navigationType}) => {
    const [email,setEmail]=useState('')

    function onSubmit(){
        try {
            (async function sendMail(){
               const result=await sendMailForgotPassword(email);

               setToken("token",result.token);
                
            })()
            
            navigation.navigate("SendOTPScreen",{
                email:email
            })
        } catch (error) {
            throw error
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={[styles.forgotPassword, styles.text]}>Forgot Password ?</Text>
                    <Text style={[styles.description, styles.text]}>Don’t worry! it happens. Please enter the address associated with your account.</Text>
                </View>
                <View>
                    <Text style={[styles.lable, styles.text]}>Email ID</Text>
                    <TextInput style={styles.input} value={email} onChangeText={(text)=>setEmail(text)}/>
                </View>
            </View>
            <View style={styles.button}>
                <ButtonCustom textColor='#fff' children='Submit' onPress={onSubmit}/>
            </View>
        </View>
    )
}

export default SendMailScreen

const styles = StyleSheet.create({
    container: {
        padding: 24,
        justifyContent:"space-between",
        flex:1
    },
    text: {
        color: "#4E4B66",
        /* Display/Medium Bold */
        fontFamily: "poppins",
        letterSpacing: 0.12,
        marginBottom: 8
    },
    forgotPassword: {

        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 48, /* 150% */
        width: 190
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24, /* 150% */
    },
    lable: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21, /* 150% */
    },
    input: {
        height: 48,
        padding: 10,
        borderRadius: 6,
        borderColor: "#4E4B66",
        borderWidth: 1,
    },
    button:{
        borderRadius: 6,
        backgroundColor:Color.primary200,
        height:50
    }
})