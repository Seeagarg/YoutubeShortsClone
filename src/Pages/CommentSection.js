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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import classes from './CommentSection.module.css'
import SmsIcon from '@mui/icons-material/Sms';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { addComment, getComments } from "../Services.js/Http";
import { getCookie } from "../Cookies/Cookie";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VIDEO_COMMENT } from "../Services.js/Queries";
import { POST_COMMENT } from "../Services.js/Mutations";


export default function CommentSection({bottom,close,videoId,increaseComment}) {
    // console.log(bottom)

    const token = getCookie()?
 JSON.parse(getCookie()).token:"";

    const [comment,setComment] = useState("")
    const [arr,setArr] = useState([]);
    const [postComment,{data:comment_data,loading:comment_post_loading,error:comment_post_error}] = useMutation(POST_COMMENT)

    const {data,loading,error,refetch} = useQuery(GET_VIDEO_COMMENT,{
      variables:{
        videoId:Number(videoId),

      },
        context:{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      
    })

    const msisdn = getCookie()?
    JSON.parse(getCookie()).msisdn:"";;
    // console.log(msisdn,"msisdn")

  // const arr = ["Nice", "Good", "awesome", "Drafts", "Good", "awesome", "Drafts", "Good", "awesome", "Drafts"];

  


  
  const sendComment=async()=>{
    try{
      increaseComment();
      postComment({
        variables:{
          videoId:videoId,
          msisdn:msisdn,
          comment:comment
        },
        context:{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      })
      // console.log(response,"r");
      
      refetch()
      // console.log(videoId,comment,msisdn,"Added Comment")
    }
    catch(err){
      console.log("err",err);
    }
    setComment("");
    refetch()
    // getCommentsFromBackend();
  }
  const getCommentsFromBackend=async()=>{
    if(bottom){
    // const response= await getComments(videoId);
    // setArr(response);
    }
    
    // console.log(response,"comment response");
  }
  console.log(data)

  useEffect(()=>{
    const handleKeyPress=(event)=>{
      if(event.key === 'Enter'){
        const button = document.getElementById('MyButton');
        if(button){
          button.click();
        }
      }

    }
    document.addEventListener('keypress',handleKeyPress);

    return ()=>{
      document.removeEventListener('keypress',handleKeyPress);
    }
  },[])

  useEffect(()=>{
    // getCommentsFromBackend();
    if(data){
      setArr(data.getVideoComments.result)
    }
  },[data])


  const list = (anchor) => (
    <Box
      sx={{ width:"100%",height:"50vh",overflowY:"scroll",scrollbarWidth:"5px", }}
      role="presentation"
    //   onClick={close}
    
      onKeyDown={close}
      
    >
      <List>
        {
          arr?.length>0 ?
          (
          arr.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton style={{fontSize:"3rem"}}>
              <div style={{backgroundColor:"white",borderRadius:"50%",height:"25px",width:"25px"}}>
              <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="" style={{height:"25px",width:"25px",alignItems:"center"}} />
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"self-start"}}>
              <p style={{fontSize:"10px",textAlign:"left",paddingLeft:"10px",margin:"0px"}} >{item?.msisdn}</p>
              <ListItemText primary={item?.comment}  style={{paddingLeft:"10px",margin:"0px"}} />
              </div>
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



// console.log(arr,"array of comments")


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
          <div className={classes.comment}>

      
<div className={classes.input}>
<SmsIcon fontSize='large' style={{color:'white'}}/>
<input  type="text" placeholder="Add Comment" name="userpassword" value={comment} onChange={(e)=>{setComment(e.target.value)}}  />
</div>
<div id="MyButton" className={classes.sendIcon} onClick={sendComment}>
<SendIcon  style={{fontSize:"3.5rem",cursor:"pointer"}}/>
</div>
</div>
        </div>
         
        </Drawer>
      </div> 
    </div>
  );
}
