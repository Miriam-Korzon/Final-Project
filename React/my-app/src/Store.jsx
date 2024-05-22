import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import authSliceReducer from "./auth/authSlice"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
})
export default store