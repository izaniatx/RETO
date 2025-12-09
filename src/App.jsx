import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './layouts/MainLayout.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landingpage from './pages/landingpage.jsx'
import Inicio from './pages/inicio.jsx'
import Registro from './pages/registro.jsx'
import { HashRouter } from 'react-router-dom';

function App() {

  return (
    <Routes>  
        <Route path='/' element={<Landingpage />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/registro' element={<Registro />} />
    </Routes>
  )
} 

export default App
