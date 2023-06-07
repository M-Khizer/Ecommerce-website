import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { fs } from "../Config/config";

export const addProducts= createAsyncThunk('products/addProducts',async (product)=>{

    const productsRef = await addDoc(collection(fs,'products'),product)
    const productId = productsRef.id;
    let newProduct = {id:productId,product}
    return newProduct;

});

export const getProducts = createAsyncThunk('products/getProducts',async ()=>{
    const productsRef = await getDocs(collection(fs,'products'))
    console.log(productsRef)

    const products = productsRef.docs.map(data=>({
        product:data.data()
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
                state.products=action.payload;
            })

            .addCase(getProducts.pending,state=>{
                state.status='loading'
            })
            .addCase(getProducts.fulfilled,(state,action)=>{
                // const productArray= [];
               state.products=action.payload; 
            //    state.id=action.payload.id;
               state.status='idle'  
            })
    }

})

// export const {getProducts} = productsSlice.actions
export default productsSlice.reducer;