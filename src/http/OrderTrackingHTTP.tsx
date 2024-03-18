import { order_type } from "../component/store/billDeliveryReducer";
import { userType } from "../component/store/userReducer";
import AxiosInstance from "./AxiosInstance";

export type CreateOrderTrackingType={
    order_id:number;
    user_id:number;
    status:number;
}

export type OrderTrackingType={
    status:number,
    lastUpdateTime:Date,
    user:userType ,
    order:order_type
}

export type GetAOrderTrackingRequest={
    user_id:number,
    order_id:number
}

export const checkOrderTrackingHTTP = async (order_id:number) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/order-tracking/check-order?order_id=${order_id}`;
        const response:OrderTrackingType = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('không lấy được order-tracking');
        throw error;
    }
}

export const getOneOrderTrackingHTTP = async (order_id:number,user_id:number) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/order-tracking/get-one-order-tracking?order_id=${order_id}&user_id=${user_id}`;
        const response:OrderTrackingType = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('không lấy được order-tracking');
        throw error;
    }
}

export const createOrderTrackingHTTP = async (body:CreateOrderTrackingType) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/order-tracking`;
        const response:CreateOrderTrackingType = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        console.log('không tạo được order-tracking ');
        throw error;
    }
}

export const getOrderTrackingUnConfirmHTTP = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/order-tracking/get-order-unconfirm`;
        const response:Array<OrderTrackingType> = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('không lấy được order-tracking chưa xác nhận');
        throw error;
    }
}

export const getOrderTrackingConfirmedHTTP = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/order-tracking/get-order-confirmed`;
        const response:Array<OrderTrackingType> = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('không lấy được order-tracking đã xấc nhận');
        throw error;
    }
}

export const getOrderTrackingDoneHTTP = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/order-tracking/get-order-done`;
        const response:Array<OrderTrackingType> = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('không lấy được order-tracking đã xong');
        throw error;
    }
}

export const getOrderTrackingDeliveringHTTP = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/order-tracking/get-order-delivering`;
        const response:Array<OrderTrackingType> = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('không lấy được order-tracking đang giao');
        throw error;
    }
}