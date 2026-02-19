import React, { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import { usePage } from '@inertiajs/react';

const Contacto = () => {
   
    const { auth } = usePage<any>().props;
    const user = auth?.user;

    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState(false);

   
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');

    
    useEffect(() => {
        if (user) {
            setNombre(`${user.nombre} ${user.apellido}`);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEnviando(true);

        setTimeout(() => {
            setEnviando(false);
            setEnviado(true);
            
           
            setAsunto('');
            setMensaje('');
            setTimeout(() => setEnviado(false), 5000);
        }, 1500);
    };

    return (
        <MainLayout>
            <div style={{ backgroundColor: '#f8f9fa', minHeight: '90vh', padding: '50px 0' }}>
                <div className="container">
                    <div className="row g-5 align-items-center">
                       
                        <div className="col-lg-5">
                            <h1 className="fw-bold mb-4" style={{ fontSize: '3.5rem', color: '#212529' }}>
                                Contacta con <br /> nosotros
                            </h1>
                            <p className="text-muted mb-5" style={{ fontSize: '1.1rem' }}>
                                ¿Tienes alguna duda? Nuestro equipo está aquí para ayudarte.
                            </p>

                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px' }}>
                                    <i className="bi bi-geo-alt text-white"></i>
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold">Nuestro Correo</h6>
                                    <small className="text-muted">contacto@aroautomocion.com</small>
                                </div>
                            </div>
                          
                        </div>

                      
                        <div className="col-lg-7">
                            <div className="bg-white p-5 rounded-4 shadow-sm border" style={{ borderRadius: '15px' }}>
                                {enviado ? (
                                    <div className="text-center py-5">
                                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                                        <h4 className="mt-3">¡Mensaje Enviado!</h4>
                                        <p className="text-muted">Gracias {user ? user.nombre : ''}, te responderemos pronto.</p>
                                        <button className="btn btn-outline-dark mt-3" onClick={() => setEnviado(false)}>Enviar otro</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Nombre</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-light border-0 py-2" 
                                                    value={nombre}
                                                    onChange={(e) => setNombre(e.target.value)}
                                                    placeholder="Tu nombre" 
                                                    required 
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Email</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control bg-light border-0 py-2" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="tu@email.com" 
                                                    required 
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Asunto</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-light border-0 py-2" 
                                                    value={asunto}
                                                    onChange={(e) => setAsunto(e.target.value)}
                                                    required 
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Mensaje</label>
                                                <textarea 
                                                    className="form-control bg-light border-0 py-2" 
                                                    rows={4} 
                                                    value={mensaje}
                                                    onChange={(e) => setMensaje(e.target.value)}
                                                    placeholder="¿En qué podemos ayudarte?" 
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <button 
                                                    type="submit" 
                                                    className="btn w-100 py-3 fw-bold text-white" 
                                                    style={{ backgroundColor: '#a51d1d', border: 'none' }}
                                                    disabled={enviando}
                                                >
                                                    {enviando ? 'Enviando...' : 'Enviar Mensaje'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Contacto;