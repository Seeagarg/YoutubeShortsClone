import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/loginSlice";


const store = configureStore({
    reducer:{
        loginSlice:loginSlice.reducer,
    }
})

export default store;