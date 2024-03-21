import { gql } from "@apollo/client";

export const LOGIN_USER = gql`mutation($msisdn:Int!,$password:String!){
    login(msisdn:$msisdn,password:$password){
      token
      msisdn
    }
  }
  `


  export const POST_COMMENT = gql`
  mutation($videoId:Int!,$msisdn:Int!,$comment:String!){
    postComment(videoId:$videoId,msisdn:$msisdn,comment:$comment){
      message
      status
    }
  }
  `

  export const TOGGLE_LIKE = gql`
  
mutation($videoId:Int!,$msisdn:Int!){
  toggleLike(videoId:$videoId,msisdn:$msisdn){
    message
    status
  }
}
  `