import { createSlice } from "@reduxjs/toolkit"

export type locationDeliveryType = {
    nameRecipient: string,
    phone: string,
    province: string,
    district: string,
    detail: string,
    ward: string
}

export interface LocationDeliveryState{
    value:locationDeliveryType|null
}

const initialState: LocationDeliveryState = {
    value: null
}

const locaitonDeliverySlice=createSlice({
    name:'location-delivery',
    initialState,
    reducers:{
        setLocationDelivery:(state,action)=>{
            state.value=action.payload
        }
    }

})

export const {setLocationDelivery}=locaitonDeliverySlice.actions;

export default locaitonDeliverySlice.reducer