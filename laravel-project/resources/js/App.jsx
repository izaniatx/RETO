/*import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landingpage from './pages/landingpage.jsx'
import Inicio from './pages/inicio.jsx'
import Registro from './pages/registro.jsx'
import Catalogo from './pages/catalogo.jsx'
import VendeTuCoche from './pages/vende-tu-coche.jsx'
import DondeEncontrarnos from './pages/dondeEncontrarnos.jsx'
import Contacto from './pages/contacto.jsx'
import RecoveryPassword from './pages/recoveryPassword.jsx'

function App() {

  return (
    <Routes>  
        <Route path='/' element={<Landingpage />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/catalogo' element={<Catalogo />} />
        <Route path='/vende-tu-coche' element={<VendeTuCoche />} />
        <Route path='/DondeEncontrarnos' element={<DondeEncontrarnos />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/recoveryPassword' element={<RecoveryPassword />} />
    </Routes>
  )
} 

export default App
*/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createInertiaApp({
  resolve: name => import(`./pages/${name}`).then(module => module.default),
  setup({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    );
  },
});
