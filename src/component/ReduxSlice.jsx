import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const callToAPI = createAsyncThunk('api/users',async(obj,{state,error})=>{
    try{
          const req = await fetch('https://api.sampleapis.com/cartoons/cartoons2D')
          const res = await req.json()
          return res
    }catch(error){
        console.log(error)
        return []
    }
})

const userSlice = createSlice({
    name:"users",
    initialState:[],
    reducers:{},
    extraReducers:{
        [callToAPI.pending]:(state,action)=>{
            return []
        },
        [callToAPI.fulfilled]:(state,action)=>{
            return action.payload
        },
        [callToAPI.rejected]:(state,action)=>{
            return []
        }
    }
})

export const actions = userSlice.actions;
export default userSlice ;
// https://fakestoreapi.com/products