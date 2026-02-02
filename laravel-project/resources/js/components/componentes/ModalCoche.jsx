import React from "react";
import { useForm, router } from "@inertiajs/react";

const ModalCoche = ({ showModal, setShowModal, marcas, modelos, carrocerias, cocheEditar }) => {
  const { data, setData, post, put, errors, processing } = useForm({
    marca_id: cocheEditar?.marca_id || "",
    modelo_id: cocheEditar?.modelo_id || "",
    carroceria_id: cocheEditar?.carroceria_id || "",
    color: cocheEditar?.color || "",
    precio: cocheEditar?.precio || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

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

  };

  if (!showModal) return null;

  return (
    <div className="r-modal-backdrop">
      <div
        className="r-modal"
        style={{ maxWidth: "600px", width: "90%", padding: "2.5rem" }}
      >
        <h3 className="mb-4">{cocheEditar ? "Editar Coche" : "Nuevo Coche"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Marca */}
            <div className="col-md-6">
              <label className="form-label">Marca:</label>
              <select
                className="form-select"
                value={data.marca_id}
                onChange={(e) => setData("marca_id", e.target.value)}
              >
                <option value="">Seleccionar</option>
                {marcas.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.marca}
                  </option>
                ))}
              </select>
              {errors.marca_id && <p className="text-danger">{errors.marca_id}</p>}
            </div>

            {/* Modelo */}
            <div className="col-md-6">
              <label className="form-label">Modelo:</label>
              <select
                className="form-select"
                value={data.modelo_id}
                onChange={(e) => setData("modelo_id", e.target.value)}
              >
                <option value="">Seleccionar</option>
                {modelos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.modelo}
                  </option>
                ))}
              </select>
              {errors.modelo_id && <p className="text-danger">{errors.modelo_id}</p>}
            </div>

            {/* Carrocería */}
            <div className="col-md-6">
              <label className="form-label">Carrocería:</label>
              <select
                className="form-select"
                value={data.carroceria_id}
                onChange={(e) => setData("carroceria_id", e.target.value)}
              >
                <option value="">Seleccionar</option>
                {carrocerias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.carroceria}
                  </option>
                ))}
              </select>
              {errors.carroceria_id && (
                <p className="text-danger">{errors.carroceria_id}</p>
              )}
            </div>

            {/* Color */}
            <div className="col-md-6">
              <label className="form-label">Color:</label>
              <input
                type="text"
                className="form-control"
                value={data.color}
                onChange={(e) => setData("color", e.target.value)}
              />
              {errors.color && <p className="text-danger">{errors.color}</p>}
            </div>

            {/* Precio */}
            <div className="col-md-6">
              <label className="form-label">Precio:</label>
              <input
                type="number"
                className="form-control"
                value={data.precio}
                onChange={(e) => setData("precio", Number(e.target.value))}
              />
              {errors.precio && <p className="text-danger">{errors.precio}</p>}
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={processing}>
              {cocheEditar ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCoche;
