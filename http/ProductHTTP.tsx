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
        console.log(error);
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
        console.log(error);
        throw error;
    }
}

export const getOptionDetail = async (id:string) => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = '/option-detail/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getOptionDetailAll = async () => {
    
    try {
        const axiosInstance = AxiosInstance();
        const url = '/option-detail';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}