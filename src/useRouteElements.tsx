import React from 'react'
import ProductList from './pages/ProductList'
import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Registerlayout from './layouts/Registerlayout'

export default function useRouteElements() {
  let element = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
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
  ])

  return element
}
