import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

const ModalEquipamiento = ({
  showModal,
  setShowModal,
  equipamientoEditar, 
}) => {
  const { data, setData, post, put, errors, processing, reset } = useForm({
    nombre: "", 
  });

  useEffect(() => {
    if (equipamientoEditar) {
      setData({
        nombre: equipamientoEditar.equipamiento ?? "",
      });
    } else {
      reset();
    }
  }, [equipamientoEditar, showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (equipamientoEditar) {
      // Ruta actualizada para coincidir con: Route::put('/equipamientos/{id}', ...)
      put(`/inventario/equipamientos/${equipamientoEditar.id}`, data, {
        onSuccess: () => {
          setShowModal(false);
          reset();
        },
      });
    } else {
      // Ruta actualizada para coincidir con: Route::post('/equipamientos/create', ...)
      post("/inventario/equipamientos/create", data, {
        onSuccess: () => {
          setShowModal(false);
          reset();
        },
      });
    }
  };

  if (!showModal) return null;

  return (
    <div className="r-modal-backdrop">
      <div className="r-modal" style={{ maxWidth: "500px", width: "90%", padding: "2rem" }}>
        <h3 className="mb-4 text-dark text-center fw-bold">
          {equipamientoEditar ? " Editar Equipamiento" : " Nuevo Equipamiento"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold text-dark">Nombre del Equipamiento:</label>
            <input
              type="text"
              className={`form-control shadow-sm ${errors.nombre ? 'is-invalid' : ''}`}
              value={data.nombre}
              onChange={(e) => setData("nombre", e.target.value)}
              placeholder="Ej: Techo Panorámico"
              autoFocus
            />
            {errors.nombre && <div className="invalid-feedback fw-bold">{errors.nombre}</div>}
          </div>

          <div className="d-flex justify-content-end gap-2 border-top pt-3">
            <button 
              type="button" 
              className="btn btn-light border px-4" 
              onClick={() => { setShowModal(false); reset(); }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-dark px-4 shadow-sm" 
              disabled={processing || !data.nombre}
            >
              {processing ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : null}
              {equipamientoEditar ? "Guardar Cambios" : "Crear Ahora"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEquipamiento;