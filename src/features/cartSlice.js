import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { auth, fs } from "../Config/config";

export const getCart = createAsyncThunk('cart/getCart',async (uid)=>{
    // console.log(uid)
    console.log('createasyncthunk')
    const cartRef = await getDocs(collection(fs,'Cart '+ uid))
    const cart = cartRef.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }))
    return cart;
}) 

const initialState = {
    cart:[],
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{

    },
    extraReducers: builder =>{
        builder
            .addCase(getCart.fulfilled,(state,action)=>{
                state.cart = action.payload
            })
    }
})

export default cartSlice.reducer;