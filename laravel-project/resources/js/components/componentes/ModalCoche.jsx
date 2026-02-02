import React from "react";
import { useForm } from "@inertiajs/react";

const ModalCoche = ({ showModal, setShowModal, marcas, modelos, carrocerias, cocheEditar }) => {
  const { data, setData, post, put, errors, processing } = useForm({
    marca: cocheEditar?.marca_id || "",
    modelo: cocheEditar?.modelo_id || "",
    carroceria: cocheEditar?.carroceria_id || "",
    color: cocheEditar?.color || "",
    precio: cocheEditar?.precio || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      marca: data.marca,
      modelo: data.modelo,
      carroceria: data.carroceria,
      color: data.color,
      precio: data.precio,
    };

    if (cocheEditar) {
      put(`/inventario/coches/${cocheEditar.id}`, payload, {
        onSuccess: () => setShowModal(false),
      });
    } else {
      post("/inventario/coches/create", payload, {
        onSuccess: () => setShowModal(false),
      });
    }
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
                value={data.marca}
                onChange={(e) => setData("marca", e.target.value)}
              >
                <option value="">Seleccionar</option>
                {marcas.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.marca}
                  </option>
                ))}
              </select>
              {errors.marca && <p className="text-danger">{errors.marca}</p>}
            </div>

            {/* Modelo */}
            <div className="col-md-6">
              <label className="form-label">Modelo:</label>
              <select
                className="form-select"
                value={data.modelo}
                onChange={(e) => setData("modelo", e.target.value)}
              >
                <option value="">Seleccionar</option>
                {modelos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.modelo}
                  </option>
                ))}
              </select>
              {errors.modelo && <p className="text-danger">{errors.modelo}</p>}
            </div>

            {/* Carrocería */}
            <div className="col-md-6">
              <label className="form-label">Carrocería:</label>
              <select
                className="form-select"
                value={data.carroceria}
                onChange={(e) => setData("carroceria", e.target.value)}
              >
                <option value="">Seleccionar</option>
                {carrocerias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.carroceria}
                  </option>
                ))}
              </select>
              {errors.carroceria && <p className="text-danger">{errors.carroceria}</p>}
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
