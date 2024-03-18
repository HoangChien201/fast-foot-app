import 'react-native-gesture-handler';
import React from "react";
import {Image} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

import { GroceryRootStackParams,GroceryRootStackScreens } from "./GroceryRootStackParams";
import { Color } from '../../contanst/color';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Omit } from 'react-native';
import { DefaultRouterOptions } from '@react-navigation/native';
import { socket } from '../../helper/SocketHandle';

const Stack=createStackNavigator<GroceryRootStackParams>();

export default function GroceryStack():React.JSX.Element{
    const user=useSelector((state:RootState)=>state.user.value)
    socket.on(`notification-${user?.id}`,(notification)=>{
        console.log(notification);
        
    })
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackImage:()=>{
                    return <Image source={require('../../assets/images/icon/icon-back.png')} style={{marginStart:6}}/>
                },
                headerTitleStyle:{
                    color:Color.primary200,
                    fontSize:24,
                    fontWeight:'bold',
                    fontFamily:'Klarna Text',
                    letterSpacing:-0.165,
                },
                headerTitleAlign:'center',
                cardStyle:{
                    backgroundColor:"#fff",
                    flex:1
                },
                
            }}
        >
            {
                GroceryRootStackScreens.map((item,index)=>{
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