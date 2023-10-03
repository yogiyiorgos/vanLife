import { useState, useEffect} from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'

const HostVanLayout = () => {
  const [van, setVanDetails] = useState({})
  const params = useParams()

  useEffect(() => {
    fetch('/api/host/vans/:id')    
      .then(res => res.json())
      .then(data => setVanDetails(data.vans))
  }, [])

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'undeline',
    color: '#161616'
  }
    
  return (
    <>
      <Link to={`/host/vans`}>Back to all vans</Link>
      <div>
        <img src={van.imageUrl} />
        <p>{van.type}</p>
        <h3>{van.name}</h3>
        <p>${van.price}<span>/day</span></p>
      </div>
      <NavLink
        to={`/host/vans/${params.id}`}
        end
        style={({isActive}) => isActive ? activeStyles : null}
      >Details
      </NavLink>
      <NavLink
        to={`/host/vans/${params.id}/pricing`}
        end
        style={({isActive}) => isActive ? activeStyles : null}
      >Pricing
      </NavLink>
      <NavLink
        to={`/host/vans/${params.id}/photos`}
        end
        style={({isActive}) => isActive ? activeStyles : null}
      >Photos
      </NavLink>
      <Outlet />
    </>
  )
}

export default HostVanLayout