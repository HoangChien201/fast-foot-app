import React from "react"

import CartScreen from "../../screen/grocery/CartScreen"
import HomeScreen from "../../screen/grocery/HomeScreen"
import MenuScreen from "../../screen/grocery/MenuScreen"
import VoucherScreen from "../../screen/grocery/VoucherScreen"

import Icon from 'react-native-vector-icons/FontAwesome'
import AccountStack from "../stack/AccountStack"

enum GroceryRootBottomTabEnum{
    MenuScreen="MenuScreen",
    HomeScreen="HomeScreen",
    VoucherScreen="VoucherScreen",
    AccountScreen="AccountScreen",
    CartScreen="CartScreen",

}

export type GroceryRootBottomTabParams={
    MenuScreen:undefined,
    HomeScreen:undefined,
    VoucherScreen:undefined,
    AccountScreen:undefined,
    CartScreen:undefined,

}

export const GroceryRootBottomTabScreens=[
    {
        id:Math.random()+""+Date,
        name:GroceryRootBottomTabEnum.HomeScreen,
        component:HomeScreen,
        options:{
            headerShown:false,
            title:'Home',
            tabBarIcon:({color}:{color:string})=>{return <Icon name='home' size={20} color={color}/>}
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootBottomTabEnum.MenuScreen,
        component:MenuScreen,
        options:{
            headerShown:false,
            title:'Menu',
            tabBarIcon:({color}:{color:string})=>{return <Icon name='wpforms' size={20} color={color}/>}
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootBottomTabEnum.CartScreen,
        component:CartScreen,
        options:{
            headerShown:false,
            title:'Cart',
            tabBarIcon:({color}:{color:string})=>{return <Icon name='shopping-basket' size={20} color={color}/>},
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootBottomTabEnum.AccountScreen,
        component:AccountStack,
        options:{
            headerShown:false,
            title:'Account',
            tabBarIcon:({color}:{color:string})=>{return <Icon name='user-circle' size={20} color={color}/>},
            
        }
    },
]