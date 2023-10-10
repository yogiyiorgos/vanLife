import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [vansData, setVansData] = useState([])

  const typeFilter = searchParams.get('type')

  useEffect(() => {
    fetch('/api/vans')
      .then(res => res.json())
      .then(data => setVansData(data.vans))
  },[])

  const displayedVans = typeFilter
    ? vansData.filter(van => van.type === typeFilter)
    : vansData

  const vanElements = displayedVans.map((van) => (
    <Link to={`/vans/${van.id}`} key={van.id} className='van-tile'>
      <img src={van.imageUrl} />
      <div className='van-info'>
        <h3>{van.name}</h3>
        <p>${van.price}<span>/day</span></p>
      </div>
      <i className={`van-type ${van.type} selected`}>{van.type}</i>
    </Link>
  ))


  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list'>
        {vanElements}
      </div>
    </div>
  )
}

export default Vans