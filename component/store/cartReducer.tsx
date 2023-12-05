import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { OptionIsSelectedType, OptionType, productType } from './productReducer'

export type cartItemType = {
    _id:string,
    product:string,
    quantity:number,
    optionIsSelected:Array<OptionType>,
    instruction?:string,
    status:string,
    cart:string|undefined|null,
    total:number

}

export type cartType = {
  _id:string,
  client:string | null,
  staff:string | null,
  table:string | null,
  status:string,
  cartItem:Array<cartItemType>

}

export type cartTypeReq = {
  product:string,
  quantity:number,
  optionIsSelected:Array<Array<string>>,
  instruction?:string,
  status:string,
  cart:string|undefined|null
  total:number
}


export interface CartState {
  value: Array<cartItemType>
}

const initialState: CartState = {
  value: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart:(state,action)=>{
      state.value=[...action.payload]
    },
    addCart:(state,action)=>{
        if(state.value.length>0){
          const product=state.value.find(item=>item.product === action.payload.idProduct)
          if(product){
            state.value.map((item)=>{
              if(item.product===product.product){
                item.quantity = parseInt(item.quantity.toString())+parseInt(action.payload.quantity);
                return item;
              }
              return item
            })
          }
          else{
            state.value=[action.payload,...state.value]
          }
          
        }
        else{
          state.value=[action.payload,...state.value]
        }
        
    },
    removeCart:(state,action)=>{
        state.value=state.value.filter(product=>{
            return product._id !== action.payload
        })
    },
    changeQuantity: (state,action) => {
        state.value = state.value.map(product=>{
            if(product._id === action.payload.id){
                product.quantity=action.payload.quantity.toString()
                return product;
            }
            return product;
        })
      },
    clearCart:(state)=>{
      state.value=[]
    }
  },
})

// Action creators are generated for each case reducer function
export const {addCart,removeCart,changeQuantity,clearCart,setCart  } = cartSlice.actions

export default cartSlice.reducer