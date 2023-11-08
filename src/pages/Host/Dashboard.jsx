import { Suspense } from 'react'
import { 
  Link, 
  useLoaderData,
  defer,
  Await
 } from 'react-router-dom'
import { getHostVans } from '../../../api'
import { requireAuth } from '../../../utils'
import { BsStarFill } from 'react-icons/bs'

export async function hostVansLoader({ request }) {
  await requireAuth(request)
  return defer({ hostVansData: getHostVans() })
}

export default function Dashboard() {
  const dataPromise = useLoaderData()

  function renderHostVans(hostVansData) {
    const hostVanElements = hostVansData.map((hostVan) => (
      <Link 
        to={`vans/${hostVan.id}`} 
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
    <>
      <section className='host-dashboard-earnings'>
        <div className='info'>
          <h1>Welcome!</h1>
          <p>Income last <span>30 days</span></p>
          <h2>€2,260</h2>
        </div>
        <Link to='income'>Details</Link>
      </section>
      <section className='host-dashboard-reviews'>
        <h2>Review score</h2>
        <BsStarFill className='star' />
        <p>
          <span>5.0</span>/5
        </p>
        <Link to='reviews'>Details</Link>
      </section>
      <section className='host-dashboard-vans'>
        <div className='top'>
          <h1 className='host-vans-title'>Your listed vans</h1>
          <Link to='vans'>View all</Link>
        </div>
        <Suspense fallback={<h2>Loading host vans...</h2>}>
          <Await resolve={dataPromise.hostVansData}>
            {renderHostVans}
          </Await>
        </Suspense>
      </section>
    </>
  )
}
