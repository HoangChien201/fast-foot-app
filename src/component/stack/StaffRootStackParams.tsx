import StaffScreen from '../../screen/staff/StaffScreen'

enum StaffRootStackEnum{
    UnConfirmScreen='UnConfirmScreen',
    ConfirmedScreen="ConfirmedScreen",
    DoneScreen="DoneScreen",
    DeliveingScreen="DeliveringScreen"

}

export type StaffRootStackParams={
    UnConfirmScreen:undefined,
    ConfirmedScreen:undefined,
    DoneScreen:undefined,
    DeliveingScreen:undefined
}

export const StaffRootStackScreen=[
    {
        id:Math.random(),
        name:StaffRootStackEnum.UnConfirmScreen,
        component:StaffScreen,
        option:{
            title:'Chờ xác nhận',
        }
    },
    {
        id:Math.random(),
        name:StaffRootStackEnum.ConfirmedScreen,
        component:StaffScreen,
        option:{
            title:'Đang chuẩn bị',
        }
    },
    {
        id:Math.random(),
        name:StaffRootStackEnum.DeliveingScreen,
        component:StaffScreen,
        option:{
            title:'Đang giao',
        }
    },
    {
        id:Math.random(),
        name:StaffRootStackEnum.DoneScreen,
        component:StaffScreen,
        option:{
            title:'Đã xong',
        }
    },
]