import { Link, useLoaderData } from 'react-router-dom'
import { getHostVans } from '../../../api'
import { requireAuth } from '../../../utils'

export async function hostVansLoader() {
  await requireAuth()
  return getHostVans()
}

const HostVans = () => {
  const hostVansData = useLoaderData()

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
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <div className='host-vans-list'>
        <section>
          {hostVanElements}
        </section>
      </div>  
    </section>
  )
}

export default HostVans
