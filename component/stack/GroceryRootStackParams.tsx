import OrderDetailScreen from "../../screen/grocery/OrderDetailScreen"
import LoginScreen from "../../screen/user/LoginScreen"
import ManageAddressScreen from "../../screen/user/ManageAddressScreen"
import ManageInformationUser from "../../screen/user/ManageInformationUser"
import OrderCompleteScreen from "../../screen/user/OrderCompleteScreen"
import PaymentScreen from "../../screen/user/PaymentScreen"
import SignUpScreen from "../../screen/user/SignUpScreen"
import GroceryBottomTab from "../bottom-stack/GroceryBottomTab"



enum GroceryRootStackEnum{
    GroceryBottomTab="GroceryBottomTab",
    PaymentScreen='PaymentScreen',
    ManageAddressScreen='ManageAddressScreen',
    OrderDetailScreen='OrderDetailScreen',
    LoginScreen='LoginScreen',
    SignUpScreen='SignUpScreen',
    ManageInformationUser='ManageInformationUser'


}

export type GroceryRootStackParams={
    GroceryBottomTab:undefined,
    PaymentScreen:undefined,
    ManageAddressScreen:undefined,
    OrderDetailScreen:undefined,
    LoginScreen:undefined,
    SignUpScreen:undefined,
    ManageInformationUser:undefined,

}

export const GroceryRootStackScreens=[
    {
        id:Math.random()+""+Date,
        name:GroceryRootStackEnum.GroceryBottomTab,
        component:GroceryBottomTab,
        options:{
            headerShown:false,
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootStackEnum.PaymentScreen,
        component:PaymentScreen,
        options:{
            title:'Payment'
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootStackEnum.ManageAddressScreen,
        component:ManageAddressScreen,
        options:{
            
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootStackEnum.OrderDetailScreen,
        component:OrderDetailScreen,
        options:{
            title:'Order Detail'
        }
    },
    {
        id:Math.random(),
        name:GroceryRootStackEnum.ManageInformationUser,
        component:ManageInformationUser,
        option:{
            title:'Edit',
        }
    },
]