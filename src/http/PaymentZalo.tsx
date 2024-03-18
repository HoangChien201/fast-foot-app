import AxiosInstance from "./AxiosInstance";

export type RequestCreateOrderZalo={
      'app_user': string;
      'amount': number;
      'embed_data': string;
      'item': string;
      'description': string;
}

export async function CreateOrder(params:RequestCreateOrderZalo) {
    try {
        const axiosInstance=AxiosInstance();
        const url='/payment-zalo/create-order'
        const respone= axiosInstance.post(url,params)
        return respone
    } catch (error) {
        console.log('create order zalo lỗi');
        throw error;
    }
}