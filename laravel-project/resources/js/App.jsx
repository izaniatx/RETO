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

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: title => (title ? `${title} - ${appName}` : appName),
  resolve: name =>
    resolvePageComponent(
      [`./pages/${name}.tsx`, `./pages/${name}.jsx`],
      import.meta.glob('./pages/**/*.{tsx,jsx}')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  },
  progress: { color: '#4B5563' },
});
