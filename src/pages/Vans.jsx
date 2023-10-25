import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getVans } from '../../api'

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [vansData, setVansData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const typeFilter = searchParams.get('type')

  useEffect(() => {
    async function loadVans() {
      setLoading(true)
      try {
        const data = await getVans()
        setVansData(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadVans()
  },[])

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

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>There was an error {error.message}</h2>
  }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
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
        ) : null
        }
      </div>
      <div className='van-list'>
        {vanElements}
      </div>
    </div>
  )
}

export default Vans