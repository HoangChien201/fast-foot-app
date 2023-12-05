import axios, { AxiosResponse } from "axios";
import AxiosInstance from "./AxiosInstance";
import { addressType } from "../component/store/userReducer";


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

export const singUp = async (email:string,pass:string,role:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/user/';
        const body={
            email:email,
            password:pass,
            role:role
        }
        const response = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        console.log(error);
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