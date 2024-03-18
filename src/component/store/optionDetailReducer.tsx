import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type OptionType = {
    _id:string,
    name: string,
    optionDetails: Array<string>,
    product:Array<string>
}


export type OptionDetailType ={
    _id:string,
    name:string,
    option:Array<OptionType>,
    price:string,
    
}

export interface OptionDetailState {
    value: Array<OptionDetailType>
}

const initialState: OptionDetailState = {
    value: []
}

export const optionDetailSlice = createSlice({
    name: 'option-detail',
    initialState,
    reducers: {
        loadOptionDetail:(state,action)=>{
            state.value=[...action.payload]
        },
    },
})

// Action creators are generated for each case reducer function
export const { loadOptionDetail } = optionDetailSlice.actions

export default optionDetailSlice.reducer