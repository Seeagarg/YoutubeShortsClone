import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonComponent = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444" style={{zIndex:"1"}}>
      <Skeleton variant="rectangular"  width={470} height={"100vh"} />
    </SkeletonTheme>
  )
}

export default SkeletonComponent
