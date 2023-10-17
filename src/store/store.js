import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toastSlice'
import adminReducer from './adminSlice'
export const store = configureStore({
  reducer: {
    toast:toastReducer,
    admin:adminReducer
  },
})