import React, { useEffect, useState } from 'react'
import classes from './Login.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import axios from 'axios';
import { setCookie } from '../Cookies/Cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slices/loginSlice';
import { loginApi } from '../Services.js/Http';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../Services.js/Mutations';


const Login = () => {

  const dispatch = useDispatch();

  const [login,{data,loading,error}] = useMutation(LOGIN_USER)

  const [number,setNumber] = useState("");
  const [password,setPassword] = useState("");
  // console.log(number,password,"00")

  const clickHandler=async(e)=>{
    e.preventDefault();
    // console.log("clicked")
    // const response = await loginApi(number,password);
    // if(response){
    //   dispatch(setUser(response));
    // console.log(response,'r');
    // navigate('/')
    // }

    
    login({variables:{msisdn:number,password:password}})
  }

  useEffect(()=>{
    if(!loading){
      // console.log(data)
      if(data){
        dispatch(setUser(data?.login))
        navigate('/')
      }
    }
  },[loading])

  

  const navigate = useNavigate();
  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    <div className={classes.topProfile}>
      <KeyboardBackspaceIcon fontSize="large" onClick={()=>{navigate(-1)}} className={classes.back_icon}/>
      <p >
     Login Page
      </p>
      </div>
      <div className={classes.main}>
      <div className={classes.header}>
      Login To Your Account
      </div>
      <div className={classes.search}>

<form action="submit" style={{width:"100%"}}>
<div className={classes.input}>
<PhoneAndroidIcon fontSize='large' style={{color:'rgb(205 200 200 / 53%)'}}/>
<input  type="text" placeholder="number" name="username" value={number} onChange={(e)=>{setNumber(Number(e.target.value))}}   />
</div>
  
  <div className={classes.input}>
<LockIcon fontSize='large' style={{color:'rgb(205 200 200 / 53%)'}}/>
<input  type="password" placeholder="password" name="userpassword" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
</div>
  <button type='submit' className={classes.btn} onClick={clickHandler}>LOGIN</button>
</form>


    </div>

    </div>

      <Footer active ={3}/>
    </div>
    </div>
  )
}

export default Login
