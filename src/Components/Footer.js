import React,{useRef} from 'react'
import classes from './Footer.module.css'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getCookie } from '../Cookies/Cookie';
import LoginIcon from '@mui/icons-material/Login';
const Footer = ({active}) => {

    const token = getCookie()?
 JSON.parse(getCookie()).token:"";

  return (
    <div className={classes.bottom_navbar_container}>
    <div className={classes.bottom_navbar_sub_container}>
  
        <div className={classes.item_container} >
        <Link   to='/' className={classes.item_container} >
            <HomeIcon className={`${classes.icon} ${active=='0'?classes.active:""}`} />
            <p className={`${classes.text} ${active=='0'?classes.active:""}`}>Home</p>
            </Link>
        </div>

    
        <div className={`${classes.item_container}`}>
        <Link to='/discover' className={classes.item_container} >
            <ExploreIcon className={`${classes.icon} ${active=='1'?classes.active:""}`}  />
            <p className={`${classes.text} ${active=='1'?classes.active:""}`} >Discover</p>
            </Link>
        </div>
        
        
        <div className={classes.item_container}>
        <Link to='/liked'  className={`${classes.item_container}`}>
            <FavoriteIcon className={`${classes.icon} ${active=='2'?classes.active:""}`} />
            <p className={`${classes.text} ${active=='2'?classes.active:""}`}>Liked</p>
            </Link>
        </div>
        
        <div className={classes.item_container}>
        {token?<Link  to='/profile' className={classes.item_container}>
            <PersonIcon className={`${classes.icon} ${active=='3'?classes.active:""}`} />
            <p className={`${classes.text} ${active=='3'?classes.active:""}`}>Profile</p>
            </Link>
        : <Link  to='/login' className={classes.item_container}>
            <LoginIcon className={`${classes.icon} ${active=='3'?classes.active:""}`} />
            <p className={`${classes.text} ${active=='3'?classes.active:""}`}>Login</p>
            </Link>



        }
       
        </div>

    </div>
</div>
  )
}

export default Footer
