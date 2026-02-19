import React from "react";
import "../../../css/LoginModal.css";
import { useForm, router } from '@inertiajs/react';

const LoginModal = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    usuario: '',  
    password: '',
  });

  React.useEffect(() => {
    return () => {
      console.log("Limpiando modal al navegar...");
   
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      
      const backdrops = document.getElementsByClassName('modal-backdrop');
      while (backdrops.length > 0) {
        backdrops[0].remove();
      }
    };
  }, []);
  const cerrarModal = () => {
    const modalEl = document.getElementById("loginModal");
 
    const bootstrap = window.bootstrap;
    if (modalEl && bootstrap) {
      const instance = bootstrap.Modal.getInstance(modalEl);
      instance?.hide();
      
      
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
    }
  };

  const manejarNavegacion = (e, url) => {
    e.preventDefault();
    cerrarModal();
    router.visit(url); 
  };

  const submit = (e) => {
    e.preventDefault();
    
    post('/login', {

      onBefore: () => {
        
      },
      onSuccess: () => {
        cerrarModal();
      },
      onFinish: () => {
      },
      onError: () => reset('password'),
    });
  };

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="card shadow-lg w-100 m-0">
            <div className="card-body">
              <div className="text-center">
                <h1 className="card-title h3">Iniciar Sesión</h1>
              </div>

              <div className="mt-4">

                <form onSubmit={submit}>
                  <div className="mb-4">
                    <label className="form-label text-muted">Usuario</label>
                    <input
                      type="text"
                      className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                      value={data.usuario}
                      onChange={(e) => setData('usuario', e.target.value)}
                      required
                    />
                    {errors.usuario && <div className="invalid-feedback">{errors.usuario}</div>}
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted">Contraseña</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      required
                    />
                  </div>

                  <p className="text-center text-muted mt-4">
                    ¿Has olvidado tu contraseña?{" "}
                    <a href="/recoveryPassword" className="text-decoration-none" onClick={(e) => manejarNavegacion(e, '/recoveryPassword')} style={{color: "#bd3a3f"}}>
                      Recuperala
                    </a>
                  </p>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-dark btn-lg bt-lm" disabled={processing} style={{backgroundColor: "#bd3a3f", borderColor: "#bd3a3f"}}>
                      {processing ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                  </div>

                  <p className="text-center text-muted mt-4">
                    ¿No tienes una cuenta?{" "}
                    <a href="#" className="text-decoration-none" onClick={(e) => manejarNavegacion(e, '/registro')} style={{color: "#bd3a3f"}}>
                      Registrarse
                    </a>
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