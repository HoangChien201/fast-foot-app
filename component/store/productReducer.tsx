import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type productType = {
    _id: string,
    name: string,
    image: string,
    description: string,
    price: string,
    category:CategoryType,
    options: Array<OptionType>

}

export type OptionType = {

    name: string,
    optionDetails: Array<string>
}

export type OptionIsSelectedType = {
    title: Array<string>,
}

export type OptionOfTitle = {
    id: string,
    name: string,
    price?: string

}

export type CategoryType ={
    _id:string,
    image:string,
    name:string,
    product:Array<productType>,
    
}

export interface ProductState {
    value: Array<productType>
}

const initialState: ProductState = {
    value: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        loadProduct:(state,action)=>{
            state.value=[...action.payload]
        },
        addProduct: (state, action) => {
            state.value = [action.payload, state.value]
        },
        removeProduct: (state, action) => {
            state.value = state.value.filter(product => {
                return product._id !== action.payload.id
            })
        },
        updateProduct: (state, action) => {
            state.value = state.value.map(product => {
                if (product._id === action.payload.id) {
                    return { ...product, ...action.payload.data }
                }
                return product;
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, updateProduct,loadProduct } = productSlice.actions

export default productSlice.reducer