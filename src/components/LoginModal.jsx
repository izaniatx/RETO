import React from "react";
import "./css/LoginModal.css";

const LoginModal = () => {
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

                  <div className="d-grid">
                    <button type="submit" id="boton-inicio-sesion" className="btn btn-dark btn-lg">
                      Iniciar Sesion 
                    </button>
                  </div>
                  <p className="text-center text-muted mt-4">
                    ¿No tienes una cuenta?{" "}
                    <a href="#!" className="text-decoration-none">
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
