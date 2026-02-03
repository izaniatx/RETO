import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import CarCard from './CarCard';
import '../../../css/Catalogo.css';
import { usePage } from '@inertiajs/react';

const CatalogoPage = () => {
  // 1. Extraemos los datos de las props (corregido el error en carrocerias)
  const { 
    vehiculos = [], 
    marcas = [], 
    carrocerias = [] 
  } = usePage().props;

  // 2. Estados para que el Sidebar funcione (aunque no filtren en el cliente)
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    searchQuery: '',
    marcas: [],
    precioMax: 100000,
    combustible: 'todos',
    carrocerias: []
  });

  // Debounce para actualizar el estado de búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, searchQuery: searchTerm }));
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div className="catalogo-container">
      {/* Sidebar con marcas y carrocerías dinámicas */}
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        marcasBackend={marcas}
        carroceriasBackend={carrocerias}
      />

      <main style={{ flex: 1 }}>
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '5px' }}>Catálogo de Vehículos</h1>
          <p style={{ color: '#666' }}>Mostrando {vehiculos.length} resultados totales</p>
        </header>

        <div className="car-grid">
          {vehiculos.length > 0 ? (
            /* Renderizado directo de la prop vehiculos */
            vehiculos.map(coche => (
              <CarCard
                key={coche.id}
                coche={{
                  ...coche,
                  marcaNombre: coche.marca?.marca || 'Sin marca',
                  modeloNombre: coche.modelo?.modelo || 'Sin modelo',
                  carroceriaNombre: coche.carroceria?.carroceria || 'N/A',
                }}
              />
            ))
          ) : (
            <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '50px',
                backgroundColor: 'white',
                borderRadius: '10px',
              }}>
              <h3>No hay vehículos disponibles</h3>
              <p>Verifica la conexión con la base de datos o el controlador.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CatalogoPage;