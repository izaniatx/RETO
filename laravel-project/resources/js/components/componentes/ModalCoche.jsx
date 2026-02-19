import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

const ModalCoche = ({
  showModal,
  setShowModal,
  marcas,
  modelos,
  carrocerias,
  todosEquipamientos,
  cocheEditar,
}) => {
  const { data, setData, post, put, errors, processing, reset } = useForm({
    marca: "",
    modelo: "",
    carroceria: "",
    color: "",
    precio: 0,
    equipamientos: [], 
  });

  useEffect(() => {
    if (cocheEditar) {
      setData({
        marca: cocheEditar.marca_id ?? "",
        modelo: cocheEditar.modelo_id ?? "",
        carroceria: cocheEditar.carroceria_id ?? "",
        color: cocheEditar.color ?? "",
        precio: cocheEditar.precio ?? 0,
        equipamientos: cocheEditar.equipamientos ?? [],
      });
    } else {
      reset();
    }
  }, [cocheEditar, showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cocheEditar) {
      put(`/inventario/coches/${cocheEditar.id}`, data, {
        onSuccess: () => setShowModal(false),
      });
    } else {
      post("/inventario/coches/create", data, {
        onSuccess: () => setShowModal(false),
      });
    }
  };

  const handleToggleEquipamiento = (id) => {
    const actuales = [...data.equipamientos];
    const index = actuales.indexOf(id);
    if (index > -1) {
      actuales.splice(index, 1);
    } else {
      actuales.push(id);
    }
    setData("equipamientos", actuales);
  };

  if (!showModal) return null;

  return (
    <div className="r-modal-backdrop">
      <div className="r-modal" style={{ maxWidth: "700px", width: "95%", padding: "2.5rem" }}>
        <h3 className="mb-4 text-dark">{cocheEditar ? "Editar Vehículo" : "Nuevo Vehículo"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
          
            <div className="col-md-6">
              <label className="form-label fw-bold text-dark">Marca:</label>
              <select className="form-select" value={data.marca} onChange={(e) => setData("marca", e.target.value)}>
                <option value="">Seleccionar Marca</option>
                {marcas.map((m) => <option key={m.id} value={m.id}>{m.marca}</option>)}
              </select>
              {errors.marca && <div className="text-danger small">{errors.marca}</div>}
            </div>

         
            <div className="col-md-6">
              <label className="form-label fw-bold text-dark">Modelo:</label>
              <select className="form-select" value={data.modelo} onChange={(e) => setData("modelo", e.target.value)}>
                <option value="">Seleccionar Modelo</option>
                {modelos.map((m) => <option key={m.id} value={m.id}>{m.modelo}</option>)}
              </select>
              {errors.modelo && <div className="text-danger small">{errors.modelo}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold text-dark">Carrocería:</label>
              <select className="form-select" value={data.carroceria} onChange={(e) => setData("carroceria", e.target.value)}>
                <option value="">Seleccionar Carrocería</option>
                {carrocerias.map((c) => <option key={c.id} value={c.id}>{c.carroceria}</option>)}
              </select>
              {errors.carroceria && <div className="text-danger small">{errors.carroceria}</div>}
            </div>

            
            <div className="col-md-3">
              <label className="form-label fw-bold text-dark">Color:</label>
              <input type="text" className="form-control" value={data.color} onChange={(e) => setData("color", e.target.value)} placeholder="Ej: Blanco" />
              {errors.color && <div className="text-danger small">{errors.color}</div>}
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold text-dark">Precio (€):</label>
              <input type="number" className="form-control" value={data.precio} onChange={(e) => setData("precio", e.target.value)} />
              {errors.precio && <div className="text-danger small">{errors.precio}</div>}
            </div>

         
            <div className="col-12 mt-4">
              <label className="form-label fw-bold text-dark border-bottom w-100 pb-2">Equipamiento Opcional</label>
              <div className="p-3 border rounded bg-light shadow-sm" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                <div className="row">
                  {todosEquipamientos && todosEquipamientos.map((extra) => (
                    <div key={extra.id} className="col-md-6 col-lg-4 mb-2">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`extra-${extra.id}`}
                          checked={data.equipamientos.includes(extra.id)}
                          onChange={() => handleToggleEquipamiento(extra.id)}
                        />
                        <label className="form-check-label small text-dark pointer" htmlFor={`extra-${extra.id}`}>
                          {extra.equipamiento}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 d-flex justify-content-end gap-2 border-top pt-3">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary px-4 shadow-sm" disabled={processing}>
              {cocheEditar ? "Guardar Cambios" : "Crear Vehículo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCoche;