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

SwiperCore.use([Mousewheel]);

const VideoPlayById = () => {

  const msisdn = JSON.parse(getCookie()).msisdn;

  const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [startIdx,setStartIdx] = useState(0);
    const [endIdx,setEndIdx] = useState(10);
    const [openComment,setOpenComment] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoid,setVideoid] = useState("")
    const [like,setLike] = useState(3);
    const [share,setShare] = useState(false)

    useEffect(() => {
      async function fetchData(){
        // console.log(id,'videoId')
        const fetchedData = await fetchVideoById(id);
      // console.log(fetchedData)
      setData(fetchedData);
      
      setLoading(false);
      }
      fetchData();
    }, []);
  
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


    useEffect(()=>{

      for(let i=0;i<data?.length;i++){
        // console.log(data[i])
        data[i].liked = false;
      }
    },[data])


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
      const response = await likeApi(id,msisdn)
      const video = data.find((item)=>item.id == id)
      const likeCount = video?.likes; 

      if(response == 1){
         setLike(response);
        setTimeout(()=>{
          setLike(3)
        },2000)
     
        video.liked = true;
      video.likes = likeCount+1;
      }
      else{
        setLike(response);
        setTimeout(()=>{
          setLike(3)
        },2000)
      
        video.liked = false;
        video.likes = likeCount-1;
      }
    }

    const handleCommentClick=(videoId)=>{
      // console.log(videoId,"----------------------------");
      setVideoid(videoId)
      setOpenComment(true)
    }

  


  return (
    <>
      <div className={classes.container}>

 
      <div className={classes.sub_container}>
  
      <Navbar/>
   
      <div className={classes.carousel_container}>
        <div className="swiper-container" ref={swiperRef}>
          <div className="swiper-wrapper">
            {
              !loading?
              data?.length > 0 
              &&(
                <>
              {data.map((dataItem, videoIndex) => {
                {/* console.log(videoIndex,index,"AV") */}
                return (
                  <>
                  <div className="swiper-slide" key={videoIndex} onClick={()=>{handleOnVideoClick(videoIndex)}} onDoubleClick={()=>{handleDoubleClick(videoIndex)}}>
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
              {/* <div className="swiper-slide">
                  <Skeleton
                    sx={{
                      bgcolor: "grey.800",
                      width: "100%",
                      height: "100dvh",
                    }}
                    variant="rectangular"
                  />
                </div> */}
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
      <CommentSection bottom={openComment} close={()=>{setOpenComment(false)}} videoId={videoid}/>
      <ShareSection bottom={share} close={()=>{setShare(false)}}  vurl={`http://localhost:5173/videoPlayById/${videoid}`} />
      </div>
    </>
  )
}

export default VideoPlayById;
