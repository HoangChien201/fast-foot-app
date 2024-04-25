import { createSlice } from "@reduxjs/toolkit"

interface OrderTrackingState{
    value:{
        order_id:number | string
    }
}
const initialState:OrderTrackingState={
    value:{
        order_id:''
    }
}
const orderTrackingSlice=createSlice({
    initialState:initialState,
    name:'order-tracking',
    reducers:{
        setOrderTracking:(state,action)=>{
            state.value={...state.value,...action.payload}
        }
    }
})

export const {setOrderTracking}=orderTrackingSlice.actions;

export default orderTrackingSlice.reducer; 