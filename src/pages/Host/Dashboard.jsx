import { Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard page</h1> 
      <Outlet />
    </>
  ) 
}

export default Dashboard