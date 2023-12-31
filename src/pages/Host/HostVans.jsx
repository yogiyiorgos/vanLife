import { Suspense } from 'react'
import { 
  Link, 
  useLoaderData,
  defer,
  Await
 } from 'react-router-dom'
import { getHostVans } from '../../../api'
import { requireAuth } from '../../../utils'

export async function hostVansLoader({ request }) {
  await requireAuth(request)
  return defer({ hostVansData: getHostVans() })
}

export default function HostVans() {
  const dataPromise = useLoaderData()

  function renderHostVanElements(hostVansData) {
    const hostVanElements = hostVansData.map((hostVan) => (
      <Link 
        to={`${hostVan.id}`} 
        key={hostVan.id}
        className='host-van-link-wrapper'>

        <div className='host-van-single' key={hostVan.id}>
          <img src={hostVan.imageUrl} />
          <div className='host-van-info'>
            <h3>{hostVan.name}</h3>
            <p>${hostVan.price}<span>/day</span></p>
          </div>
        </div>
      </Link>
    ))
    return (
      <div className='host-vans-list'>
        <section>
          {hostVanElements}
        </section>
      </div>  
    )
  }

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <Suspense fallback={<h2>Loading host vans...</h2>}>
        <Await resolve={dataPromise.hostVansData}>
          {renderHostVanElements}
        </Await>
      </Suspense>
    </section>
  )
}
