import { Platform } from "react-native";
import RNMomosdk from 'react-native-momosdk';
import { PaymentHandleMomo, PaymentMomoRequestType } from "../http/PaymentMomoHTTP";

export type RequestPaymentMomoApp = {
    merchantname: string;  //Mã đối tác 
    merchantcode: string; //Tên đối tác
    merchantNameLabel?: string; //Label để hiển thị tên đối tác trên app MoMo
    amount: number; //giá
    enviroment: string; //"0"?: SANBOX , "1"?: PRODUCTION
    action:string; //Giá trị là gettoken. KHÔNG THAY ĐỔI
    partner:string; //Giá trị là merchant. KHÔNG THAY ĐỔI
    description:string; //Mô tả chi tiết
    orderId?:string; //Mã giao dịch đối tác 
    orderLabel?:string; //Label để hiển thị Mã giao dịch
    appScheme?:string; //Partner Scheme Id được cung cấp bởi MoMo - 
}

export type ResponePaymentMomoApp = {
    status:number;
    message:string,
    data:string,
    phonenumber:string
}

// TODO: Action to Request Payment MoMo App
export const onPressPaymentMomo = async (requestPaymentMomoApp: RequestPaymentMomoApp) => {
    const {
        merchantname,
        merchantcode,
        merchantNameLabel,
        description,
        amount,
        enviroment,
        orderId,
        orderLabel,
        appScheme } = { ...requestPaymentMomoApp }

    let jsonData:RequestPaymentMomoApp = {
        enviroment :enviroment ,//SANBOX OR PRODUCTION
        action :"gettoken", //DO NOT EDIT
        partner :'merchant',
        merchantname :merchantname, //edit your merchantname here
        merchantcode :merchantcode, //edit your merchantcode here
        merchantNameLabel :merchantNameLabel,
        description :description,
        amount :amount,//order total amount
        orderId :orderId,
        orderLabel :orderLabel,
        appScheme :appScheme,
    };
    console.log("data_request_payment " + JSON.stringify(jsonData));
    if (Platform.OS === 'android') {
        let dataPayment = await RNMomosdk.requestPayment(jsonData);
        momoHandleResponse(dataPayment);
    } else {
    }
}

export async function momoHandleResponse(response:ResponePaymentMomoApp) {
    try {
        if (response && response.status == 0) {
            //SUCCESS continue to submit momoToken,phonenumber to server
            // let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
            let momoToken = response.data;
            let phonenumber = response.phonenumber;
            let message = response.message;
            console.log('thành công');
            
            // const requestPayment: PaymentMomoRequestType =
            // {
            //     "partnerCode": merchantcode,
            //     "partnerRefId": "ID20181123192300",
            //     "customerNumber": phonenumber,
            //     "appData": momoToken,
            //     "description": "Thanh toan cho don hang Merchant123556666 qua MoMo",
            //     "version": 2,
            //     "payType": 3,
            // }

            // setTimeout(() => {
            //     PaymentHanleMomo(requestPayment)
            // }, 0)

        } else {
            //let message = response.message;
            //Has Error: show message here
        }
    } catch (ex) { }
}

async function PaymentHanleMomo(requestPayment:PaymentMomoRequestType) {
    const responePay = await PaymentHandleMomo(requestPayment)
    console.log('responePay', responePay);

}