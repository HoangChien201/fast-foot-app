import axios, { AxiosResponse } from "axios";
import AxiosInstance from "./AxiosInstance";
import { addressType } from "../component/store/userReducer";
import { userSignUpType } from "../screen/user/SignUpScreen";


export const login = async (email:string,pass:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/auth/sign-in';
        const body={
            email:email,
            password:pass
        }
        const response = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const singUp = async (user:userSignUpType,role:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/user/';
        const body={
            ...user,
            role:role
        }
        const response = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        throw error;
    }
}

export const staffByIdUser = async (id?:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/staff/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUserHTTP = async (id:string,body:any) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/user/update/'+id;
        const response = await axiosInstance.put(url,body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateClientHTTP = async (id:string,body:any) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/client/'+id;
        const response = await axiosInstance.put(url,body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAddressByUser = async (id?:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/address/by-user/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getClientbyIdHTTP = async (id?:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/client/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getStaffShipperDeliveryHTTP = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/staff/shipper/shipper-delivery';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const sendMailForgotPassword = async (email:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/password/forget-password';
        const body={
            email:email
        }
        const response = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const validateOTP = async (email:string,otp:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/password/validate-otp';
        const body={
            email:email,
            otp:otp
        }
        const response = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getRecentProductOrderHTTP = async (id_user:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/user/recent-order-product/'+id_user;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

////addresss

export const addAddressHTTP = async (body:any) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/address';
        const response = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
