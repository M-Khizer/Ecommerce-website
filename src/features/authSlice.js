import { createSlice } from "@reduxjs/toolkit";
export {auth} from "../Components/firebaseconfig"

const initialState={
    auth:null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

    }
})