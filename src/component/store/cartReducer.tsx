import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { OptionIsSelectedType, OptionType, productType } from './productReducer'

export type cartItemType = {
    user_id:number,
    product_id:number,
    quantity:number,
    instruction:string,
    p_id:number,
    p_name: string,
    p_price:number,
    p_image: string,
    p_description: string,
    p_quantity:number,
    p_categoryId:number,
    total:number,
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

export type cartResponeType={
  cart:Array<cartItemType>,
  total:number
}

export interface CartState {
  value: cartResponeType
}

const initialState: CartState = {
  value: {
    cart:[],
    total:0
  },
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart:(state,action)=>{
      state.value={...action.payload}
    },

    removeCart:(state,action)=>{
        state.value.cart=state.value.cart.filter(cartItem=>{
            return cartItem.p_id !== action.payload
        })
    },
    changeQuantity: (state,action) => {
        state.value.cart = state.value.cart.map(cartItem=>{
            if(cartItem.p_id === action.payload.id){
                cartItem.quantity=action.payload.quantity.toString()
                return cartItem;
            }
            return cartItem;
        })
      },
    clearCart:(state)=>{
      state.value.cart=[]
    }
  },
})

// Action creators are generated for each case reducer function
export const {removeCart,changeQuantity,clearCart,setCart  } = cartSlice.actions

export default cartSlice.reducer