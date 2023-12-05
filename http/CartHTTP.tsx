import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import { cartType, cartTypeReq } from "../component/store/cartReducer";

export const addCartHttp = async (cart:cartType) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/cart';
        const response = await axiosInstance.post(url,cart);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCartHttp = async (id:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/cart/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addCartItemHttp = async (cartDetail:cartTypeReq) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = '/cart-item';
        const response = await axiosInstance.post(url,cartDetail);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteCartItemHttp = async (id:string) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = '/cart-item/'+id;
        const response = await axiosInstance.delete(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const clearCartItemHttp = async (id:string | undefined) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = '/clear-cart/'+id;
        const response = await axiosInstance.put(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}