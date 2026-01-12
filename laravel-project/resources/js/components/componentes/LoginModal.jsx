import React from "react";
import "../../../css/LoginModal.css";
import { Inertia } from '@inertiajs/inertia'; // ✅ así funciona



const LoginModal = () => {
  const handleRegisterClick = (e) => {
  e.preventDefault();

  // Cerrar modal de Bootstrap
  const modalEl = document.getElementById("loginModal");
  if (modalEl) {
    const bs = window.bootstrap;
    const instance = bs?.Modal.getInstance(modalEl) || (bs?.Modal ? new bs.Modal(modalEl) : null);
    if (instance && typeof instance.hide === "function") {
      instance.hide();
    }
  }

  // Redirigir usando Inertia
 window.location.href = '/registro';
};


  const handleRecoveryClick = (e) => {
  e.preventDefault();

  const modalEl = document.getElementById("loginModal");
  if (modalEl) {
    const bs = window.bootstrap;
    const instance = bs?.Modal.getInstance(modalEl) || (bs?.Modal ? new bs.Modal(modalEl) : null);
    if (instance && typeof instance.hide === "function") {
      instance.hide();
    }
  }
  window.location.href = '/recoveryPassword';
  
};


  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="card shadow-lg w-100 m-0">
            <div className="card-body">
              <div className="text-center">
                <h1 className="card-title h3">Iniciar Sesión</h1>
                <p className="card-text text-muted">
                  Inicia sesión para acceder a tu cuenta
                </p>
              </div>

              <div className="mt-4">
                <form>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label text-muted">
                      Usuario
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Usuario"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-muted">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Contraseña"
                      required
                    />
                  </div>
                  <p className="text-center text-muted mt-4">
                    ¿Has olvidado tu contraseña?{" "}
                    
                    <a href="/RETO/#/recoveryPassword" className="text-decoration-none" onClick={handleRecoveryClick}>
                      Recuperala
                    </a>.
                  </p>

                  <div className="d-grid">
                    <button type="submit" id="boton-inicio-sesion" className="btn btn-dark btn-lg">
                      Iniciar Sesion 
                    </button>
                  </div>
                  <p className="text-center text-muted mt-4">
                    ¿No tienes una cuenta?{" "}
                    
                    <a href="/RETO/#/registro" className="text-decoration-none" onClick={handleRegisterClick}>
                      Registrarse
                    </a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
