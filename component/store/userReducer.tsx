import { createSlice } from '@reduxjs/toolkit'
import { cartType } from './cartReducer'
import { billAtRestaurantType, billDeliveryType } from './billDeliveryReducer'

export type formLogin = {
    email: string,
    password: string
}
export type userType = {
    _id:string,
    email: string;
    password: string;
    role: string;
    token: string,
    client?:clientType ,
    staff?:staffType

}

export type addressType ={
    _id:string,
    city:string,
    district:string,
    ward:string,
    detail:string,
    phone:string,
    client:string | null,
    staff:string | null
}

export type addressDeliveryType ={
    city:string,
    district:string,
    ward:string,
    detail:string,
    nameRecipient:string,
    phone:string,
    client:string | null,
    staff:string | null
}

export type staffType ={
    _id:string,
    hireDate:string,
    salary:string,
    user:string,
    job:string,
    activity:string,
    bills:Array<billAtRestaurantType> | Array<billDeliveryType>,
    fullname: string;
    phone: string;
    age: string;
    address: addressType;
    avatar: string;
    gender: string;
}

export type clientType ={
    _id:string,
    user:string,
    cart:string,
    bill:Array<billType>,
    fullname: string;
    phone: string;
    age: string;
    address: addressType;
    avatar: string;
    gender: string;
}

export interface UserState {
    value: userType | null
}

const initialState: UserState = {
    value: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.value = action.payload

        },

    }
})

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions

export default userSlice.reducer