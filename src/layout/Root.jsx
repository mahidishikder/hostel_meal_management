import React from 'react'
import { Outlet } from 'react-router-dom'
import Navber from '../components/navber'
import Footer from '../components/Footer'

function Root() {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Root