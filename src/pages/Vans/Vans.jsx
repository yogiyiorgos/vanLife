import { useState, Suspense } from 'react'
import { 
  Link, 
  useSearchParams,
  useLoaderData,
  defer,
  Await
} from 'react-router-dom'
import { getVans } from '../../../api'

export function vansLoader() {
  return defer({vansData: getVans()})
}

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState(null)
  const dataPromise = useLoaderData()

  const typeFilter = searchParams.get('type')


  if (error) {
    return <h2>There was an error: {error.message}</h2>
  }

  function renderVanElements(vansData) {
      const displayedVans = typeFilter
        ? vansData.filter(van => van.type === typeFilter)
        : vansData

      const vanElements = displayedVans.map((van) => (
        <Link 
          to={`${van.id}`} 
          key={van.id} 
          className='van-tile' 
          state={{ 
            search: `?${searchParams.toString()}`,
            type: typeFilter
          }}
        >
          <img src={van.imageUrl} />
          <div className='van-info'>
            <h3>{van.name}</h3>
            <p>${van.price}<span>/day</span></p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      ))
      return (
        <>
            <div className='van-list-filter-buttons'>
            <button 
              onClick={() => setSearchParams({type: 'simple'})} 
              className={`van-type simple ${typeFilter === 'simple' ? '' : null}`} 
            >
              Simple
            </button>
            <button 
              onClick={() => setSearchParams({type: 'luxury'})} 
              className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : null}`}
            >
              Luxury
            </button>
            <button 
              onClick={() => setSearchParams({type: 'rugged'})} 
              className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : null}`}
            >
              Rugged
            </button>

            { typeFilter ? (
                <button 
                  onClick={() => setSearchParams({type: ''})} 
                  className='van-type clear-filters'
                >
                  Clear filter
                </button>
            ) : null}
          </div>
          <div className='van-list'>
            {vanElements}
          </div>
      </>
    )
  }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vansData}>
          {renderVanElements}
        </Await>
      </Suspense>
    </div>
  )
}

export default Vans
