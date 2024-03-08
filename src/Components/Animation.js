import React from 'react'
import Lottie from "lottie-react";
import like_animation from '../Animations/like_animation.json'
import unlike_animation from '../Animations/unlike_animation.json'

const Animation = ({like}) => {
  return (
    <div>
         {
                    like == 1 ?
                    <Lottie
                      animationData={like_animation}
                      loop={false}
                      style={{position:"absolute",top:"40%",left:"30%",height:"200px",width:"200px",zIndex:"99"}}
                    />:""
                  }
                  {like == 0 ?
              
                    <Lottie
                      animationData={unlike_animation}
                      loop={false}
                     
                      style={{position:"absolute",top:"40%",left:"30%",height:"200px",width:"200px",zIndex:"99"}}
                    />
                   :""
                  }
                  {like == 3 && ""}
    </div>
  )
}

export default Animation
