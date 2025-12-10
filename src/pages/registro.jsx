import './css/registro.css';

function Registro() {
    return ( 
        <div>
            <button id="btn-atras" onClick={() => window.location.href = '/'} style={{ position: 'absolute', top: '10px', left: '10px' }}>&larr;</button>
        <div className="container mt-5">
            <h2 className="mb-4">Registro</h2>
            <form>
            <div className="row" id='cnt'>
                {/* Columna 1 */}
                <div className="col-md-6">
                {/* Campo 1 */}
                <div className="mb-3" id='txt-cnt'>
                    <label htmlFor="firstName" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Introduce tu nombre" />
                </div>

                {/* Campo 2 */}
                <div className="mb-3" id='txt-cnt'>
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" placeholder="Introduce tu correo" />
                </div>

                {/* Campo 3 */}
                <div className="mb-3" id='txt-cnt'>
                    <label htmlFor="usuario" className="form-label">Usuario</label>
                    <input type="text" className="form-control" id="usuario" placeholder="Introduce tu usuario" />
                </div>
                </div>

                {/* Columna 2 */}
                <div className="col-md-6">
                {/* Campo 4 */}
                <div className="mb-3" id='txt-cnt'>
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Introduce tu apellido" />
                </div>

                {/* Campo 5 */}
                <div className="mb-3" id='txt-cnt'>
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input type="tel" className="form-control" id="telefono" placeholder="Introduce tu telefono" />
                </div>

                {/* Campo 6 */}
                <div className="mb-3" id='txt-cnt'>
                    <label htmlFor="contrasenya" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="contrasenya" placeholder="Introduce tu contraseña" />
                </div>
                </div>
            </div>

            {/* Botón de Enviar */}
            <button type="submit" id='btn-registro' className="btn btn-primary">Registrarte</button>
            </form>
        </div>
        </div>

        
    )

    
}

export default Registro;

