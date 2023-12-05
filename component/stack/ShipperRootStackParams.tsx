import StaffDetailScreen from "../../screen/manager/StaffDetailScreen"
import StaffsScreen from "../../screen/manager/StaffsScreen"
import IconEntypo from 'react-native-vector-icons/Entypo'
import OrderCompleteScreen from "../../screen/user/OrderCompleteScreen"
import ShipperBottomTab from "../bottom-stack/ShipperBottomTab"
import OrderShipperDetail from "../../screen/staff/OrderShipperDetail"
import ManageInformationUser from "../../screen/user/ManageInformationUser"

enum ShipperRootStackEnum{
    OrderShipperDetailScreen="OrderShipperDetailScreen",
    ShipperBottomTab="ShipperBottomTab",
    ManageInformationUser="ManageInformationUser",


}

export type ShipperRootStackParams={
    OrderShipperDetailScreen:undefined,
    ShipperBottomTab:undefined,
    ManageInformationUser:undefined

}

export const ShipperRootStackScreen=[
    {
        id:Math.random(),
        name:ShipperRootStackEnum.ShipperBottomTab,
        component:ShipperBottomTab,
        option:{
            headerShown:false
        }
    },
    {
        id:Math.random(),
        name:ShipperRootStackEnum.OrderShipperDetailScreen,
        component:OrderShipperDetail,
        option:{
            title:'Shipper'
        }
    },
    {
        id:Math.random(),
        name:ShipperRootStackEnum.ManageInformationUser,
        component:ManageInformationUser,
        option:{
            title:'Edit'
        }
    },
]