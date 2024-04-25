import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { productType } from './productReducer'

export type cartItemType = {
    user_id:number,
    quantity:number,
    instruction:string,
    product:productType
}

export type cartsRespone={
  cart:cartItemType[],
  total:string
}

export type cartItemAddType = {
  user_id:number,
  product_id:number,
  quantity:number,
  instruction:string,
}

export type cartItemUpdateType = {
  user_id?:number,
  product_id?:number,
  quantity?:number,
  instruction?:string,
}

export interface modalAddCartState {
  value: {
    product_id: number | null,
    visible:boolean
  }
}

const initialState: modalAddCartState = {
  value: {
    product_id:null,
    visible:false
  },
}

export const modalAddCartSlice = createSlice({
  name: 'modal-add-cart',
  initialState,
  reducers: {
    setDataAddCart:(state,action)=>{
      state.value={...action.payload}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDataAddCart} = modalAddCartSlice.actions

export default modalAddCartSlice.reducer