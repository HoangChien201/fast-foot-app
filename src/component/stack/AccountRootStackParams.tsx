import ProfileScreen from "../../screen/grocery/ProfileScreen"
import BookmarkScreen from "../../screen/user/profile/BookmarkScreen"
import EditProfileScreen from "../../screen/user/profile/EditProfileScreen"
import FeedbackScreen from "../../screen/user/profile/FeedbackScreen"
import ManagerPaymentScreen from "../../screen/user/profile/ManagerPaymentScreen"
import NotificationScreen from "../../screen/user/profile/NotificationScreen"
import RecentOrderScreen from "../../screen/user/profile/RecentOrderScreen"
import SettingScreen from "../../screen/user/profile/SettingScreen"

enum AccountRootStackEnum{
    ManagerPaymentScreen='ManagerPaymentScreen',
    SettingScreen='SettingScreen',
    BookmarkScreen='BookmarkScreen',
    NotificationScreen='NotificationScreen',
    RecentOrderScreen='RecentOrderScreen',
    FeedbackScreen='FeedbackScreen',
    ProfileScreen='ProfileScreen',
    EditProfileScreen='EditProfileScreen'

}

export type AccountRootStackParams={
    ManagerPaymentScreen:undefined,
    SettingScreen:undefined,
    BookmarkScreen:undefined,
    NotificationScreeneen:undefined,
    RecentOrderScreenen:undefined,
    FeedbackScreen:undefined,
    ProfileScreen:undefined,
    EditProfileScreen:undefined
}

export const AccountRootStackScreens=[
    {
        id:Math.random()+""+Date,
        name:AccountRootStackEnum.ProfileScreen,
        component:ProfileScreen,
        options:{
            headerShown:false
        }
    },
    {
        id:Math.random()+""+Date,
        name:AccountRootStackEnum.ManagerPaymentScreen,
        component:ManagerPaymentScreen,
        options:{
            title:'Quản lý phương thức thanh toán '
        }
    },
    {
        id:Math.random()+""+Date,
        name:AccountRootStackEnum.SettingScreen,
        component:SettingScreen,
        options:{
            title:'Cài đặt'
        }
    },
    {
        id:Math.random()+""+Date,
        name:AccountRootStackEnum.NotificationScreen,
        component:NotificationScreen,
        options:{
            title:''
        }
    },
    {
        id:Math.random()+""+Date,
        name:AccountRootStackEnum.RecentOrderScreen,
        component:RecentOrderScreen,
        options:{
            title:'Lịch sử đặt hàng'
        }
    },
    {
        id:Math.random()+""+Date,
        name:AccountRootStackEnum.BookmarkScreen,
        component:BookmarkScreen,
        options:{
            title:'Ưa thích'
        }
    },
    {
        id:Math.random()+""+Date,
        name:AccountRootStackEnum.FeedbackScreen,
        component:FeedbackScreen,
        options:{
            title:'Ý kiến'
        }
    },
    {
        id:Math.random()+""+Date,
        name:AccountRootStackEnum.EditProfileScreen,
        component:EditProfileScreen,
        options:{
            title:''
        }
    },
]