
import IconEntypo from 'react-native-vector-icons/Entypo'
import TablesScreen from '../../screen/staff/TablesScreen'
import ManageAddressScreen from '../../screen/user/ManageAddressScreen'

enum StaffRootStackEnum{
    TablesScreen='TablesScreen',
    ManageInformationUser="ManageInformationUser",
}

export type StaffRootStackParams={
    TablesScreen:undefined,
    ManageInformationUser:undefined,
}

export const StaffRootStackScreen=[
    {
        id:Math.random(),
        name:StaffRootStackEnum.TablesScreen,
        component:TablesScreen,
        option:{
            title:'Tables',
        }
    },
    {
        id:Math.random(),
        name:StaffRootStackEnum.ManageInformationUser,
        component:ManageAddressScreen,
        option:{
            title:'Edit',
        }
    },
]