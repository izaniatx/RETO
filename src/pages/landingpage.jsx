import MainLayout from "../layouts/MainLayout";
import Aro from "../assets/Aro.png";
import "./css/landingpage.css";
import LoginModal from "../components/LoginModal";

function landingpage() {
  return (
    <div>
      <MainLayout>      
          <div className="container col-xxl-12 px-4 py-5">
            <div>
              <h1 className="display-5 fw-bold lh-1 mb-3 text-center">Bienvenid@ a Aro Automocion</h1>
              <p className="lead text-center">¡Descubre las mejores ofertas en coches!</p>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button type="button" id="btn-1" className="btn btn-primary btn-lg px-4 me-md-2"
                    data-bs-toggle="modal" data-bs-target="#loginModal"
                  >Iniciar sesión</button>
                  <LoginModal />
                  <button type="button" id="btn-2" className="btn btn-outline-secondary btn-lg px-4"
                    onClick={() => window.location.href = '/#/inicio'}
                  >Más información</button>
            </div>
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div className="col-10 col-sm-6 col-lg-6">
                <img src={Aro} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
              </div>
              <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">Sobre Nosotros</h1>
                <p className="lead" style={{ textAlign: 'justify' }}>Aro Automoción es una red internacional de concesionarios dedicada a ofrecer 
                  soluciones integrales de movilidad con los más altos estándares de calidad, 
                  confianza y servicio. Con presencia en varios países, nuestra empresa se ha 
                  consolidado como un referente en el sector automotriz gracias a un modelo de 
                  atención centrado en las personas y a una amplia gama de vehículos que se adapta 
                  a las necesidades de cada cliente.
                </p>  
              </div>
            </div>
          </div>
      </MainLayout>
    </div> 
  );
}

export default landingpage;