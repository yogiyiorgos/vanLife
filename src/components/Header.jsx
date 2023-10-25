import { Link, NavLink } from 'react-router-dom'
import loginIcn from '../assets/images/avatar-icon.png'

const Navbar = () => {

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616'
  }

  return (
    <header>
      <Link to='/' className='site-logo'><h2>#VANLIFE</h2></Link>
      <nav>
        <NavLink 
          to='/host'
          style={({isActive}) => isActive ? activeStyles : null}>
            Host
        </NavLink>
        <NavLink 
          to='/about'
          style={({isActive}) => isActive ? activeStyles : null}>
            About
        </NavLink>
        <NavLink 
          to='/vans'
          style={({isActive}) => isActive ? activeStyles : null}>
            Vans
        </NavLink>
        <Link to='/login' className='login-link'>
          <img
            src={loginIcn}
            className='login-icon'
          />
        </Link>
      </nav>
    </header>
  )
}

export default Navbar