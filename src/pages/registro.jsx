

function Registro() {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Formulario de Ejemplo</h2>
            <form>
            <div className="row">
                {/* Columna 1 */}
                <div className="col-md-6">
                {/* Campo 1 */}
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Introduce tu nombre" />
                </div>

                {/* Campo 2 */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" placeholder="Introduce tu correo" />
                </div>

                {/* Campo 3 */}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Introduce tu teléfono" />
                </div>
                </div>

                {/* Columna 2 */}
                <div className="col-md-6">
                {/* Campo 4 */}
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Introduce tu apellido" />
                </div>

                {/* Campo 5 */}
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Introduce tu dirección" />
                </div>

                {/* Campo 6 */}
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">Ciudad</label>
                    <input type="text" className="form-control" id="city" placeholder="Introduce tu ciudad" />
                </div>
                </div>
            </div>

            {/* Botón de Enviar */}
            <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )

    
}

export default Registro;

