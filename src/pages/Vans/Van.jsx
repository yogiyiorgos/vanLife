import { Suspense } from 'react'
import { 
  Link, 
  useLoaderData, 
  useLocation,
  defer,
  Await 
} from "react-router-dom"
import { getVan } from '../../../api'

export function vanLoader({ params }) {
  return defer({van: getVan(params.id)})
}

export default function Van() {
  const location = useLocation()
  const dataPromise = useLoaderData()

  const search = location.state?.search || ''
  const type = location.state?.type || 'all'

  function renderVan(van) {
    return (
      <div className='van-detail'>
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className='van-price'><span>${van.price}</span>/day</p>
        <p>{van.description}</p>
        <button className='link-button'>Rent this van</button>
      </div>
    )
  }

  return (
    <div className='van-detail-container'>
      <Link 
        to={`..${search}`}
        relative='path'
        className='back-button'
      >
        &larr; <span>Back to {type} vans</span>
      </Link>
      <Suspense fallback={<h2>Loading van...</h2>}>
        <Await resolve={dataPromise.van}>
          {renderVan}
        </Await>
      </Suspense>
    </div>
  )
}
