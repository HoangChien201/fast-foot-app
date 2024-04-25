import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import {Image} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

import { GroceryRootStackParams,GroceryRootStackScreens } from "./GroceryRootStackParams";
import { Color } from '../../contanst/color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { socket } from '../../helper/SocketHandle';
import { getCartByUserHttp } from '../../http/CartHTTP';
import { setCart } from '../store/cartReducer';

const Stack=createStackNavigator<GroceryRootStackParams>();

export default function GroceryStack():React.JSX.Element{
    const user=useSelector((state:RootState)=>state.user.value)
    const dispatch=useDispatch()

    async function getCartApi() {
        if(!user) return
        const respone= await getCartByUserHttp(user.id)
        dispatch(setCart(respone.cart))
    }

    useEffect(()=>{
        getCartApi()
    },[])

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