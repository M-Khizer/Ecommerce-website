import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import productReducer from '../features/productsSlice'
import cartReducer from '../features/cartSlice'

export const store = configureStore({
    reducer:{
        user:userReducer,
        products:productReducer,
        cart:cartReducer
    },
})