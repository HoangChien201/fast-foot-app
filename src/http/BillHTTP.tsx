import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import { CreateOrderRequest, UpdateOrderRequest, order_type } from "../component/store/billDeliveryReducer";
import { productType } from "../component/store/productReducer";

export type OrderDetailType={
    order_id:number,
    quantity:number,
    product:productType
}

export const addBillDeliveryHttp = async (bill:CreateOrderRequest) => {
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

export const updateOrderHttp = async (bill:UpdateOrderRequest,id:number) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/order/update/'+id;
        const response:order_type = await axiosInstance.post(url,bill);
        return response;
    } catch (error) {
        console.log('sua order loi');
        // throw error;
    }
}

export const getOneOrderHTTP = async (id:number|string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/order/find-one/'+id;
        const response:order_type = await axiosInstance.get(url);
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

