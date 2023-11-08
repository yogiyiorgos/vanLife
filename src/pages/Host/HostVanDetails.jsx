import { Suspense } from 'react'
import { 
  NavLink, 
  Link, 
  Outlet, 
  useLoaderData,
  defer,
  Await
} from 'react-router-dom'
import { getHostVans } from '../../../api'
import { requireAuth } from '../../../utils'

export async function hostVanDetailsLoader({ params, request }) {
  await requireAuth(request)
  return defer({ vanDetails: getHostVans(params.id) })
}

export default function HostVanDetails() {
  const dataPromise = useLoaderData()

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616'
  }

  function renderHostVanDetails(vanDetails) {
    return (
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
    )    
  }

  return (
    <section>
      <Link 
        to='..'
        relative='path'
        className='back-button'
      >
        &larr; <span>Back to all vans</span>
      </Link>

      <Suspense fallback={<h2>Loading van details...</h2>}>
        <Await resolve={dataPromise.vanDetails}>
          {renderHostVanDetails}

      <nav className='hast-van-detail-van'>
        <NavLink
          to='.'
          end
          style={({isActive}) => isActive ? activeStyles : null}
        >
          Details
        </NavLink>

        <NavLink
          to='pricing'
          style={({isActive}) => isActive ? activeStyles : null}
        >
          Pricing
        </NavLink>

        <NavLink
          to='photos'
          style={({isActive}) => isActive ? activeStyles : null}
        >
          Photos
        </NavLink>           
      </nav>
      <Outlet context={{vanDetails}} />
        </Await>
      </Suspense>
    </section>
  )
}
