import './App.css'
import { 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Vans, { vansLoader } from './pages/Vans/Vans'
import Van, { vanLoader } from './pages/Vans/Van'
import Layout from './components/Layout'
import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import HostVans, { hostVansLoader } from './pages/Host/HostVans'
import HostVanDetails, { hostVanDetailsLoader } from './pages/Host/HostVanDetails'
import Reviews from './pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import NotFound from './pages/NotFound'
import Error from './components/Error'
import Login, { loginAction, loginLoader } from './pages/Login'
import { requireAuth } from '../utils'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='about' element={<About />} />
    <Route 
      path='login' 
      element={<Login />} 
      loader={loginLoader}
      action={loginAction}
    />
    <Route 
      path='vans' 
      element={<Vans />} 
      errorElement={<Error />}
      loader={vansLoader} 
    />
    <Route 
      path='vans/:id' 
      element={<Van />} 
      loader={vanLoader}
    />

    <Route path='host' element={<HostLayout/>}>
      <Route 
        index 
        element={<Dashboard />} 
        loader={async ({ request }) => await requireAuth(request)}
      />
      <Route 
        path='income' 
        element={<Income />} 
        loader={async ({ request }) => await requireAuth(request)}
      />
      <Route 
        path='reviews' 
        element={<Reviews />} 
        loader={async ({ request }) => await requireAuth(request)}
      />
      <Route 
        path='vans' 
        element={<HostVans />} 
        loader={hostVansLoader}
      />
      <Route 
        path='vans/:id' 
        element={<HostVanDetails />}
        loader={hostVanDetailsLoader}
      >
        <Route 
          index 
          element={<HostVanInfo />} 
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route 
          path='pricing' 
          element={<HostVanPricing />} 
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route 
          path='photos' 
          element={<HostVanPhotos />} 
          loader={async ({ request }) => await requireAuth(request)}
        />
      </Route>
    </Route>
    <Route path='*' element={<NotFound />} />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}