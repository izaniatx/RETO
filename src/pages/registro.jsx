import './css/registro.css';
import React from 'react';
import formValidator from '../lib/formValidator';

function Registro() {
    const handleSubmit = (e) => {
        
        e.preventDefault();
        
        console.log('Enviar registro (preventDefault aplicado)');
    };

    return ( 
        <div className="registro-bg" style={{ position: 'relative' }}>
            <button
                id="btn-atras"
                onClick={() => window.location.href = '/RETO/'}
                style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 3 }}
            >
                &larr;
            </button>

            <div className="container mt-5" style={{ position: 'relative', zIndex: 2, pointerEvents: 'auto' }}>
                <h2 className="mb-4" style={{ color: 'white' }}>REGISTRO</h2>

                <form onSubmit={handleSubmit} style={{ pointerEvents: 'auto' }}>

                <div className="row" id='cnt'>

                    {/* Columna 1 */}
                    <div className="col-md-6">

                        {/* Campo 1 */}
                        <div className="mb-3" id='txt-cnt'>
                            <label htmlFor="firstName" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="firstName" placeholder="Introduce tu nombre" />
                            <small class="error" id="error-firstName"></small>
                        </div>

                        {/* Campo 2 */}
                        <div className="mb-3" id='txt-cnt'>
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="email" placeholder="Introduce tu correo" />
                            <small class="error" id="error-email"></small>
                        </div>
                        
                        {/* Campo 3 */}
                        <div className="mb-3" id='txt-cnt'>
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <input type="text" className="form-control" id="usuario" placeholder="Introduce tu usuario" />
                            <small class="error" id="error-usuario"></small>
                        </div>
                    </div>



                    {/* Columna 2 */}
                    <div className="col-md-6">

                        {/* Campo 4 */}
                        <div className="mb-3" id='txt-cnt'>
                            <label htmlFor="lastName" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="lastName" placeholder="Introduce tu apellido" />
                            <small class="error" id="error-lastName"></small>
                        </div>

                        {/* Campo 5 */}
                        <div className="mb-3" id='txt-cnt'>
                            <label htmlFor="contrasenya" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="contrasenya" placeholder="Introduce tu contraseña" />
                            <small class="error" id="error-contrasenya"></small>
                        </div>

                        {/* Campo 6 */}
                        <div className="mb-3" id='txt-cnt'>
                            <label htmlFor="telefono" className="form-label">Telefono</label>
                            <input type="tel" className="form-control" id="telefono" placeholder="Introduce tu telefono" />
                            <small class="error" id="error-telefono"></small>
                        </div>
                    </div>
                        <small class="error" id="error-all"></small>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-4">
                        {/* Botón de Enviar */}
                        <button type="submit" id='btn-registro' className="btn btn-primary" onClick={formValidator}>Registrarse</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
        
    )


    
}

export default Registro;

