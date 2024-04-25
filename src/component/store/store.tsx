import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productReducer'
import userReducer from './userReducer'
import optionDetailReducer from './optionDetailReducer'
import billDeliveryReducer from './billDeliveryReducer'
import modalAddCartReducer from './modalAddCartReducer'
import locationDelireryReducer from './locationDelireryReducer'
import orderTrackingReducer from './orderTrackingReducer'
import cartReducer from './cartReducer'

export const store = configureStore({
  reducer: {
    product:productReducer,
    modalAddCart:modalAddCartReducer,
    user:userReducer,
    locationDelivery:locationDelireryReducer,
    orderTracking:orderTrackingReducer,
    cart:cartReducer,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch