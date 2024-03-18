import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { AccountRootStackScreens,AccountRootStackParams } from './AccountRootStackParams';
import { Image } from 'react-native';
import { Color } from '../../contanst/color';


const Stack=createStackNavigator<AccountRootStackParams>();

export default function AccountStack():React.JSX.Element{
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackImage:()=>{
                    return <Image source={require('../../assets/images/icon/icon-back.png')}/>
                },
                cardStyle:{
                    backgroundColor:'#fff'
                },
                
            }}
            initialRouteName='ProfileScreen'
        >
            {
                AccountRootStackScreens.map((item,index)=>{
                    return <Stack.Screen
                        key={item.id}
                        component={item.component}
                        name={item.name}
                        options={item.options}
                    />
                })
            }
        </Stack.Navigator>
    )
}