import React from 'react';
import '../../../css/Catalogo.css';

const CarCard = ({ coche }) => {
  return (
    <div className="car-card">
      {/* Contenedor de la imagen */}
      <div className="car-image">
        <img 
          src={coche.imagen} 
          alt={`${coche.marca} ${coche.modelo}`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          // Imagen por defecto si la URL falla
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Coche'; }}
        />
      </div>

      {/* Información del coche */}
      <div className="car-info">
        <span style={{ fontSize: '0.75rem', color: '#bd3a3f', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {coche.marca}
        </span>
        <h3 style={{ margin: '5px 0', fontSize: '1.2rem' }}>{coche.modelo}</h3>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
          Combustible: <span style={{ textTransform: 'capitalize' }}>{coche.combustible}</span>
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="car-price">
            {coche.precio.toLocaleString('es-ES')}€
          </span>
          <button style={{ 
            backgroundColor: '#bd3a3f', 
            color: 'white', 
            border: 'none', 
            padding: '8px 12px', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;