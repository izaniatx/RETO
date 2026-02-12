import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import CarCard from './CarCard';
import '../../../css/Catalogo.css';
import { usePage } from '@inertiajs/react';

const CatalogoPage = () => {
  const { vehiculos = [], marcas = [], carrocerias = [] } = usePage().props;

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    searchQuery: '',
    marcas: [],
    precioMax: 100000,
    carroceriaId: 'todos',
  });

  // 🔹 Debounce del buscador
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, searchQuery: searchTerm }));
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🔥 FILTRADO REAL
  const filteredVehiculos = vehiculos.filter((coche) => {
    console.log('------------------------');
    console.log('ID:', coche.id);
    console.log('MODELO:', coche.modelo?.modelo);
    console.log('MARCA_ID:', coche.marca_id);
    console.log('CARROCERIA_ID:', coche.carroceria_id);
    console.log('PRECIO:', coche.precio);
    console.log('FILTROS:', filters);
  
    const modelo = coche.modelo?.modelo?.toLowerCase() || '';
    const search = filters.searchQuery.toLowerCase();
  
    if (search && !modelo.includes(search)) {
      console.log('❌ DESCARTADO por búsqueda');
      return false;
    }
  
    if (
      filters.marcas.length > 0 &&
      !filters.marcas.includes(coche.marca_id)
    ) {
      console.log('❌ DESCARTADO por marca');
      return false;
    }
  
    if (Number(coche.precio) > filters.precioMax) {
      console.log('❌ DESCARTADO por precio');
      return false;
    }
  
    if (
      filters.carroceriaId !== 'todos' &&
      Number(filters.carroceriaId) !== coche.carroceria_id
    ) {
      console.log('❌ DESCARTADO por carrocería');
      return false;
    }
  
    console.log('✅ PASA EL FILTRO');
    return true;
  });
  
  

  return (
    <div className="catalogo-container">
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
          <h1 style={{ fontSize: '2rem' }}>Catálogo de Vehículos</h1>
          <p style={{ color: '#666' }}>
            Mostrando {filteredVehiculos.length} resultados
          </p>
        </header>

        <div className="car-grid">
          {filteredVehiculos.length > 0 ? (
            filteredVehiculos.map(coche => (
              <CarCard
                key={coche.id}
                coche={{
                  ...coche,
                  cocheId: coche.id,
                  marcaNombre: coche.marca?.marca || 'Sin marca',
                  modeloNombre: coche.modelo?.modelo || 'Sin modelo',
                  carroceriaNombre: coche.carroceria?.carroceria || 'N/A',
                }}
              />
            ))
          ) : (
            <div className="no-results">
              <h3>No hay resultados</h3>
              <p>Prueba a cambiar los filtros</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CatalogoPage;
