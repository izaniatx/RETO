import CustomButton from "./CustomButton";
import "../../../css/Header.css";
import { Link } from '@inertiajs/react';
import LoginModal from "./LoginModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Header() {
  return (
    <nav id="header-container" className="custom-header navbar navbar-expand-lg shadow-sm p-3">
      <div className="container">

        {/* LOGO */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ height: "60px" }}
            className="me-3"
          />
        </a>

        {/* BOTÓN MÓVIL */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ENLACES */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/inicio">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vende-tu-coche">Vende Tu Coche</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donde-encontrarnos">Dónde Encontrarnos</Link>
            </li>
          </ul>
        </div>

        {/* BOTÓN INICIAR SESIÓN */}
        <CustomButton 
          className="btn btn-primary ms-3 btn-login"
          data-bs-toggle="modal" 
          data-bs-target="#loginModal"
        >
          Iniciar Sesión
        </CustomButton>

        {/* MODAL */}
        <LoginModal />
      </div>
    </nav>
  );
}
