import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type productType = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    category:CategoryType,
    quantity:number

}


export type CategoryType ={
    id:number,
    image:string,
    name:string,
    
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
                return product.id !== action.payload.id
            })
        },
        updateProduct: (state, action) => {
            state.value = state.value.map(product => {
                if (product.id === action.payload.id) {
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