import React from 'react'
import classes from './DiscoverImageCard.module.css'

const DiscoverImageCard = () => {
  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    <div className={classes.img_div}>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCwOA9BTcf0epTtlQVR_KIZe-_T-zIA6UzLg&usqp=CAU" alt="" className={classes.img} />
    </div>
    
    <div className={classes.data}>
    <p className={classes.text}>Category Name</p>
    <p className={classes.text_2}>Category Data | 23.3k</p>
    </div>
    </div>
    </div>
  )
}

export default DiscoverImageCard
