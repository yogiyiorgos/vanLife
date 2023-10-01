import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const HostVans = () => {
  const [hostVansData, setHostVansData] = useState([])

  useEffect(() => {
    fetch('/api/host/vans')
    .then(res => res.json())
    .then(data => setHostVansData(data.vans))
  }, [])

  const hostVanElements = hostVansData.map((hostVan) => (
    <Link 
      to={`/host/vans/${hostVan.id}`} 
      key={hostVan.id}
      className='host-van-link-wrapper'
    >
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
        {
          hostVansData.length > 0 ? (
            <section>
              {hostVanElements}
            </section>
          ) : (
                <h2>Loading...</h2>
              )
        }
      </div>  
    </section>
  )
}

export default HostVans