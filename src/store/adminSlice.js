import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoggedIn : false
}
const adminSlice = createSlice({ 
    name:'admin',
    initialState,
    reducers:{
        login:(state)=>{state.isLoggedIn=true},
        logOut:(state)=>{state.isLoggedIn=false}
    }
});
export const {login, logOut}=adminSlice.actions;
export default adminSlice.reducer;