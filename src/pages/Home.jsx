import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div className='home-container'>
        <h1>Homepage</h1>
        <p>Add adventure to your life by joining the #vanlife movement. Rent
        the perfect van to make your pefect road trip. </p>
        <Link to='vans'>Find your van</Link>
      </div>
    </div>
  )
}

export default Home