import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const callTheApi = createAsyncThunk('api/users', async(obj, error) => {
    try{
        const request = await fetch('https://gorest.co.in/public/v2/users') 
        const response = request.json()
        return response
    }catch(err){
        console.log(err.message)
        return []
    }
})

const userSlice = createSlice({
    name:"users",
    initialState: [], 
    reducers: {}, 
    extraReducers:{
        [callTheApi.pending] : (state, action) => {
            return []
        },
        [callTheApi.fulfilled] : (state, action) => {
            return action.payload
        },
        [callTheApi.rejected] : (state, action) => {
            return []
        },
    }
})
export const actions = userSlice.actions;
export default userSlice

// "https://gorest.co.in/public/v2/users"
