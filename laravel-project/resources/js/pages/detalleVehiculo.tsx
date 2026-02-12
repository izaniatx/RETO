import { Head, Link } from '@inertiajs/react';
import '../../css/detalleVehiculo.css';
import MainLayout from "../layouts/MainLayout";
import ModalReserva from '../components/componentes/modalReserva';
import React, { useState } from 'react';

interface Equipamiento {
  id: number;
  equipamiento: string; // Cambiado de 'nombre' a 'equipamiento' para coincidir con el modelo
}

interface Vehiculo {
  id: number;
  color: string;
  precio: number;
  fecha_alta: string;
  imagen?: string;
  marca: { marca: string };
  modelo: { modelo: string };
  carroceria: { carroceria: string };
  equipamientos?: Equipamiento[];
}

interface Props {
  vehiculo: Vehiculo;
}

const DetalleVehiculo = ({ vehiculo }: Props) => {
  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <MainLayout>
      <Head title={`${vehiculo.marca?.marca} ${vehiculo.modelo?.modelo}`} />
      
      <div className="detalle-container">
        <div className="detalle-card-wrapper">
          
          {/* COLUMNA IZQUIERDA: Imagen y Características */}
          <div className="col-main">
            <div className="image-card">
              {vehiculo.imagen ? (
                <img src={`/storage/${vehiculo.imagen}`} alt="Vehículo" />
              ) : (
                <div className="img-placeholder">Sin Imagen</div>
              )}
            </div>

            <div className="features-section">
              <h3>Características:</h3>
              <div className="chips-group">
                <span className="chip-label">MARCA: <strong>{vehiculo.marca?.marca}</strong></span>
                <span className="chip-label">MODELO: <strong>{vehiculo.modelo?.modelo}</strong></span>
                <span className="chip-label">CARROCERÍA: <strong>{vehiculo.carroceria?.carroceria}</strong></span>
                <span className="chip-label">COLOR: <strong>{vehiculo.color}</strong></span>
              </div>
            </div>

            {/* Equipamiento Opcional */}
            {/* Equipamiento Opcional */}
            {vehiculo.equipamientos && vehiculo.equipamientos.length > 0 && (
              <div className="extra-section">
                <h3>Equipamiento Opcional:</h3>
                <div className="extra-grid">
                  {vehiculo.equipamientos.map((item) => (
                    <div key={item.id} className="extra-item">
                      <span className="dot">•</span> 
                      {/* CAMBIO AQUÍ: Usamos item.equipamiento en lugar de item.nombre */}
                      {item.equipamiento} 
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: Info Reserva */}
          <div className="col-sidebar">
            <div className="booking-card">
              <h1 className="title-display">{vehiculo.marca?.marca} {vehiculo.modelo?.modelo}</h1>
              <p className="location-text">Donostia 📍</p>
              <p className="price-display">Precio: {formatPrecio(vehiculo.precio)}</p>

              <div className="info-box-light">
                <p><strong>Reservar vehículo</strong></p>
                <p>Reserva el vehículo para asegurarte de que no te lo quiten.</p>
              </div>

              <button className="btn-action" onClick={() => setIsModalOpen(true)}>
                Reservar
              </button>

            {/* Invocación del modal */}
            <ModalReserva 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                vehiculo={vehiculo} 
            />
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default DetalleVehiculo;