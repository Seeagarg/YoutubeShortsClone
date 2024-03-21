import { gql } from "@apollo/client";
import { getCookie } from "../Cookies/Cookie";



export const GET_VIDEOS = gql`
query
{
  getVideos {
    result {
      id
      description
      imgurl
      name
      videoid
      vurl
      category_id
      sub_category_id
      views
      likes
      vurlaws
      imgawsurl
      comments
    }
  }
},
`


export const GET_VIDEOS_BY_CATEGORY = gql`
query($catId:Int!){
  getVideosByCatId(catId:$catId){
	result{
    id
     		description
        imgurl
        name
        videoid
        vurl
        category_id
        sub_category_id
        views
        likes
        vurlaws
        imgawsurl
        comments
  }
  }
}
`



export const GET_VIDEO_COMMENT = gql`
query($videoId:Int!){
  getVideoComments(videoId:$videoId){
    result{
      id
      videoId
      msisdn
      comment
      date_time
    }
  }
}
`



export const GET_VIDEO_BY_ID = gql`
query($id:Int!){
  getVideoById(id:$id){
	result{
    id
     		description
        imgurl
        name
        videoid
        vurl
        category_id
        sub_category_id
        views
        likes
        vurlaws
        imgawsurl
        comments
  }
  }
}
`



export const GET_LIKED_VIDEOS = gql`
query ($msisdn: Int!) {
  userLikedVideos(msisdn: $msisdn) {
    result {
      id
      description
      imgurl
      name
      videoid
      vurl
      category_id
      sub_category_id
      views
      likes
      vurlaws
      imgawsurl
      comments
    }
  }
}
`