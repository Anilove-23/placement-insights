import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Skillgap from './components/Skill-gap.jsx'
import Prediction from './components/Prediction.jsx'
import Profile from './components/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/predictions" element={<Prediction />} />
      <Route path="/skill-gap" element={<Skillgap />} />
      <Route path="/profile" element={<Profile />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
