import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import { billDeliveryType } from "../component/store/billDeliveryReducer";

export const addBillDeliveryHttp = async (bill:billDeliveryType) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/bill-delivery';
        const response = await axiosInstance.post(url,bill);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getBillDeliveryHTTP = async (id:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/bill-delivery/get-one/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllBillDeliveryHTTP = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/bill-delivery/';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllBillDeliveryByClientHTTP = async (idClient:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/bill-delivery/client/'+idClient;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
