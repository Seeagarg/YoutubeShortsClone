import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../Cookies/Cookie";

const initialState = getCookie()
  ? JSON.parse(getCookie())
  : {user:null};


  console.log(initialState,'initial state in slice')


const loginSlice = createSlice({
    name:"loginSlice",
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
            console.log(action.payload,'p')
            setCookie(JSON.stringify(action.payload));
            return state;
        },

        removeUser:(state,action)=>{
            state.user = null;
            removeCookie();
            return state;
        }
    }
})


export const {setUser,removeUser}= loginSlice.actions;

export default loginSlice;
