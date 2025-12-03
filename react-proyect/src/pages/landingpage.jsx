import MainLayout from "../layouts/MainLayout";
import Aro from "../assets/Aro.png";
import "./landingpage.css";

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
                  <button type="button" id="btn-1" className="btn btn-primary btn-lg px-4 me-md-2">Iniciar sesión</button>
                  <button type="button" id="btn-2" className="btn btn-outline-secondary btn-lg px-4">Más información</button>
            </div>
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div className="col-10 col-sm-6 col-lg-6">
                <img src={Aro} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
              </div>
              <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">Responsive left-aligned hero with image</h1>
                <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the worlds most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                
              </div>
            </div>
          </div>
      </MainLayout>
    </div> 
  );
}

export default landingpage;