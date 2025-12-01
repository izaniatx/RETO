// import logo from '../assets/logo.png' --- IGNORE ---


function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        {/* LOGO */}
        <a className="navbar-brand d-flex align-items-center" href="/">
            <img 
              src={logo} 
              alt="Logo" 
              style={{ height: "50px" }} 
              className="me-2"
            />
        </a>

        {/* BOTÓN MÓVIL */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ENLACES */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/servicios">Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contacto">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;