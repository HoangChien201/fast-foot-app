import { NativeEventEmitter } from "react-native";
import { socket } from "../../../helper/SocketHandle";
import { EventPayZalo } from "../../../helper/ZaloPayment";
import { updateOrderHttp } from "../../../http/BillHTTP";
import { CreatePaymentOrder } from "../../../http/PaymentZalo";
import PayZaloBridge from "../../../module/PayZaloBridge";

export async function PaymentZaloHandle(total: number, order_id: number, navigation: any) {
  var order = {
    'app_user': "ZaloPayDemo",
    'amount': parseInt(total.toString()),
    'embed_data': "{}",
    'item': "[]",
    'description': `Thanh toán cho đơn hàng #${order_id}`,
  }

  const response = await CreatePaymentOrder(order)
  const { zp_trans_token, return_code } = response

  if (return_code === 1) {
    var payZP = PayZaloBridge;
    payZP.payOrder(zp_trans_token);
  }
  EventPayZalo(OnPaymentZaloSuccess,OnPaymentZaloFail);

  async function OnPaymentZaloSuccess() {
    socket.emit('notification', {
      to: 'staff',
      content: 'Đặt hàng'
    })

    navigation.navigate("OrderCompleteScreen")
  }

  function OnPaymentZaloFail() {
     console.log("Lỗi");
     
  }
}