import { createSlice } from '@reduxjs/toolkit'
import { cartItemType, cartType } from './modalAddCartReducer'
import { addressDeliveryType, addressType, userType } from './userReducer'
import { OrderDetailType } from '../../http/BillHTTP'

export type deliveryLocationType = {
    name: string,
    phone: string,
    province: string,
    streetName: string,
    addressType: string,

}

export type summaryBillAtRestaurantType = {
    subtotal: number,
    tax: number,
    total: number
}

export type summaryBillDeliveryType = {
    subtotal: number,
    tax: number,
    deliveryPrice: number,
    total: number
}


export type order_type = {
    id: number,
    dateExpected: string,
    address: string,
    timeOrder?: string,
    payment: boolean,
    methodPayment: string;
    expectedTime: string;
    user:userType,
    order_details:Array<OrderDetailType>,
    total:number,
    charges:number
}

export type CreateOrderRequest = {
    address: string,
    payment: boolean,
    methodPayment: string;
    expectedTime: string;
    user:number,
    charges:number
}

export type UpdateOrderRequest = {
    address?: string,
    payment?: boolean,
    methodPayment?: string;
    expectedTime?: string;
}

export interface BillState {
    value: []
}

const initialState: BillState = {
    value: [],
}

export const billDeliverySlice = createSlice({
    name: 'bill-delivery',
    initialState,
    reducers: {
        addBill: (state, action) => {


        },

    }
})

// Action creators are generated for each case reducer function
export const { addBill } = billDeliverySlice.actions

export default billDeliverySlice.reducer