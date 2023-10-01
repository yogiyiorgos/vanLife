import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Vans = () => {
  const [vansData, setVansData] = useState([])

  useEffect(() => {
    fetch('/api/vans')
      .then(res => res.json())
      .then(data => setVansData(data.vans))
  },[])

  const vanElements = vansData.map((van) => (
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