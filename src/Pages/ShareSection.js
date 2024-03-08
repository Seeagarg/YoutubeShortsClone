import react, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
    FacebookShareButton,
    FacebookShareCount,
    InstapaperShareButton,
    TelegramShareButton,
    WhatsappShareButton,
  } from "react-share";

  import {
    FacebookIcon,
    InstapaperIcon,
    TelegramIcon,
    WhatsappIcon,
    
  } from "react-share";

export default function ShareSection({bottom,close,vurl}) {

    // console.log(vurl,"url")
   
    const arr=[
    <TelegramShareButton url={vurl}>
    <TelegramIcon  size={32} round={true}  />
    </TelegramShareButton>,
    <WhatsappShareButton url={vurl}>
    <WhatsappIcon size={32} round={true} />
    </WhatsappShareButton>,
    <FacebookShareButton url={vurl}>
    <FacebookIcon  size={32} round={true}/>
    </FacebookShareButton>,
    <InstapaperShareButton url={vurl}>
    <InstapaperIcon  size={32} round={true} />
    </InstapaperShareButton>]


  const list = (anchor) => (
    <Box
      sx={{ width:"100%",scrollbarWidth:"5px" }}
      role="presentation"
    //   onClick={close}
      onKeyDown={close}
    >
      <List
      sx={{display:"flex"}}
      >
        {
          arr?.length>0 ?
          (
          arr.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton style={{fontSize:"3rem"}}>
              {/* <div style={{backgroundColor:"white",borderRadius:"50%",height:"25px",width:"25px"}}>
              <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="" style={{height:"25px",width:"25px",alignItems:"center"}} />
              </div> */}
              {item}
              {/* <ListItemText primary={item}  style={{paddingLeft:"10px"}} /> */}
            </ListItemButton>
          </ListItem>
        ))
          ):
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3rem"}}>
          No Comments to display !!
          </div>
        }
        
      </List>
     
    </Box>
  );



  return (
    <div>
      <div >
        <Drawer
          anchor={"bottom"}
          open={bottom}
          onClose={close}
          style={{width:"100%"}}
        >
        <div style={{backgroundColor:"#040000d9",height:"5rem",color:"white",width:"100%"}}>
        <div style={{width:"30%",height:"10px",backgroundColor:"#ef3f59",position:"absolute",top:"5%",left:"35%",borderRadius:"50px"}}></div>
        </div>
        <div style={{backgroundColor:"rgb(2 2 2 / 75%)",color:"white",width:"100%"}}>
        {list("bottom")}
        </div>
         
        </Drawer>
      </div> 
    </div>
  );
}
