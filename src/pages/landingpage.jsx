import MainLayout from "../layouts/MainLayout";
import Aro from "../assets/Aro.png";
import "./css/landingpage.css";
import LoginModal from "../components/LoginModal";
import Marquee from "react-fast-marquee";
import bmw from "../assets/logos/bmw.png";
import hyundai from "../assets/logos/hyundai.gif";
import mercedes from "../assets/logos/mercedes.png";
import audi from "../assets/logos/audi.png";
import volkswagen from "../assets/logos/volkswagen.png";
import ford from "../assets/logos/ford.png";
import mazda from "../assets/logos/mazda.png";
import nissan from "../assets/logos/nissan.png";
import honda from "../assets/logos/honda.png";
import seat from "../assets/logos/seat.png";

function landingpage() {
  return ( 
    <div className="landing-bg"> 
      <MainLayout>   
          <div className="container col-xxl-12 px-4 py-5" style={{ color: "white"}}>
            <div style={{ marginBottom: "300px", marginTop: "200px" }}>
              <div>
                <h1 className="display-5 fw-bold lh-1 mb-3 text-center">Bienvenid@ a Aro Automoción</h1>
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
            </div>
            
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5" id="about-us" >
              <div className="col-10 col-sm-6 col-lg-6">
                <img src={Aro} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="500" height="300" loading="lazy" style={{ borderRadius: "10px" }}/>
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
            
            <Marquee gradient={false} speed={100} pauseOnHover={true} style={{ marginTop: "100px", marginBottom: "50px", fontSize: "24px", fontWeight: "bold" }}>
              ¡Encuentra tu coche ideal con Aro Automoción! &nbsp; • &nbsp; Amplia selección de vehículos &nbsp; • &nbsp; Financiación a medida &nbsp; • &nbsp; Servicio postventa excepcional &nbsp; • &nbsp; ¡Visítanos hoy mismo! &nbsp; • &nbsp;
            </Marquee> 
          </div>

          <div id="cuerpo">
            <Marquee gradient={true} gradientColor= "rgba(0, 0, 0, 0.85)" speed={100} pauseOnHover={true} style={{ marginTop: "100px", marginBottom: "50px", fontSize: "24px", fontWeight: "bold" }}>
              &nbsp; <a href=""><img src={bmw} alt="bmw" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={mercedes} alt="mercedes" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={audi} alt="audi" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={volkswagen} alt="volkswagen" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={hyundai} alt="hyundai" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={mazda} alt="mazda" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={ford} alt="ford" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={nissan} alt="nissan" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={seat} alt="seat" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
              &nbsp; <a href="#"><img src={honda} alt="honda" style={{ height: 200, verticalAlign: "middle" }} /></a> &nbsp; 
            </Marquee> 
          </div>
      </MainLayout>
    </div> 
  );
}

export default landingpage;