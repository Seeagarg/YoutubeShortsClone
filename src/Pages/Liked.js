import React, { useEffect, useState,useRef } from 'react'
import classes from './Liked.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Footer from '../Components/Footer';
import { LikedVideoApi, fetchDataFromBackend } from '../Services.js/Http';
import { ListItem } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReactPlayer from 'react-player';
import dashjs from "dashjs";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LikedSkeleton from '../Components/LikedSkeleton';
import { useNavigate } from 'react-router-dom';
import { getCookie } from "../Cookies/Cookie";
import { useQuery } from '@apollo/client';
import { GET_LIKED_VIDEOS } from '../Services.js/Queries';


const Liked = () => {

  const token = getCookie()?JSON.parse(getCookie()).token:"";

    const playerRef = useRef(null);

    const navigate = useNavigate()
    const [isPlaying, setIsPlaying] = useState(false);

    const [arr,setArr] = useState([]);
    const [videoIndex, setVideoIndex] = useState(null);
    const [mute,setMute] = useState(false);
    // const [loading,setLoading] = useState(true);

    const msisdn = getCookie()?JSON.parse(getCookie()).msisdn:"";

    const {data,loading,error} = useQuery(GET_LIKED_VIDEOS,{
      variables:{
        msisdn:Number(msisdn)
      },
      context:{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    })
   

    useEffect(()=>{
        // const fetchData = async()=>{
            // const data = await LikedVideoApi(msisdn);
            // console.log("--",data);
            if(data){
              setArr(data.userLikedVideos.result);
              // console.log(data)
            }
            
            // setLoading(false);
        // }
        // fetchData()
        
    },[data])

    const handleOnVideoClick=(idx)=>{
        setVideoIndex(idx);
        // setIsPlaying(!isPlaying); 
        setIsPlaying(prevState => prevState && videoIndex === idx ? false : true);  
    }

    


  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    <div className={classes.top}>
      <KeyboardBackspaceIcon fontSize="large" onClick={()=>{navigate(-1)}} className={classes.back_icon}/>
      <p style={{color:"#ef3f59"}}>
      Liked Videos
      </p>
      </div>

      <div className={classes.videos}>
      {!loading?
       arr.map((item,index)=>(
        <>
            <div className={classes.video} onClick={()=>{handleOnVideoClick(index)}}>
            {/* <img src={item.imgawsurl} alt="" className={classes.img} /> */}
            <ReactPlayer
            // ref={playerRef}
                      url={`https://dyf5pm23cs1z2.cloudfront.net/${item?.videoid}/${item?.videoid}.m3u8`}
                      controls={false}
                    //   playing={videoIndex == index ? true : false}
                    playing={videoIndex == index  && isPlaying}
                      loop={true}
                      muted={mute?true:false}
                    //   className="small-video"
                      playsinline={true}
                    //   stopOnUnmount={false}
                      className={classes.bg_vid}
                      style={{ height:"10rem"}}
                      width="100%"
                      height="20rem" 
                      light={
                    index != videoIndex && (
                      <img
                        className={classes.img}
                        src={item?.imgawsurl}
                        alt="Thumbnail"
                        // onClick={()=>{handleOnVideoClick(index)}}
                      />
                    )
                  }
                      config={{
                        file: {
                          attributes: {
                            crossOrigin: "anonymous",
                          },
                        },
                        forceDASH: true,
                        dashOptions: {
                          debug: {
                            logLevel: dashjs.Debug.LOG_LEVEL_INFO,
                          },
                        },
                      }}
                    />


                    {/* <ReactPlayer
                  url={item?.vurlaws}
                  controls={true}
                  playing={index == videoIndex ? true : false}
                  loop={true}
                  playsinline={true}
                  className={classes.bg_vid}
                  width="100%"
                  height="calc(100vh - 5rem)"
                  onClick={() => setVideoIndex(index)}
                  light={
                    index != videoIndex && (
                      <img
                        className={classes.img}
                        src={item?.imgawsurl}
                        alt="Thumbnail"
                        onClick={() => setVideoIndex(index)}
                      />
                    )
                  }
                  config={{
                    file: {
                      attributes: {
                        crossOrigin: "anonymous",
                      },
                    },
                    forceDASH: true,
                    dashOptions: {
                      debug: {
                        logLevel: dashjs.Debug.LOG_LEVEL_INFO,
                      },
                    },
                  }}
                /> */}
            </div>
        </>
       )):<LikedSkeleton/>
      }
      </div>

      <div className={classes.footer}>
      <Footer active ={2}/>
      </div>
      
    </div>
    </div>
  )
}

export default Liked
