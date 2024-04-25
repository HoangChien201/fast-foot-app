import AxiosInstance from "./AxiosInstance";

export type RequestCreateOrderZalo={
      'app_user': string;
      'amount': number;
      'embed_data': string;
      'item': string;
      'description': string;
}


export type ResponeCreateOrderZalo={
    zp_trans_token:string,
    return_code:number
}
export async function CreatePaymentOrder(params:RequestCreateOrderZalo) {
    try {
        const axiosInstance=AxiosInstance();
        const url='/payment-zalo/create-order'
        const respone:ResponeCreateOrderZalo= await axiosInstance.post(url,params)
        return respone
    } catch (error) {
        console.log('create order zalo lỗi');
        throw error;
    }
}