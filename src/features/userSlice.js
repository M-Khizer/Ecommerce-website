import { createSlice } from "@reduxjs/toolkit";

const initialState={
    fullName:'',
    uid:''
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        getName: (state,action)=>{
            state.fullName = action.payload
        },
        getUserId:(state,action)=>{
            state.uid = action.payload
        }
    }
})

export const {getName,getUserId} = userSlice.actions;
export default userSlice.reducer;

