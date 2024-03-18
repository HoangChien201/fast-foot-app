import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import { CategoryType, OptionOfTitle } from "../component/store/productReducer";

export const getProduct = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/product';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách product lỗi');
        throw error;
    }
}

export const getCategory = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/category';
        const response = await axiosInstance.get<Array<CategoryType>>(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách category lỗi');
        throw error;
    }
}

export const searchProductHTTP = async (name:string) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = `/product/search?q=${name}`;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('tìm kiếm lỗi');
        throw error;
    }
}

export const getProductTopHTTP = async () => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = `/product/product-top`;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách product top lỗi');
        throw error;
    }
}
