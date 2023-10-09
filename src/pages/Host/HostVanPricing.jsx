import { useOutletContext } from "react-router-dom"

const HostVanPricing = () => {
  const { vanDetails } = useOutletContext()

  return (
    <h3 className='host-van-price'>${vanDetails.price}<span>/day</span></h3>
  )
}

export default HostVanPricing