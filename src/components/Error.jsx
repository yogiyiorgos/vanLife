import { useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError()

  return (
    <>
      <h2>Error: {error.message}</h2>
      <p>{error.status} {error.statusText}</p>
    </>
  )
}

export default Error