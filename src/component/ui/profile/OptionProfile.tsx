import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { navigationType } from '../../navigation/ManageNavigation'
import { useNavigation } from '@react-navigation/native'

const OptionProfile = () => {
    const navigation=useNavigation()

    function OptionHorizontalItem({ image, text,onPress }: { image: any, text: string,onPress?:any }) {
        return (
            <TouchableOpacity style={styles.optionHorizontalItem} onPress={onPress}>
                <Image source={image} />
                <Text style={{color:"#000",fontSize:12,fontWeight:'400'}}>{text}</Text>
            </TouchableOpacity>
        )
    }

    function OptionVerticalItem({ text,onPress }: { text: string,onPress?:any }) {
        return (
            <TouchableOpacity style={styles.optionVerticalItem} onPress={onPress}>
                <Text style={{color:"#000",fontSize:18,fontWeight:'700'}}>{text}</Text>
                <Image source={require('../../../assets/images/icon/icon-arrow-br-right.png')} />
            </TouchableOpacity>
        )
    }

    function OptionTextItem({ text,onPress }: { text: string,onPress?:any }) {
        return (
            <TouchableOpacity style={styles.optionTextItem} onPress={onPress}>
                <Text style={{color:"#000",fontSize:17,fontWeight:'400'}}>{text}</Text>
            </TouchableOpacity>
        )
    }

    function navigationScreen(screen:string){
        navigation.navigate(`${screen}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.optionHorizontal}>
                <OptionHorizontalItem 
                    text='Bookmarks' 
                    image={require('../../../assets/images/icon/bookmark-o.png')}
                    onPress={navigationScreen.bind(this,'BookmarkScreen')}
                    />
                <OptionHorizontalItem 
                    text='Notifications' 
                    image={require('../../../assets/images/icon/bell.png')}
                    onPress={navigationScreen.bind(this,'NotificationScreen')}
                    />
                <OptionHorizontalItem 
                    text='Settings' 
                    image={require('../../../assets/images/icon/setting.png')}
                    onPress={navigationScreen.bind(this,'SettingScreen')}
                    />
                <OptionHorizontalItem 
                    text='Payments' 
                    image={require('../../../assets/images/icon/credit-card.png')}
                    onPress={navigationScreen.bind(this,'ManagerPaymentScreen')}
                    />
            </View>
            <View style={styles.optionVertical}>
                <OptionVerticalItem text='Your Orders' onPress={navigationScreen.bind(this,'RecentOrderScreen')}/>
                <OptionVerticalItem text='Feedback & Refunds' onPress={navigationScreen.bind(this,'FeedbackScreen')}/>
                <OptionVerticalItem text='My Preferences'/>
                <OptionVerticalItem text='Help' onPress={navigationScreen.bind(this,'MessageScreen')}/>
            </View>
            <View style={styles.optionText}>
                <OptionTextItem text='Send Feedback'/>
                <OptionTextItem text='Report an Emergency'/>
                <OptionTextItem text='Rate us on the Play Store'/>
                <OptionTextItem text='Logout'/>
            </View>
        </View>
    )
}

export default OptionProfile

const styles = StyleSheet.create({
    container: {},
    optionHorizontal: {
        height:54,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        marginVertical:36
    },
    optionHorizontalItem: {
        height:'100%',
        width:75,
        backgroundColor:'#fff',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    optionVertical: {
        height:300,
        justifyContent:"space-between"
    },
    optionVerticalItem: {
        paddingHorizontal:20,
        width:'100%',
        height:60,
        backgroundColor:'#fff',
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    optionText:{
        height:136,
        justifyContent:'space-between',
        marginTop:10
    },
    optionTextItem: {
        width:'100%',
        height:30,
        justifyContent:'center',
        paddingHorizontal:10,

    },

})