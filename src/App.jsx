import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './layouts/MainLayout.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landingpage from './pages/landingpage.jsx'
import Inicio from './pages/inicio.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/inicio' element={<Inicio />} />
      </Routes>
    </Router>
  )
} 

export default App
