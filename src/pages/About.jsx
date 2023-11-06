import { Link } from 'react-router-dom'
import hrImg from '../assets/images/about-hero.png'

export default function About() {
  return (
    <div>
      <div className='about-page-container'>
        <img src={hrImg} className='about-hero-image'/>
        <div className='about-page-content'>
          <h1>Don't squeeze in a sedan when you can relax in a van.</h1>
          <p>Our mission is to enliven your road trip with the perfect travel van rental.
          Our vans are recertified before each trip to ensure your travel plans can go
          off without a hitch </p>
          <p>Our team is full of vanlife enthousiasts who know firsthand the magic of
          touring the world on 4 wheels.</p>
        </div>
        <div className='about-page-cta'>
          <h2>Your destination is waiting.<br /> Your van is ready </h2>
          <Link to='vans' className='link-button'> Explore our vans</Link>
        </div>
      </div>
    </div>
  )
}