import React from 'react'
import classes from './Navbar.module.css'
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  return (
    <div className={classes.navbar_container}>
      <div className={classes.navbar_sub_container}>
        <div className={classes.item_container}>
          <p className={classes.text}>Following</p>
          <div className={classes.underline}></div>
        </div>
        <div className={classes.item_container}>
          <p className={`${classes.text} ${classes.active}`}>For You</p>
          <div className={`${classes.underline} ${classes.bg_active}`}></div>
        </div>
        <div className={classes.item_container}>
          <SearchIcon sx={{color:'white',fontSize:'2.5rem'}}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
