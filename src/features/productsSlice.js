import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { fs } from "../Config/config";

export const addProducts= createAsyncThunk('products/addProducts',async (product)=>{

    const productsRef = await addDoc(collection(fs,'products'),product)
    console.log(productsRef.id)
    // const productId = productsRef.id;
    let newProduct = {product}
    return newProduct;

});

export const getProducts = createAsyncThunk('products/getProducts',async ()=>{
    const productsRef = await getDocs(collection(fs,'products'))
    console.log(productsRef)

    const products = productsRef.docs.map(data=>({
        product:data.data(),
        id:data.id
    }))
    return products
})

const initialState = {
    status:'idle',
    products : [],
    id:''    
}


export const productsSlice = createSlice({

    name:'products',
    initialState,
    reducers:{
        // getProducts:(state,action)=>{
        //     state.products.push(action.payload);
        // }
    },
    extraReducers: builder =>{
        builder
            .addCase(addProducts.fulfilled,(state,action)=>{
                state.products=action.payload.product;
                state.id= action.payload.id
            })

            .addCase(getProducts.pending,state=>{
                state.status='loading'
            })
            .addCase(getProducts.fulfilled,(state,action)=>{
               state.products=action.payload; 
               state.status='idle'  
            })
    }

})

// export const {getProducts} = productsSlice.actions
export default productsSlice.reducer;