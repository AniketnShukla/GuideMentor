import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

    const { userCred } = useSelector((state) => state.auth)

    return userCred ? <Outlet /> : <Navigate to="/login" replace />
};

export default PrivateRoute