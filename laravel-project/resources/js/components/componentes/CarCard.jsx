import React from 'react';
import '../../../css/Catalogo.css';
import { Link } from '@inertiajs/react'; 
import { Heart } from 'lucide-react';

const CarCard = ({ coche, isFavorito, onToggleFavorito }) => {
  const cocheId = coche.cocheId;
  const marcaNombre = coche.marcaNombre;
  const modeloNombre = coche.modeloNombre;
  const carroceriaNombre = coche.carroceriaNombre;
  const imagenUrl = coche.imagen || '/vehiculos/default.jpg'; 

  return (
    <div className="car-card" style={{ 
      position: 'relative', 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* BOTÓN DE FAVORITO */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorito();
        }}
        title={isFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 10,
          transition: 'all 0.2s ease'
        }}
      >
        <Heart 
          size={22} 
          fill={isFavorito ? "#bd3a3f" : "none"} 
          color={isFavorito ? "#bd3a3f" : "#444"} 
        />
      </button>

      <div className="car-image" style={{ height: '200px', overflow: 'hidden' }}>
         <img 
          src={imagenUrl} 
          alt={`${marcaNombre} ${modeloNombre}`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Vehículo'; }}
        />
      </div>

      <div className="car-info" style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.75rem', color: '#bd3a3f', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {marcaNombre}
        </span>
        <h3 style={{ margin: '8px 0', fontSize: '1.3rem', color: '#1a1a1a' }}>{modeloNombre}</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: '4px 0' }}>
            <strong>Carrocería:</strong> {carroceriaNombre}
          </p>
          {coche.combustible && (
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '4px 0' }}>
              <strong>Motor:</strong> {coche.combustible}
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span className="car-price" style={{ fontWeight: '800', fontSize: '1.25rem', color: '#1a1a1a' }}>
            {coche.precio ? Number(coche.precio).toLocaleString('es-ES') + '€' : 'Consultar'}
          </span>
          
          <Link href={`/catalogo/${cocheId}`}>
            <button style={{ 
              backgroundColor: '#bd3a3f', 
              color: 'white', 
              border: 'none', 
              padding: '10px 18px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}>
              Ver detalles
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;