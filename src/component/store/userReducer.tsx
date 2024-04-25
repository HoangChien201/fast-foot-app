import { createSlice } from '@reduxjs/toolkit'
import { cartType } from './modalAddCartReducer'
import { billAtRestaurantType, billDeliveryType } from './billDeliveryReducer'

export type formLogin = {
    email: string,
    password: string
}

export type userType = {
    id: number,
    email: string,
    password: string,
    fullname: string,
    avatar: string,
    phone: string,
    role: number,
    gender: string,
    address: string,
    token: string
}

export type addressType = {
    _id: string,
    city: string,
    district: string,
    ward: string,
    detail: string,
    phone: string,
    client: string | null,
    staff: string | null
}

export type addressDeliveryType = {
    city: string,
    district: string,
    ward: string,
    detail: string,
    nameRecipient: string,
    phone: string,
    client: string | null,
    staff: string | null
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
        updateUser: (state, action) => {
            if (state.value != null) {
                state.value = {
                    ...state.value,
                    ...action.payload
                }

            }
        }

    }
})

// Action creators are generated for each case reducer function
export const { addUser, updateUser } = userSlice.actions

export default userSlice.reducer