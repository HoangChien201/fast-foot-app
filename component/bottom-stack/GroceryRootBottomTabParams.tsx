import { Color } from "../../contanst/color"
import CartScreen from "../../screen/grocery/CartScreen"
import HomeScreen from "../../screen/grocery/HomeScreen"
import MenuScreen from "../../screen/grocery/MenuScreen"
import ProfileScreen from "../../screen/grocery/ProfileScreen"
import VoucherScreen from "../../screen/grocery/VoucherScreen"

import Icon from 'react-native-vector-icons/FontAwesome'

enum GroceryRootBottomTabEnum{
    MenuScreen="MenuScreen",
    HomeScreen="HomeScreen",
    VoucherScreen="VoucherScreen",
    ProfileScreen="ProfileScreen",
    CartScreen="CartScreen",

}

export type GroceryRootBottomTabParams={
    MenuScreen:undefined,
    HomeScreen:undefined,
    VoucherScreen:undefined,
    ProfileScreen:undefined,
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
            tabBarBadge: 0, 
            tabBarBadgeStyle: { backgroundColor: 'red',fontSize:12 }
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootBottomTabEnum.VoucherScreen,
        component:VoucherScreen,
        options:{
            headerShown:false,
            title:'Voucher',
            tabBarIcon:({color}:{color:string})=>{return <Icon name='ticket' size={20} color={color}/>}
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootBottomTabEnum.ProfileScreen,
        component:ProfileScreen,
        options:{
            headerShown:false,
            title:'Profile',
            tabBarIcon:({color}:{color:string})=>{return <Icon name='user-circle' size={20} color={color}/>},
            
        }
    },
]