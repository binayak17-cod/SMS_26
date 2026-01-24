import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

// Define all your routes here
export const routeConfig = [
  {
    path: '/',
    element: <Login />,
    name: 'Login'
  },
  {
    path: '/login',
    element: <Login />,
    name: 'Login Page'
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    name: 'Dashboard'
  }
]

// Create router with route configuration
export const router = createBrowserRouter(routeConfig)
