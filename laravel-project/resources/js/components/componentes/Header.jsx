import { Link, usePage } from '@inertiajs/react'; 
import CustomButton from "./CustomButton";
import "../../../css/Header.css";
import LoginModal from "./LoginModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { use } from 'react';

export default function Header() {
  
  const { props, url } = usePage();

 
  const auth = props.auth;

  return (
    <nav id="header-container" className="custom-header navbar navbar-expand-lg shadow-sm p-3" style={{ backgroundColor: url === "/admin/dashboard" ? "#212529" : "transparent" }} >
      <div className="container" >

        {/* LOGO */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/images/logo.png" alt="Logo" style={{ height: "60px" }} className="me-3" />
        </a>

        {/* BOTÓN MÓVIL */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ENLACES */}

        <ul className="navbar-nav ms-auto">
            <li className="nav-item "><Link className="nav-link btn-pers" href="/inicio">Inicio</Link></li>
            <li className="nav-item "><Link className="nav-link btn-pers" href="/catalogo">Catálogo</Link></li>
            <li className="nav-item "><Link className="nav-link btn-pers" href="/vendeTuCoche">Vende Tu Coche</Link></li>
            <li className="nav-item "><Link className="nav-link btn-pers" href="/contacto">Contacto</Link></li>
            <li className="nav-item "><Link className="nav-link btn-pers" href="/donde-encontrarnos">Dónde Encontrarnos</Link></li>
        </ul>
        
        
        {/* LÓGICA DE SESIÓN */}
        {auth && auth.user ? (
          <Link 
            href="/logout" 
            method="post" 
            as="button" 
            className="btn btn-outline-danger ms-3"
          >
            Cerrar Sesión ({auth.user.usuario})
          </Link>
        ) : (
          <>
            <CustomButton 
              className="btn btn-primary btn-pers ms-3 btn-login"
              data-bs-toggle="modal" 
              data-bs-target="#loginModal"
            >
              Iniciar Sesión
            </CustomButton>
            <LoginModal />
          </>
        )}
      </div>
    </nav>
  );
}