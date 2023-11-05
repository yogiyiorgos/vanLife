import {useState } from "react"
import { 
  useLoaderData, 
  useNavigate, 
  Form, 
  redirect,
  useActionData 
} from "react-router-dom"
import { loginUser } from "../../api"

export function loginLoader({ request }) {
   return  new URL(request.url).searchParams.get('message')
}

export async function loginAction({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const data = await loginUser({ email, password })
    localStorage.setItem('loggedin', true) 
    return redirect('/host')
  } catch (err) {
    return err.message
  }
}

const Login = () => {
  const [status, setStatus] = useState('idle')
  const errorMessage = useActionData()
  const message = useLoaderData()
  const navigate = useNavigate()

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setStatus('submitting');
  //   loginUser(loginFormData)
  //     .finally(() => setStatus('idle'))
  //     .then(data => {
  //       navigate('/host', { replace: true })
  //     })
  // }

  return (
    <div className='login-container'>
      <h1>Sign in to your account</h1>
      {message && <h3 className='red'>{message}</h3>}
      {errorMessage && <h3 className='red'>{errorMessage}</h3>}
      <Form 
        method='post' 
        className='login-form'
        replace
      >
        <input
          name='email'
          type='email'
          placeholder='Email address'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
        />
        <button type='submit' disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </Form>
    </div>
  )
}

export default Login
