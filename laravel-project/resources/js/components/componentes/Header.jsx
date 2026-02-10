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
    <nav id="header-container" className="custom-header navbar navbar-expand-lg shadow-sm p-3" >
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
          {/* SOLO para usuarios NO logueados */}
          {(!auth?.user || auth?.user?.is_client) && (
              <>
                  <li className="nav-item">
                      <Link className="nav-link btn-pers" href="/inicio">Inicio</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link btn-pers" href="/catalogo">Catálogo</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link btn-pers" href="/contacto">Contacto</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link btn-pers" href="/dondeEncontrarnos">Dónde Encontrarnos</Link>
                  </li>
              </>
          )}
          
          {/* OPCIONES PARA CLIENTE: Usamos un Fragment <></> para envolver los <li> */}
          {auth?.user?.is_client && (
              <>
                  <li className="nav-item">
                      <Link className="nav-link btn-pers" href="/vendeTuCoche">Vende Tu Coche</Link>
                  </li>
                 
              </>
          )}
          {/*TRABAJADORES*/}

           {(
                auth?.user?.can_access_admin ||
                auth?.user?.gestor_ventas ||
                auth?.user?.gestor_compras
            ) && (
                <li className="nav-item">
                    <Link className="nav-link btn-pers" href="/inventario/coches">
                        Inventario de Coches
                    </Link>
                </li>
            )}

          {/*GESTOR VENTAS */}
            {auth?.user?.gestor_ventas && (
                <li className="nav-item">
                    <Link className="nav-link btn-pers" href="/gestion/ventas">
                        Gestor de ventas
                    </Link>
                </li>
            )}

          {/*GESTOR COMPRAS */}
          {auth?.user?.gestor_compras && (
                <li className="nav-item">
                    <Link className="nav-link btn-pers" href="/gestion/compras">
                        Gestor de ventas
                    </Link>
                </li>
            )}

          {/* OPCIÓN PARA ADMINISTRADOR */}
          {auth?.user?.can_access_admin && (
              <li className="nav-item">
                  <Link className="nav-link btn-pers" href="/admin/usuarios">
                      Panel Admin
                  </Link>
              </li>
          )}
      </ul>
        
        
        {/* LÓGICA DE SESIÓN */}
        {auth && auth.user ? (
          <div className="d-flex align-items-center gap-2">
            {/* ICONO DE PERFIL CON COLOR PERSONALIZADO */}
            <Link 
              href="/UserProfile" 
              className="profile-link-custom"
              title="Mi Perfil"
            >
              <div className="profile-circle-red">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
              </div>
              <span className="user-name-text d-none d-md-inline">{auth.user.usuario}</span>
            </Link>

           {/* <Link 
              href="/logout" 
              method="post" 
              as="button" 
              className="btn btn-sm btn-outline-secondary"
            >
              Salir
            </Link>*/}
          </div>
        ) : (
          <>
            <CustomButton 
              className="btn btn-primary btn-pers ms-3 btn-login"
              data-bs-toggle="modal" 
              data-bs-target="#loginModal"
            >
              Iniciar Sesión
            </CustomButton>
            <Link 
                href="/registro" 
                className="btn btn-primary btn-pers ms-3 btn-login d-inline-flex align-items-center justify-content-center"
              >
                Registrarse
              </Link>
            <LoginModal />
          </>
        )}
      </div>
    </nav>
  );
}