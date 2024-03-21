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
import classes from './VideoPlayById.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SkeletonComponent from "../Components/SkeletonComponent";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchDataFromBackend, fetchVideoById,likeApi  } from "../Services.js/Http";
import CommentSection from "./CommentSection";
import Lottie from "lottie-react";
import like_animation from '../Animations/like_animation.json'
import unlike_animation from '../Animations/unlike_animation.json'
import ShareSection from "./ShareSection";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Animation from "../Components/Animation";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getCookie } from "../Cookies/Cookie";
import { useMutation, useQuery } from "@apollo/client";
import { GET_LIKED_VIDEOS, GET_VIDEO_BY_ID } from "../Services.js/Queries";
import { TOGGLE_LIKE } from "../Services.js/Mutations";

SwiperCore.use([Mousewheel]);

const VideoPlayById = () => {

  const token = getCookie()?
  JSON.parse(getCookie()).token:"";

  const msisdn = getCookie()?JSON.parse(getCookie()).msisdn:"";

  const {id} = useParams();

    // const [loading, setLoading] = useState(true);
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

    const {data,loading,error} = useQuery(GET_VIDEO_BY_ID,{
      variables:{
        id:Number(id)
      },
      context:{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    })


    let videosWithLiked = vdata?.map(video => {
      if(!video.hasOwnProperty('liked')){
        return (
          { ...video, liked: false } 
      )
      }
      return video
     
       // Create a new object with 'liked' property added
  });


    useEffect(() => {
     
      if(data){
        setVData(data.getVideoById.result);
     console.log(data)
      }
      if(liked_videos){
        setLikedState(liked_videos?.userLikedVideos.result)
      }


    }, [data,liked_videos]);


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
  
    // console.log(data)
    const swiperRef = useRef(null);
    const [mute, setMute] = useState(false);
  
    const handleSlideChange = (activeIndex) => {
      if (activeIndex > 4) {
        setTimeout(()=>{
          setIndex(0);
       
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
      // console.log("onVideoClicked",isPlaying)
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



    const handleCommentClick=(videoId)=>{
      // console.log(videoId,"----------------------------");
      setVideoid(videoId)
      
      setOpenComment(true)
    }


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
              {vdata.map((dataItem, videoIndex) => {
                {/* console.log(videoIndex,index,"AV") */}
                return (
                  <>
                  <div className="swiper-slide" key={videoIndex} onClick={()=>{handleOnVideoClick(videoIndex)}} onDoubleClick={()=>{handleDoubleClick(dataItem?.id)}}>
                  <Animation like={like}/>
                    <ReactPlayer
                      url={`https://dyf5pm23cs1z2.cloudfront.net/${dataItem?.videoid}/${dataItem?.videoid}.m3u8`}
                      controls={false}
                      playing={index == videoIndex  && isPlaying}
                      loop={true}
                      muted={mute?true:false}
                      playsinline={true}
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
                        {!dataItem.liked?
                          <FavoriteBorderIcon  className={classes.icon} style={{cursor:"pointer"}} onClick={()=>{handleDoubleClick(dataItem?.id)}}/>:
                          <FavoriteIcon  className={classes.icon} style={{color:"#ef3f59",cursor:"pointer"}} onClick={()=>{handleDoubleClick(dataItem?.id)}}/>
                        }
                          <p className={classes.text}>{dataItem?.likes}</p>
                        </div>
                        <div className={classes.item_container}>
                          <CommentIcon className={classes.icon} onClick={()=>{handleCommentClick(dataItem?.id)}} style={{cursor:"pointer"}} />
                          <p className={classes.text}>{dataItem?.comments}</p>
                        </div>
                        {/* <div className={classes.item_container}>
                          <BookmarksIcon className={classes.icon}/>
                          <p className={classes.text}>1.1k</p>
                        </div> */}
                        <div className={classes.item_container}>
                          <ShareIcon className={classes.icon} onClick={()=>{setShare(true)}} />
                          {/* <p className={classes.text}>2.1k</p> */}
                        </div>
                      </div>
                    </div>
                    <div className={classes.text_bottom}>
                    {dataItem.description}
                    </div>
                  </div>






                  <div className="swiper-slide" key={videoIndex} onClick={()=>{handleOnVideoClick(videoIndex)}} onDoubleClick={()=>{handleDoubleClick(videoIndex)}}>
                  <div className={classes.explore_div}>
                  <p>
                  Explore More Videos
                 </p>
                 <Link to='/'>
                 <button className={classes.btn}>
                  Explore More..
                 </button>
                 </Link>
                  </div>
                
                  
                  </div>







                </>
                );
              }
              )
              }
              </>
              )
              :
              <SkeletonComponent/>
              }
          </div>
        </div>
      </div>
   <Footer active={0} />
  
   
      </div>
      <CommentSection bottom={openComment} close={()=>{setOpenComment(false)}} videoId={videoid} increaseComment={increaseCommentCount}/>
      <ShareSection bottom={share} close={()=>{setShare(false)}}  vurl={`http://localhost:5173/videoPlayById/${videoid}`} />
      </div>
    </>
  )
}

export default VideoPlayById;
