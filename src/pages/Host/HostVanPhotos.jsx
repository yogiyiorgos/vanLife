import { useOutletContext } from "react-router-dom"

const HostVanPhotos = () => {
  const { vanDetails } = useOutletContext()
  
  return (
    <img src={vanDetails.imageUrl} className='host-van-detail-image' />
  )
}

export default HostVanPhotos