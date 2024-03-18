import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import { order_type } from "../component/store/billDeliveryReducer";
import { productType } from "../component/store/productReducer";

export type OrderDetailType={
    order_id:number,
    quantity:number,
    product:productType
}

export const addBillDeliveryHttp = async (bill:order_type) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/order';
        const response:order_type = await axiosInstance.post(url,bill);
        return response;
    } catch (error) {
        console.log('them order loi');
        // throw error;
    }
}

export const getOrderHTTP = async (id:number) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/order/find-one/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('không lấy được order');
        throw error;
    }
}

export const getOrderDetailByOrderHTTP = async (id:number) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/order-detail/get-by-order/'+id;
        const response:Array<OrderDetailType> = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('không lấy được order');
        throw error;
    }
}

