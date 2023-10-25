import './App.css'
import { 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Vans, { vansLoader } from './pages/Vans'
import Van from './components/Van'
import Layout from './components/Layout'
import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import HostVans from './pages/Host/HostVans'
import HostVanDetails from './pages/Host/HostVanDetails'
import Reviews from './pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import NotFound from './pages/NotFound'
import Error from './components/Error'
import Login from './pages/Login'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='about' element={<About />} />
    <Route 
      path='vans' 
      element={<Vans />} 
      errorElement={<Error />}
      loader={vansLoader} 
    />
    <Route path='vans/:id' element={<Van />} />
    <Route path='login' element={<Login />} />

    <Route path='host' element={<HostLayout/>} >
      <Route index element={<Dashboard />} />
      <Route path='income' element={<Income />} />
      <Route path='vans' element={<HostVans />} />
      <Route path='vans/:id' element={<HostVanDetails />}>
        <Route index element={<HostVanInfo />} />
        <Route path='pricing' element={<HostVanPricing />} />
        <Route path='photos' element={<HostVanPhotos />} />
      </Route>
      <Route path='reviews' element={<Reviews />} />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App