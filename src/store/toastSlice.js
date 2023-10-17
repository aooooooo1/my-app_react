import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toasts:[]
}

const toastSlice = createSlice({
    name:'toast',
    initialState,
    reducers: {
        addTo : (state,action)=>{
            state.toasts.push(action.payload);
        },
        removeTo : (state, action) =>{
            state.toasts = state.toasts.filter(toast=>{
                return toast.id !== action.payload;
            });
        }
    }
});
export const {addTo, removeTo} = toastSlice.actions;
export default toastSlice.reducer;