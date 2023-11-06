import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {
  const { vanDetails } = useOutletContext()
  
  return (
    <img src={vanDetails.imageUrl} className='host-van-detail-image' />
  )
}