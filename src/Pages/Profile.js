import React from 'react'
import classes from './Profile.module.css'
import Footer from '../Components/Footer'
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import TextsmsIcon from '@mui/icons-material/Textsms';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Cookies/Cookie';
import { useDispatch } from 'react-redux';
import { removeUser } from '../Slices/loginSlice';

// import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  
const dispatch = useDispatch();
  const msisdn = getCookie()?
  JSON.parse(getCookie()).msisdn:"";

  const handleLogOut=()=>{
    dispatch(removeUser());
    navigate('/login')
  }

  const navigate = useNavigate();
  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    <div className={classes.topProfile}>
      <KeyboardBackspaceIcon fontSize="large" onClick={()=>{navigate(-1)}} className={classes.back_icon}/>
      <p >
     Profile
      </p>
      </div>
    <div className={classes.top}>
    <div className={classes.profile_icon}>
    <PersonAddAltIcon fontSize='large' style={{cursor:"pointer"}}/>
    </div>
    <div className={classes.name}>
    <p className={classes.text}> {msisdn}</p>
    </div>
    <div className={classes.setting_icon}>
    <LogoutIcon fontSize='large' style={{cursor:"pointer"}}/>
    </div>
    </div>

    <div className={classes.img_section}>
    <div className={classes.img}>
    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="....." className={classes.image} />
    <div className={classes.edit_icon}>
    <EditIcon style={{cursor:"pointer"}} />
    </div>  
    </div>
    <div className={classes.data}>
    <p className={classes.text}>{msisdn}</p>
    <p  className={classes.text_2}>Video Grapher</p>
    </div>
    </div>
{/* 
    <div className={classes.edit_profile}>
        <div className={classes.followers_section}>
        <div className={classes.section}>
        <p style={{fontSize:"18px",fontWeight:"bold"}}>247</p>
        <p style={{fontSize:"12px"}}>posts</p>
        </div>
        <div className={classes.section}>
        <p style={{fontSize:"18px",fontWeight:"bold"}}>368 K</p>
        <p style={{fontSize:"12px"}}>Followers</p>
        </div>
        <div className={classes.section}>
        <p style={{fontSize:"18px",fontWeight:"bold"}}>368k</p>
        <p style={{fontSize:"12px"}}>Followings</p>
        </div>
        <div className={classes.section} style={{borderRight:"none"}}>
        <p style={{fontSize:"18px",fontWeight:"bold"}}>3.7 M</p>
        <p style={{fontSize:"12px"}}>Likes</p>
        </div>
        </div>
        <div className={classes.edit_btn}>
          <button className={classes.btn}><span><TextsmsIcon/></span> Edit Profile </button>
        </div>
    </div> */}

    {/* <div className={classes.profile_data}>
    <p style={{fontSize:"2rem",fontWeight:"bold",textAlign:"center"}}>About</p>
    <p style={{fontSize:"1.5rem",textAlign:"center",padding:"1rem"}}>Name &nbsp;&nbsp; | &nbsp;&nbsp; Andrew Aisnley</p>
    <p style={{fontSize:"1.5rem",textAlign:"center"}}>Phone No. &nbsp;&nbsp; | &nbsp;&nbsp; 9998762156</p>
    <div className={classes.edit_btn} style={{padding:"2rem"}}>
          <button className={classes.btn}><span><TextsmsIcon/></span> Log Out</button>
        </div>
    </div> */}

<div className={classes.icon} >
<LogoutIcon style={{fontSize:"5rem"}} onClick={handleLogOut}/>
</div>

    


    <Footer active ={3}/>
    </div>
    </div>
  )
}

export default Profile
