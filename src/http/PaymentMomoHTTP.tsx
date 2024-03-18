import AxiosInstance from "./AxiosInstance";

export type PaymentMomoRequestType={
    partnerCode:string;
    partnerRefId:string;
    customerNumber:string;
    appData:string;
    version:number;
    payType:number;
    description:string;
}

export async function PaymentHandleMomo(paymentMomoRequest:PaymentMomoRequestType){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/payment-momo';
        const response = await axiosInstance.post(url,paymentMomoRequest);
        return response;
    } catch (error) {
        console.log('thanh toán momo lỗi');
        throw error;
    }
}