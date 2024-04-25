import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { socket } from "../../../helper/SocketHandle"

export default function PaymentCashHandle(bill_id:number,navigation:any){


    Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Congrats! Order success',
      })

      socket.emit('notification', {
        to: 'staff',
        content: 'Đặt hàng'
      })

      navigation.navigate("OrderCompleteScreen")
}