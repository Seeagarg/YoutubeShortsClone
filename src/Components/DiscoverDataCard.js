import React from 'react'
import classes from './DiscoverDataCard.module.css'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';

const DiscoverDataCard = ({name,id}) => {
    const navigate = useNavigate();
    // console.log(id)

    const handleOnClick=()=>{
        navigate(`/category/${id}`)
    }


  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    <div className={classes.item_img}>
    <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg" alt="" className={classes.img} />
    </div>
    <div className={classes.item_text}>
    <p className={classes.text}>{name}</p>
    <p className={classes.text_2}>Category | 23.3k</p>
    </div>
    <div className={classes.item_btn}>
    <button className={classes.btn} onClick={handleOnClick}><p>Watch</p> &nbsp;<span> <VisibilityIcon  style={{marginTop:"3px"}}/> </span></button>
    </div>
    </div>
    </div>
  )
}

export default DiscoverDataCard
