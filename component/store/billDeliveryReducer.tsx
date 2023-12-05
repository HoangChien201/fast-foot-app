import { createSlice } from '@reduxjs/toolkit'
import { cartItemType, cartType } from './cartReducer'
import { addressDeliveryType, addressType, clientType, staffType } from './userReducer'

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

export type billAtRestaurantType = {
    _id: string,
    cart: Array<cartType>,
    summary: summaryBillAtRestaurantType,
    staff: string,
    payment: string,
    datePayment: string;
    methodPayment: string;
    table: string;
    status: string;

}

export type billDeliveryType = {
    _id: string,
    dateExpected: string,
    deliveryLocation: addressDeliveryType,
    cart: Array<cartItemType>,
    timeOrder: string,
    timeFinish: string,
    staff: string,
    payment: string,
    methodPayment: string;
    status: string;
    expectedTime: string;
    client: string | undefined;
    summary:summaryBillDeliveryType
}

export type billDeliveryResType = {
    _id: string,
    dateExpected: string,
    deliveryLocation: addressDeliveryType,
    cart: Array<cartItemType>,
    timeOrder: string,
    timeFinish: string,
    staff: staffType,
    payment: string,
    methodPayment: string;
    status: string;
    expectedTime: string;
    client: clientType;
    summary:summaryBillDeliveryType
}

export interface BillState {
    value: Array<billDeliveryType>
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