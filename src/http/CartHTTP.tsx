import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import { cartItemAddType, cartItemType, cartItemUpdateType, cartsRespone } from "../component/store/modalAddCartReducer";

export const getCartByUserHttp = async (user_id:number) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/cart-detail/get-by-user/'+user_id;
        const response:cartsRespone = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy giỏ hàng user bị lỗi');

        throw error;
    }
}

export const addCartItemHttp = async (cartDetail:cartItemAddType) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = '/cart-detail';
        const response = await axiosInstance.post(url,cartDetail);
        return response;
        
    } catch (error) {
        console.log('thêm giỏ hàng bị lỗi');
        throw error;
    }
}

export const updateCartItemHttp = async (product:number,user:number,cartDetail:cartItemUpdateType) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = `/cart-detail/update?product=${product}&user=${user}`;
        const response = await axiosInstance.patch(url,cartDetail);
        return response;
    } catch (error) {
        console.log('sửa giỏ hàng bị lỗi');
        throw error;
    }
}

export const deleteCartItemHttp = async (product_id:number,user_id:number) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = `/cart-detail/delete?product=${product_id}&user=${user_id}`;
        const response = await axiosInstance.delete(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const clearCartItemHttp = async (id:number | undefined) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = '/cart-detail/clear-cart/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}