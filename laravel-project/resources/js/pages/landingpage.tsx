import MainLayout from "../layouts/MainLayout";
import "../../css/landingpage.css";
import "../App.css";
import {Link} from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function landingpage() {
  return (
    <div className="landing">
      <MainLayout>
        <div className="container col-xxl-12 px-4 py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>

          <div style={{ color: "white" }}>
            <h1 className="display-5 fw-bold lh-1 mb-3 text-center" >Bienvenid@ a Aro Automocion</h1>
            <p className="text-center">¡Descubre las mejores ofertas en coches!</p>

          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button type="button" id="btn-1" className="btn btn-primary btn-lg px-4 me-md-2" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar sesión</button>
            <button type="button" id="btn-2" className="btn btn-outline-secondary btn-lg px-4" onClick={() => window.location.href ="/RETO/#/inicio"}>Más información</button>
          </div>


        </div>
        <div id="landingPage" style={{ minHeight: "100vh" }}>


          <div className="contacto">
            <div className="row flex g-5 py-5 rounded  justify-content-around align-items-center" style={{ maxWidth: "100%", color: "white" }}>
              <div className="col-12 col-md-8 col-lg-6">

                <h1 className="display-5 fw-bold lh-1 mb-3">SOBRE NOSOTROS</h1>
                <p className="lead">   Aro Automoción es una red internacional de concesionarios dedicada a
                  ofrecer soluciones integrales de movilidad con los más altos estándares de calidad, confianza
                  y servicio. Con presencia en varios países, nuestra empresa se ha consolidado como un referente
                  en el sector automotriz gracias a un modelo de atención centrado en las personas
                  y a una amplia gama de vehículos que se adapta a las necesidades de cada cliente.</p>
              </div>
            </div>

            <h1>OFERTAS</h1>

            <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center gap-4"
              style={{ minHeight: "50vh" }}>

              <div className="card shadow p-3 mb-4 rounded cartasOfertas"
                style={{ width: "100%", maxWidth: "27rem", height: "22rem" }}>
                <div className="card-body">
                  <img src="/images/coches/coche.png" className="rounded w-100 mb-2" style={{ height: "60%", objectFit: "cover" }} />
                  <h5 className="card-title">TITULO</h5>
                  <p className="card-text">Parrafo prueba</p>
                </div>
              </div>

              <div className="card shadow p-3 mb-4 rounded cartasOfertas"
                style={{ width: "100%", maxWidth: "27rem", height: "22rem" }}>
                <div className="card-body">
                  <img src="/images/coches/coche2.png" className="rounded w-100 mb-2" style={{ height: "60%", objectFit: "cover" }} />
                  <h5 className="card-title">TITULO</h5>
                  <p className="card-text">Parrafo prueba</p>
                </div>
              </div>

              <div className="card shadow p-3 mb-4 rounded cartasOfertas"
                style={{ width: "100%", maxWidth: "27rem", height: "22rem" }}>
                <div className="card-body">
                  <img src="/images/coches/coche3.png" className="rounded w-100 mb-2" style={{ height: "60%", objectFit: "cover" }} />
                  <h5 className="card-title">TITULO</h5>
                  <p className="card-text">Parrafo prueba</p>
                </div>
              </div>

            </div>
          </div>



          <div>
            <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center m-4 gap-4 py-5">

              {/* Card del formulario */}
              <div className="card shadow p-4"
                style={{ width: "100%", maxWidth: "35rem", backgroundColor: "#292929ff", color: "white" }}>
                <h2 className="mb-3">CONTACTO</h2>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" placeholder="Tu nombre" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="tuemail@ejemplo.com" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea className="form-control" 
                      placeholder="Escribe tu mensaje aquí..." required />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 boton">Enviar</button>
                </form>
              </div>

              {/* Imagen */}
              <div className="d-flex justify-content-center align-items-center">
                <img src="/images/Aro.png"
                  alt="Aro"
                  className="rounded w-100"
                  style={{ maxWidth: "500px", height: "500px" }} />
              </div>

            </div>


          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default landingpage;