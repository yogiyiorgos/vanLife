import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <Link to='/'><h2>#VANLIFE</h2></Link>
      <nav>
        <Link to='/about'>About</Link>
        <Link to='/vans'>Vans</Link>
      </nav>
    </header>
  )
}

export default Navbar