import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({children}) {
    const location = useLocation()
    console.log(location)
    const {user,loading} = useContext(AuthContext)
    if(loading){
        return<span className="loading loading-spinner text-warning"></span>

    }
    if(user){
        return children
    }
  return <Navigate to={`/join`} state={{from : location}} replace></Navigate>
}

export default PrivateRoute