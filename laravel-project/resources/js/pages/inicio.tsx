import MainLayout from "../layouts/MainLayout";
import { Link } from '@inertiajs/react';
import "../../css/inicio.css";

function Inicio() { 
    return (
        <MainLayout>
            <div className="inicio-wrapper">
                
                {/* 1. SECCIÓN: ACCESO RÁPIDO (Bento Grid) */}
                <section className="section-padding">
                    <h2 className="section-title">Explora nuestra colección</h2>
                    <div className="bento-grid">
                        <Link href="/catalogo" className="bento-item bento-main btn-hover-grow">
                            <div className="bento-content">
                                <h3>Ver Todo el Stock</h3>
                                <p>Más de 100 vehículos revisados</p>
                            </div>
                        </Link>
                        <Link href="/catalogo" className="bento-item bento-suv btn-hover-grow">
                            <div className="bento-content">
                                <h3>Gama SUV</h3>
                            </div>
                        </Link>
                        <Link href="/catalogo" className="bento-item bento-electric btn-hover-grow">
                            <div className="bento-content">
                                <h3>100% Eléctricos</h3>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* 2. SECCIÓN: CÓMO FUNCIONAMOS */}
                <section className="how-it-works">
                    <div className="how-container">
                        <div className="how-text">
                            <span className="accent-text">Aro Automoción</span>
                            <h2>Calidad certificada en cada kilómetro</h2>
                            <div className="steps">
                                <div className="step">
                                    <span className="step-num">01</span>
                                    <div>
                                        <h4>Selección Rigurosa</h4>
                                        <p>Solo aceptamos vehículos con historial de mantenimiento completo.</p>
                                    </div>
                                </div>
                                <div className="step">
                                    <span className="step-num">02</span>
                                    <div>
                                        <h4>Certificación de 150 Puntos</h4>
                                        <p>Revisamos desde la electrónica hasta el último detalle estético.</p>
                                    </div>
                                </div>
                                <div className="step">
                                    <span className="step-num">03</span>
                                    <div>
                                        <h4>Garantía de 2 Años</h4>
                                        <p>Para que tu única preocupación sea disfrutar del viaje.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="how-image">
                            <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000" alt="Coche de lujo" />
                        </div>
                    </div>
                </section>

                {/* SECCIÓN: MARCAS TOP */}
                <section className="section-padding brands-area">
                    <h3 className="brand-title">Especialistas en Marcas Premium</h3>
                    <div className="brands-grid">
                        
                        {/* Marca 1 */}
                        <div className="brand-card">
                            <img src={"./images/logos/bmw.png"} alt="BMW" />
                            <span>BMW</span>
                        </div>
                        
                        {/* Marca 2 */}
                        <div className="brand-card">
                            <img src={"./images/logos/audi.png"} alt="Audi" />
                            <span>AUDI</span>
                        </div>

                        {/* Marca 3 */}
                        <div className="brand-card">
                            <img src={"./images/logos/mercedes.png"} alt="Mercedes" />
                            <span>MERCEDES</span>
                        </div>

                        {/* Marca 4 */}
                        <div className="brand-card">
                            <img src={"./images/logos/honda.png"} alt="Honda" />
                            <span>HONDA</span>
                        </div>

                        {/* Marca 5 */}
                        <div className="brand-card">
                            <img src={"./images/logos/volkswagen.png"} alt="VW" />
                            <span>VOLKSWAGEN</span>
                        </div>
                    </div>
                </section>

            </div>
        </MainLayout>
    );
}

export default Inicio;