// import { Margin } from '@mui/icons-material'
import React from 'react'
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LikedSkeleton = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
    {/* <div style={{display:"grid",gridTemplateColumns:"150px / auto auto"}}> */}
    <Skeleton count={6} height={"20rem"} width={"100%"} style={{margin:"10px"}}/>
    {/* </div> */}
      
    </SkeletonTheme>
    </div>
  )
}

export default LikedSkeleton
