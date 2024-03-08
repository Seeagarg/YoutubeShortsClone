import React from 'react'
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DiscoverSkeleton = () => {
  return (
    <div>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div style={{margin:"10px"}}>
        <Skeleton variant="rectangular"  width={"100%"} height={"6em"} />
        </div>
           
        <div style={{margin:"10px"}}>
        <Skeleton variant="rectangular"  width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px "}}>
        <Skeleton variant="rectangular"  width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px"}}>
        <Skeleton variant="rectangular"  width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px "}}>
        <Skeleton variant="rectangular"   width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px"}}>
        <Skeleton variant="rectangular"  width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px "}}>
        <Skeleton variant="rectangular"   width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px "}}>
        <Skeleton variant="rectangular"   width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px "}}>
        <Skeleton variant="rectangular"   width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px "}}>
        <Skeleton variant="rectangular"   width={"100%"} height={"6em"} />
        </div>
        <div style={{margin:"10px "}}>
        <Skeleton variant="rectangular"   width={"100%"} height={"6em"} />
        </div>
        </SkeletonTheme>
    </div>
  )
}

export default DiscoverSkeleton
