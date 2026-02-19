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
            <h1 className="display-5 fw-bold lh-1 mb-3 text-center" >Tu próximo viaje comienza aquí</h1>
            <p className="text-center">Selección exclusiva de vehículos certificados con garantía total.</p>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button type="button" id="btn-1" className="btn btn-primary btn-lg px-4 me-md-2" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar sesión</button>
           
            <Link href="/catalogo" className="btn btn-outline-secondary btn-lg px-4" style={{color: 'white', borderColor: 'white'}}>Explorar Catálogo</Link>
          </div>
        </div>

        <div id="landingPage" style={{ minHeight: "100vh" }}>

          <div className="contacto">
            <div className="row flex g-5 py-5 rounded justify-content-around align-items-center" style={{ maxWidth: "100%", color: "white" }}>
              <div className="col-12 col-md-8 col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">LÍDERES EN AUTOMOCIÓN</h1>
                <p className="lead">   
                  Aro Automoción es una red internacional dedicada a redefinir la experiencia de compra de vehículos. 
                  Nos especializamos en ofrecer soluciones integrales de movilidad bajo estrictos estándares de calidad. 
                  Nuestra misión es conectar a cada conductor con el coche de sus sueños a través de una transparencia total 
                  y un servicio personalizado que nos ha convertido en referentes del sector europeo.
                </p>
              </div>
            </div>

            <h1 style={{marginLeft: "24%"}}>DESTAQUES DEL MES</h1>

            <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center gap-4"
              style={{ minHeight: "50vh" }}>

              <div className="card shadow p-3 mb-4 rounded cartasOfertas"
                style={{ width: "100%", maxWidth: "27rem", height: "22rem" }}>
                <div className="card-body">
                  <img src="/images/coches/coche.png" className="rounded w-100 mb-2" style={{ height: "60%", objectFit: "cover" }} />
                  <h5 className="card-title">Gama SUV Premium</h5>
                  <p className="card-text">Versatilidad y elegancia para la ciudad y carretera. Equipamiento tecnológico de última generación.</p>
                </div>
              </div>

              <div className="card shadow p-3 mb-4 rounded cartasOfertas"
                style={{ width: "100%", maxWidth: "27rem", height: "22rem" }}>
                <div className="card-body">
                  <img src="/images/coches/coche2.png" className="rounded w-100 mb-2" style={{ height: "60%", objectFit: "cover" }} />
                  <h5 className="card-title">Movilidad Eléctrica</h5>
                  <p className="card-text">Súmate al cambio con nuestra selección híbrida y eléctrica. Eficiencia sin comprometer la potencia.</p>
                </div>
              </div>

              <div className="card shadow p-3 mb-4 rounded cartasOfertas"
                style={{ width: "100%", maxWidth: "27rem", height: "22rem" }}>
                <div className="card-body">
                  <img src="/images/coches/coche3.png" className="rounded w-100 mb-2" style={{ height: "60%", objectFit: "cover" }} />
                  <h5 className="card-title">Garantía Certificada</h5>
                  <p className="card-text">Todos nuestros coches pasan una revisión de 150 puntos clave para asegurar tu tranquilidad.</p>
                </div>
              </div>
            </div>
          </div>

       
          <div>
            <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center m-4 gap-4 py-5">
              <div className="card shadow p-4"
                style={{ width: "100%", maxWidth: "35rem", backgroundColor: "#292929ff", color: "white" }}>
                <h2 className="mb-3">SOLICITA INFORMACIÓN</h2>
                <p className="small mb-4 text-secondary">Déjanos tus datos y un asesor comercial se pondrá en contacto contigo en menos de 24 horas.</p>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input type="text" className="form-control" placeholder="Ej: Juan Pérez" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" placeholder="nombre@ejemplo.com" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">¿En qué vehículo estás interesado?</label>
                    <textarea className="form-control" 
                      placeholder="Cuéntanos qué buscas o cuáles son tus dudas..." required />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 boton">Enviar Solicitud</button>
                </form>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <img src="/images/Aro.png"
                  alt="Aro"
                  className="rounded w-100"
                  style={{ maxWidth: "500px", height: "500px", objectFit: "contain" }} />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default landingpage;