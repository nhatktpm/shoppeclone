import React, { useContext } from 'react'
import ProductList from './pages/ProductList'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Registerlayout from './layouts/Registerlayout'
import MainLayout from './layouts/Mainlayout/MainLayout'
import Profile from './pages/Profile/Profile'
import { AppContext } from './contexts/app.context'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  console.log("ProtectedRoute");
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  console.log("RejectedRoute");
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  let element = useRoutes([
    {
      path: '',
      element: <RejectedRoute />
      , children: [
        {
          path: '/login',
          element: (
            <Registerlayout>
              <Login />
            </Registerlayout>
          )
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    }, {
      path: '',
      element: <ProtectedRoute />
      ,
      children: [{
        path: 'profile',
        element: (
          <MainLayout>
            <Profile />
          </MainLayout>
        )
      }]
    },
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          index: true,
          element: (
            <ProductList />
          )
        }
      ]
    }
  ])

  return element
}
