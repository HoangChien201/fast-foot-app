import { Color } from "../../contanst/color"
import ProfileScreen from "../../screen/grocery/ProfileScreen"

import Icon from 'react-native-vector-icons/FontAwesome'
import HomeShipperScreen from "../../screen/staff/HomeShipperScreen"
import ProfileStaffScreen from "../../screen/staff/ProfileStaffScreen"

enum ShipperRootBottomTabEnum{
    HomeShipperScreen="HomeShipperScreen",
    ProfileStaffScreen="ProfileStaffScreen",

}

export type ShipperRootBottomTabParams={
    HomeShipperScreen:undefined,
    ProfileStaffScreen:undefined,

}

export const ShipperRootBottomTabScreens=[
    {
        id:Math.random()+""+Date,
        name:ShipperRootBottomTabEnum.HomeShipperScreen,
        component:HomeShipperScreen,
        options:{
            title:'Shipment Orders',
            tabBarIcon:({color}:{color:string})=>{return <Icon name='home' size={20} color={color}/>}
        }
    },
    
    {
        id:Math.random()+""+Date,
        name:ShipperRootBottomTabEnum.ProfileStaffScreen,
        component:ProfileStaffScreen,
        options:{
            headerShown:false,
            title:'Profile',
            tabBarIcon:({color}:{color:string})=>{return <Icon name='user-circle' size={20} color={color}/>},
            
        }
    },
]