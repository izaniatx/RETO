import React from 'react';

const UsuarioModal = ({ show, onClose, formValues, setFormValues, errors, roles, handleSubmit }) => {
  if (!show) return null;

  return (
    <div className="r-modal-backdrop">
      <div className="r-modal" style={{ maxWidth: '600px', width: '90%', padding: '2.5rem' }}>
        <h3 className="mb-4">Nuevo Usuario</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
         
            <div className="col-md-6">
              <label className="form-label">Usuario:</label>
              <input
                type="text"
                className="form-control"
                value={formValues.usuario}
                onChange={(e) => setFormValues({ ...formValues, usuario: e.target.value })}
              />
              {errors.usuario && <p className="text-danger">{errors.usuario}</p>}
            </div>

       
            <div className="col-md-6">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                value={formValues.nombre}
                onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })}
              />
              {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
            </div>

            
            <div className="col-md-6">
              <label className="form-label">Apellido:</label>
              <input
                type="text"
                className="form-control"
                value={formValues.apellido}
                onChange={(e) => setFormValues({ ...formValues, apellido: e.target.value })}
              />
              {errors.apellido && <p className="text-danger">{errors.apellido}</p>}
            </div>

         
            <div className="col-md-6">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

         
            <div className="col-md-6">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

   
            <div className="col-md-6">
              <label className="form-label">Teléfono:</label>
              <input
                type="text"
                className="form-control"
                value={formValues.telefono}
                onChange={(e) => setFormValues({ ...formValues, telefono: e.target.value })}
              />
              {errors.telefono && <p className="text-danger">{errors.telefono}</p>}
            </div>

     
            <div className="col-md-12">
              <label className="form-label">Rol:</label>
              <select
                className="form-select"
                value={formValues.rol_id}
                onChange={(e) => setFormValues({ ...formValues, rol_id: e.target.value })}
              >
                <option value="">Seleccionar</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.rol}
                  </option>
                ))}
              </select>
              {errors.rol_id && <p className="text-danger">{errors.rol_id}</p>}
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuarioModal;
