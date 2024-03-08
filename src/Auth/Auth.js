import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import loginSlice from '../Slices/loginSlice'

import { getCookie } from "../Cookies/Cookie";



const Auth = ({children}) => {

  const token = getCookie()?
  JSON.parse(getCookie()).token:"";
   
    const navigate = useNavigate();
    // const {user} = useSelector((state)=>state.loginSlice)
    console.log(token,"user.................")
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[token])
  return (
    <div>
      {children}
    </div>
  )
}

export default Auth
