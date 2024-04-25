import { createSlice } from "@reduxjs/toolkit"
import { cartItemType } from "./modalAddCartReducer"

interface CartState{
    value:cartItemType[]
}

const initialState:CartState={
    value:[]
}

const cartSlice=createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        setCart:(state,action)=>{
            state.value=[...state.value,...action.payload]
        },
        addCartItem:(state,action)=>{
            state.value=[...state.value,action.payload]
        },
        removeCartItem:(state,action)=>{
            state.value=state.value.filter(item=>item.product.id !== action.payload.id)
        },
        changeQuantityCartItem:(state,action)=>{
            const {id,quantity}=action.payload
            state.value=state.value.map(item=>{
               if( item.product.id !== id) return item
               
               return {...item,quantity};
            })
        },
        clearCartReducer:(state)=>{
            state.value=[]
        }

    }
})

export const {setCart,addCartItem,removeCartItem,changeQuantityCartItem,clearCartReducer}=cartSlice.actions;

export default cartSlice.reducer;