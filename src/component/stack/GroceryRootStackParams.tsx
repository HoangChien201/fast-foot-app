import MessageScreen from "../../screen/grocery/MessageScreen"
import OrderDetailScreen from "../../screen/grocery/OrderDetailScreen"
import SearchScreen from "../../screen/grocery/SearchScreen"
import LoginScreen from "../../screen/user/LoginScreen"
import ManageAddressScreen from "../../screen/user/ManageAddressScreen"
import ManageInformationUser from "../../screen/user/ManageInformationUser"
import OrderCompleteScreen from "../../screen/user/OrderCompleteScreen"
import PaymentScreen from "../../screen/user/PaymentScreen"
import SignUpScreen from "../../screen/user/SignUpScreen"
import WelcomeScreen from "../../screen/user/WelcomeScreen"
import GroceryBottomTab from "../bottom-stack/GroceryBottomTab"



enum GroceryRootStackEnum{
    GroceryBottomTab="GroceryBottomTab",
    PaymentScreen='PaymentScreen',
    ManageAddressScreen='ManageAddressScreen',
    OrderCompleteScreen='OrderCompleteScreen',
    MessageScreen='MessageScreen',
    ManageInformationUser='ManageInformationUser',
    SearchScreen='SearchScreen',
    WelcomeScreen='WelcomeScreen'
    


}

export type GroceryRootStackParams={
    GroceryBottomTab:undefined,
    PaymentScreen:undefined,
    ManageAddressScreen:undefined,
    OrderCompleteScreen:undefined,
    MessageScreen:undefined,
    ManageInformationUser:undefined,
    SearchScreen:undefined,
    WelcomeScreen:undefined

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
            title:'Thanh toán'
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootStackEnum.ManageAddressScreen,
        component:ManageAddressScreen,
        options:{
            title:'Địa chỉ'
        }
    },
    {
        id:Math.random()+""+Date,
        name:GroceryRootStackEnum.OrderCompleteScreen,
        component:OrderCompleteScreen,
        options:{
            title:'Đơn hàng chi tiết'
        }
    },
    {
        id:Math.random(),
        name:GroceryRootStackEnum.ManageInformationUser,
        component:ManageInformationUser,
        options:{
            title:'Chỉnh sửa thông tin',
        }
    },
    {
        id:Math.random(),
        name:GroceryRootStackEnum.SearchScreen,
        component:SearchScreen,
        options:{
            headerShown:false,
        }
    },
    {
        id:Math.random(),
        name:GroceryRootStackEnum.WelcomeScreen,
        component:WelcomeScreen,
        options:{
            headerShown:false,
        }
    },
    {
        id:Math.random(),
        name:GroceryRootStackEnum.MessageScreen,
        component:MessageScreen,
        options:{
            title:'Hỗ trợ',
        }
    },
]