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
import classes from './CategoricalData.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SkeletonComponent from "../Components/SkeletonComponent";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCategoryData, fetchCategoryDataById, fetchDataFromBackend } from "../Services.js/Http";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CommentSection from "./CommentSection";
import ShareSection from "./ShareSection";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {  likeApi } from "../Services.js/Http";
import { getCookie } from "../Cookies/Cookie";
import Animation from "../Components/Animation";
SwiperCore.use([Mousewheel]);

const CategoricalData = () => {

  const navigate = useNavigate()

  const msisdn = JSON.parse(getCookie()).msisdn;

   const url = useLocation();
   const path = url.pathname;
   const category_id = path.slice(10,path.length);
  //  console.log("id",category_id);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [index, setIndex] = useState("0");
    const [catData,setCatData] = useState([])
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("");
    const [openComment,setOpenComment] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoid,setVideoid] = useState("")
    const [like,setLike] = useState(3);
    const [share,setShare] = useState(false)
  

   
    useEffect(() => {
      // fetchDataFromBackend();
      const fetchData=async()=>{
        const arr = await fetchCategoryDataById(category_id);
        // const filteredData = arr.filter((item)=>item.sub_category_id == category_id)
        // console.log("----",filteredData);

        setData(arr);
        
        setLoading(false);
      }

      fetchData();
    }, []);
  
    const swiperRef = useRef(null);
    const [mute, setMute] = useState(false);
    const [loadingTitle,setLoadingTitle] = useState(true);
  
    const handleSlideChange = (activeIndex) => {
      // console.log(activeIndex, "activeIndex");
      setIndex(activeIndex);
      setMute(false);
    };


    const handleOnVideoClick=(idx)=>{
      // console.log("onVideoClicked",isPlaying)
      setIsPlaying(prevState => prevState && index === idx ? false : true);
    }
  
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
      // }
     
    }, []);
  
    useEffect(()=>{
      const fetchData=async()=>{
        const fetchedData = await fetchCategoryData();
        setCatData(fetchedData);
        // console.log("catData",fetchedData);
      }
      fetchData();
    },[])


    useEffect(()=>{

      for(let i=0;i<data.length;i++){
        // console.log(data[i])
        data[i].liked = false;
      }
    },[data])


    useEffect(()=>{
      const name = catData.findIndex((item)=>item.sub_cat_id == category_id)
      setTitle(catData[name]?.name);
      setLoadingTitle(false);
      // console.log(">>>>>>",desc)
    },[catData])


    const handleUnmuteClick = (activeIndex) => {
      setIndex(activeIndex);
      setMute(false);
     
    };

    useEffect(()=>{
      setDesc(data[index]?.description)
    },[data,index])

    const handleCommentClick=(videoId)=>{
      console.log(videoId,"----------------------------");
      setVideoid(videoId)
      setOpenComment(true)
      // setIsPlaying(!isPlaying)
    }
    const handleDoubleClick=async(id)=>{
      console.log("Double clicked")
      setVideoid(id);
      const response = await likeApi(id,msisdn)
      const video = data.find((item)=>item.id == id)
      console.log(video,"filter")
      const likeCount = video?.likes; 

      if(response == 1){
         setLike(response);
        setTimeout(()=>{
          setLike(3)
        },2000)
     
        video.liked = true;

        // console.log(like,"like");
        
      video.likes = likeCount+1;
      // console.log(video.likes,likeCount)
      }
      else{
        setLike(response);
        setTimeout(()=>{
          setLike(3)
        },2000)
      
        video.liked = false;
        // console.log("unlike")
        video.likes = likeCount-1;
      }
    }


    const handleShareClick=(videoId)=>{
      setShare(true);
      setVideoid(videoId)
      // setIsPlaying(true)
      // navigate(`/videoPlayById/${id}`)
    }

    

    // console.log("title",title,loadingTitle)

  return (
    <>
      <div className={classes.container}>
   
 
      <div className={classes.sub_container}>

      <div className={classes.top}>
      
      <div >
      <KeyboardBackspaceIcon fontSize="large" onClick={()=>{navigate('/discover')}} className={classes.back_icon} />
      </div>
      <p>

      {loadingTitle? "Loading...":title }
      </p>
      </div>
  
      {/* <Navbar/> */}
   
      <div className={classes.carousel_container}>
        <div className="swiper-container" ref={swiperRef}>
          <div className="swiper-wrapper">
            {!loading?
              data?.length > 0 &&
              data?.slice(0, 100).map((dataItem, videoIndex) => {
                return (
                  <div className="swiper-slide" key={dataItem?.id} onClick={()=>{handleOnVideoClick(videoIndex)}} onDoubleClick={()=>{handleDoubleClick(videoIndex)}}>
                  <Animation like={like}/>
                    <ReactPlayer
                      url={`https://dyf5pm23cs1z2.cloudfront.net/${dataItem?.videoid}/${dataItem?.videoid}.m3u8`}
                      controls={false}
                      playing={index == videoIndex ? true : false}
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
                          <p className={classes.text}>{dataItem.comments}</p>
                        </div>
                        {/* <div className={classes.item_container}>
                          <BookmarksIcon className={classes.icon} />
                          <p className={classes.text}>1.1k</p>
                        </div> */}
                        <div className={classes.item_container}>
                          <ShareIcon className={classes.icon} onClick={()=>{handleShareClick(dataItem?.id)}} style={{cursor:"pointer"}}/>
                          {/* <p className={classes.text}>2.1k</p> */}
                        </div>
                      </div>
                    </div>
                    <button
                      className={`${classes.unmute_button} ${
                        !mute && classes.inactive
                      }`}
                      onClick={() => handleUnmuteClick(index)}
                    >
                      <VolumeOffIcon className={classes.mute_icon} />
                      Unmute
                    </button>
                    <div style={{position:"absolute",bottom:"4%",left:"2%",color:"white",fontSize:"2rem"}}>
                    <p>
                    {desc}
                    </p>
                    </div>
                  </div>
                );
              }):
              <SkeletonComponent/>
              }
          </div>
        </div>
      </div>
   {/* <Footer active={1}/> */}
      </div>
      <CommentSection bottom={openComment} close={()=>{setOpenComment(false)}} videoId={videoid}/>
      <ShareSection bottom={share} close={()=>{setShare(false)}} vurl={`http://localhost:5173/videoPlayById/${videoid}`} />
   
      </div>
    </>
  )
}

export default CategoricalData
