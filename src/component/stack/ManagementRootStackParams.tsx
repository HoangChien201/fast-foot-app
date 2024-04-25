import React from "react"
import StaffDetailScreen from "../../screen/manager/StaffDetailScreen"
import StaffsScreen from "../../screen/manager/StaffsScreen"
import IconEntypo from 'react-native-vector-icons/Entypo'

enum ManagementRootStackEnum{
    MainScreen='MainScreen',
    StaffsScreen='StaffsScreen',
    StaffDetailScreen='StaffDetailScreen'
}

export type ManagementRootStackParams={
    MainScreen:undefined,
    StaffsScreen:undefined,
    StaffDetailScreen:undefined
}

export const ManagementRootStackScreen=[
    {
        id:Math.random(),
        name:ManagementRootStackEnum.StaffsScreen,
        component:StaffsScreen,
        option:{
            title:'Staffs'
        }
    },
    {
        id:Math.random(),
        name:ManagementRootStackEnum.StaffDetailScreen,
        component:StaffDetailScreen,
        option:{
            title:'Profile',
            headerTransparent:true,
            headerTitleStyle:{
                color:'#fff'
            },
            headerBackImage:()=>{
                return <IconEntypo name='chevron-thin-left' size={24} color='#fff' style={{marginStart:6}}/>
            },
        }
    },
]