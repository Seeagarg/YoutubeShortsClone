import React, { useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Mousewheel } from "swiper/modules";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import axios from "axios";
import dashjs from "dashjs";
import ReactPlayer from "react-player";
import classes from './Home.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SkeletonComponent from "../Components/SkeletonComponent";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LikedVideoApi, fetchDataFromBackend, likeApi } from "../Services.js/Http";
import CommentSection from "./CommentSection";
import ShareSection from "./ShareSection";
import { Navigate, useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getCookie } from "../Cookies/Cookie";
import Animation from "../Components/Animation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_LIKED_VIDEOS, GET_VIDEOS } from "../Services.js/Queries";
import { POST_COMMENT, TOGGLE_LIKE } from "../Services.js/Mutations";


SwiperCore.use([Mousewheel]);

const Home = () => {

  const msisdn = getCookie()?
  JSON.parse(getCookie()).msisdn:"";

  const token = getCookie()?
  JSON.parse(getCookie()).token:"";

  const navigate = useNavigate()
    const [vdata, setVData] = useState([]);
    const [index, setIndex] = useState(0);
    const [startIdx,setStartIdx] = useState(0);
    const [endIdx,setEndIdx] = useState(10);
    const [openComment,setOpenComment] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoid,setVideoid] = useState("")
    const [like,setLike] = useState(3);
    const [share,setShare] = useState(false)
    const [likedState,setLikedState] = useState([]);

    const [likedVideos,setLikedVideos] = useState();
    const {data:liked_videos,loading:liked_loading,error:liked_videos_error} = useQuery(GET_LIKED_VIDEOS,{
      variables:{
        msisdn:Number(msisdn)
      },
      context:{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    })
    const [toggleLike,{data:video_like,loading:loading_like,error:error_like}] = useMutation(TOGGLE_LIKE)
    const {loading,error,data,refetch} = useQuery(GET_VIDEOS,{
      context:{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    })


    // const [unlike,setUnlike] = useState(0);
    // const [commentCount,setCommentCount] = useState("")
    // const [showComment,setshowComment] = useState(false)
  
    useEffect(()=>{
      if(data){
        setVData(data?.getVideos.result)
      }

      if(liked_videos){
        setLikedState(liked_videos?.userLikedVideos.result)
      }
      
     
    },[data,liked_videos])

 

    let videosWithLiked = vdata?.map(video => {
      if(!video.hasOwnProperty('liked')){
        return (
          { ...video, liked: false } 
      )
      }
      return video
     
       // Create a new object with 'liked' property added
  });


    useEffect(()=>{
     
    },[vdata])
  
    // console.log(vdata,"data---------------------------")
    const swiperRef = useRef(null);
    const [mute, setMute] = useState(false);
  
    const handleSlideChange = (activeIndex) => {
      console.log(activeIndex,"ac")
      if (activeIndex > 9) {
        setTimeout(()=>{
          refetch()
          setIndex(0);
          setStartIdx(0);
          setEndIdx(10);
          setMute(false);
          
          swiperRef?.current?.swiper?.slideTo(0);
        },800);
      } else {
        setIndex(activeIndex);
        setMute(false);
      }
      
    };


    
  
    useEffect(() => {
      // if(!loading){
        const swiperInstance = new SwiperCore(swiperRef.current, {
          direction: "vertical",
          observer: true,
          observeParents: true,
          slidesPerView: 1,
          parallax: true,
          mousewheel: {
            forceToAxis: true,
            thresholdTime: 1000,
            thresholdDelta: 20,
          },
          grabCursor: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          on: {
            slideChange: () => handleSlideChange(swiperInstance.activeIndex),
          },
        });
    
        return () => {
          swiperInstance.destroy(true, true);
        };
    }, []);
  
    const handleUnmuteClick = (activeIndex) => {
      setIndex(activeIndex);
      setMute(false);
    };


    const handleOnVideoClick=(idx)=>{
      setIsPlaying(prevState => prevState && index === idx ? false : true);
    }

    const handleDoubleClick=async(id)=>{

      setVideoid(id);
      console.log(id);
      toggleLike({
        variables:{
          videoId:id,
          msisdn:msisdn
        },
        context:{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      })
     }


     useEffect(()=>{
      if(video_like){
        console.log(video_like?.toggleLike.status)
        const video = videosWithLiked.find((item)=>item.id == videoid)
        console.log(video)
        const likeCount = video?.likes; 
        if(video_like?.toggleLike.status == 1){
           setLike(video_like.toggleLike.status );
           video.liked = true;
           console.log(video.likes,'count')
         video.likes = likeCount+1;
         console.log(video.likes,'count')
          setTimeout(()=>{
            setLike(3)
          },2000)
        }
        else{
          setLike(video_like?.toggleLike.status );
          setTimeout(()=>{
            setLike(3)
          },2000)
        
          video.liked = false;
          if(likeCount !== 0){
            video.likes = likeCount-1;
          }
          
        }
        setVData(videosWithLiked)
      }
     },[video_like])


    // console.log(video_like)

    const handleCommentClick=(videoId,count)=>{
      setVideoid(videoId)
      setOpenComment(true)
    }

    const handleShareClick=(videoId)=>{
      setShare(true);
      setVideoid(videoId)
    }

    useEffect(()=>{
     
      console.log(likedState,'liked')
      if(likedState){
        console.log(likedState,'liked')
      const arr = likedState?.find((item)=>item.id == vdata[index]?.id )
      console.log(videosWithLiked)
      if(arr){
        videosWithLiked[index].liked = true;
        setVData(videosWithLiked)
      }
      }
    },[likedState,index])


    const increaseCommentCount=()=>{
      const video = videosWithLiked.find((item)=>item.id == videoid)
      
      const commentCount = video.comments; 
      
      video.comments = commentCount+1;
      setVData(videosWithLiked)
    }
  


  return (
    <>
      <div className={classes.container}>

 
      <div className={classes.sub_container}>
  
      {/* <Navbar/> */}
   
      <div className={classes.carousel_container}>
        <div className="swiper-container" ref={swiperRef}>
          <div className="swiper-wrapper">
            {
              !loading?
              vdata?.length > 0 
              &&(
                <>
              {vdata.slice(startIdx,endIdx).map((dataItem, videoIndex) => {
                {/* console.log(videoIndex,index,"AV") */}
                {/* {()=>{setVideoid(dataItem.id)}} */}
                return (
                  <>
                  <div className="swiper-slide" key={videoIndex} >
               
               <Animation like={like}/>

                    <ReactPlayer
                      url={`https://dyf5pm23cs1z2.cloudfront.net/${dataItem?.videoid}/${dataItem?.videoid}.m3u8`}
                      controls={false}
                      playing={index == videoIndex  && isPlaying}
                      loop={true}
                      muted={mute?true:false}
                      playsinline={true}
                      onClick={()=>{handleOnVideoClick(videoIndex)}} 
                      onDoubleClick={()=>{handleDoubleClick(dataItem?.id)}}
                      className={classes.bg_vid}
                      width="100%"
                      height="calc(100vh - 5rem)" 
                      light={index!=videoIndex && <img src={dataItem?.imgawsurl} alt='Thumbnail' />}
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
                    
                    <div className={classes.info_container}>
                      <div className={classes.info_sub_container}>
                        <div className={classes.item_container}>
                        {
                          !dataItem.liked?
                          <FavoriteBorderIcon  className={classes.icon} style={{cursor:"pointer"}} onClick={()=>{handleDoubleClick(dataItem?.id)}}/>:
                          <FavoriteIcon  className={classes.icon} style={{color:"#ef3f59",cursor:"pointer"}} onClick={()=>{handleDoubleClick(dataItem?.id)}}/>
                        }
                          <p className={classes.text}>{dataItem?.likes}</p>
                        </div>
                        <div className={classes.item_container}>
                          <CommentIcon className={classes.icon} onClick={()=>{handleCommentClick(dataItem?.id)}} style={{cursor:"pointer"}} />
                          <p className={classes.text}>{dataItem?.comments}</p>
                        </div>
                      
                        <div className={classes.item_container}>
                          <ShareIcon className={classes.icon} onClick={()=>{handleShareClick(dataItem?.id)}} style={{cursor:"pointer"}} />
                        </div>
                      </div>
                    </div>
                    <div className={classes.text_bottom}>
                    {dataItem.description}
                    </div>
                  
                  </div>
                  
                 
                </>
                );
              })
              }

              <div className="swiper-slide">
                  <Skeleton
                    sx={{
                      bgcolor: "grey.800",
                      width: "100%",
                      height: "100dvh",
                    }}
                    variant="rectangular"
                  />
                </div>
              </>
              )
              :
              <SkeletonComponent/>
              }
          </div>
        </div>
      </div>
   <Footer active={0} />
   {/* <div style={{width:"100%"}}> */}
   {/* </div> */}
      </div>
      <CommentSection bottom={openComment} close={()=>{setOpenComment(false)}} videoId={videoid} increaseComment={increaseCommentCount}/>
      <ShareSection bottom={share} close={()=>{setShare(false)}} vurl={`http://localhost:5173/videoPlayById/${videoid}`} />
      </div>
    </>
  )
}

export default Home
