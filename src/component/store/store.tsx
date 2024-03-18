import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import userReducer from './userReducer'
import optionDetailReducer from './optionDetailReducer'
import billDeliveryReducer from './billDeliveryReducer'

export const store = configureStore({
  reducer: {
    product:productReducer,
    cart:cartReducer,
    user:userReducer,
    optionDetail:optionDetailReducer,
    billDelivery:billDeliveryReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch