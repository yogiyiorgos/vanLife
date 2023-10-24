import { useState, useEffect } from 'react'
import { NavLink, useParams, Link, Outlet } from 'react-router-dom'

const HostVanDetails = () => {
  const [vanDetails, setVanDetails] = useState({})
  const params = useParams()
  
  useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then(res => res.json())
      .then(data => setVanDetails(data.vans))
  }, [])

  if (!vanDetails) {
    return <h1>Loading...</h1>
  }

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616'
  }

  return (
    <section>
      <Link to='..'
        relative='path'
        className='back-button'
      >
        &larr; <span>Back to all vans</span>
      </Link>
      <div className='host-van-detail-layout-container'>
        <div className='host-van-detail'>
          <img src={vanDetails.imageUrl} />
          <div className='host-van-detail-info-text'>
            <i className={`van-type van-type-${vanDetails.type}`}>
              {vanDetails.type}
            </i>
            <h3>{vanDetails.name}</h3>
            <h4>${vanDetails.price}/day</h4>
          </div>
        </div>
      </div>

      <nav className='hast-van-detail-van'>
        <NavLink
          to='.'
          end
          style={({isActive}) => isActive ? activeStyles : null}
        >Details</NavLink>

        <NavLink
          to='pricing'
          style={({isActive}) => isActive ? activeStyles : null}
        >Pricing</NavLink>

        <NavLink
          to='photos'
          style={({isActive}) => isActive ? activeStyles : null}
        >Photos</NavLink>           
      </nav>
      <Outlet context={{vanDetails}} />
    </section>
  )
}

export default HostVanDetails