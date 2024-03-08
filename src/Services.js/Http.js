
import axios from "axios";
import { getCookie } from "../Cookies/Cookie";

const BACKEND_URL = "http://5.189.166.187:4001";

const token = getCookie()?
 JSON.parse(getCookie()).token:"";
// const token = "1234567"


export const fetchDataFromBackend=async()=>{
  // console.log(token,"tokkkkkkeeennnn");
    try {
        const response = await axios.get(
          `${BACKEND_URL}/api/videos`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      
        );
        // console.log(response?.data,"rr")
        return response?.data.result;
      } catch (error) {
        console.log("Error While fetching Data",error);
      }
}


export const fetchVideoById=async(id)=>{
  try{
    const response = await axios.post(
      `${BACKEND_URL}/api/video-by-id`,{
        videoId:id
      },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    );

    // console.log(response.data.result,"data")
    return response.data.result;
    
  }
  catch(err){
    console.log(err)
  }
}



export const fetchCategoryData=async()=>{
  try {
      const response = await axios.post(
        "https://api.ndotostream.com/fetch-product-vodacom",
        {
          serviceName: "faith",
        }
      );
      // console.log("====",response?.data?.categories)
      return response?.data?.categories;
    } catch (error) {
      console.log("Error While fetching Data",error);
    }
}



export const fetchCategoryDataById=async(catId)=>{
  try {
      const response = await axios.post(
        `${BACKEND_URL}/api/videos-cat-id`,
        {
          catId:catId,
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      // console.log("====category Data",response?.data?.result)
      return response?.data?.result;
    } catch (error) {
      console.log("Error While fetching Data",error);
    }
}


export const loginApi=async(number,password)=>{
  try{
    // console.log(number,password)
    const response = await axios.post(`${BACKEND_URL}/api/login`,{
      msisdn:number,
      password:password
    })
    return response.data;
  }
  catch(err){
    console.log(err)
  }
}


export const addComment=async(videoId,msisdn,comment)=>{
  try{

    // console.log(videoId,msisdn,comment)
    const response = await axios.post(`${BACKEND_URL}/api/post-comments`,{
      videoId:videoId,
      msisdn:msisdn,
      comment:comment
    },
    {headers:{
      Authorization: `Bearer ${token}`
    }})
    // console.log(response,"posted Comment")
    return response.data.message
  }
  catch(err){
    return err;
  }
}


export const getComments=async(videoId)=>{
  try{
    const response = await axios.post(`${BACKEND_URL}/api/get-comments`,
    {
      videoId:videoId
    },
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    // console.log("response get comments",response.data.result)
    return response.data.result
  }
  catch(err){
    console.log(err,"err");
  }
}

export const likeApi=async(id,msisdn)=>{
  // console.log(id,msisdn,"------")
  try{
    const response = await axios.post(`${BACKEND_URL}/api/toggle-like`,{
      videoId: id,
      msisdn: msisdn
    },{
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
    )

    // console.log(response.data.status,"----response")
    return response.data.status;

  }
  catch(err){

  }
}


export const LikedVideoApi=async(msisdn)=>{
  try{
    const response = await axios.post(`${BACKEND_URL}/api/user-liked-videos`,{
      msisdn : msisdn
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    )
    // console.log(response.data,"liked videos")
    return response.data.result;
  }
  catch(err){
    console.log(err)
  }
}