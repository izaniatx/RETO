import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import CarCard from './CarCard';
import '../../../css/Catalogo.css';
import { usePage } from '@inertiajs/react';

const CatalogoPage = () => {
  const { vehiculos = [], marcas = [], carrocerias = [] } = usePage().props;

  // 1️⃣ LÓGICA DE FAVORITOS (LocalStorage)
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('mis_favoritos')) || [];
    setFavoritos(guardados);
  }, []);

  const toggleFavorito = (id) => {
    let nuevosFavs;
    if (favoritos.includes(id)) {
      nuevosFavs = favoritos.filter(favId => favId !== id);
    } else {
      nuevosFavs = [...favoritos, id];
    }
    setFavoritos(nuevosFavs);
    localStorage.setItem('mis_favoritos', JSON.stringify(nuevosFavs));
  };

  // 2️⃣ ESTADOS DE FILTROS
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    searchQuery: '',
    marcas: [],
    precioMax: 100000,
    carroceriaId: 'todos',
    soloFavoritos: false, // 👈 Filtro por favoritos
  });

  // Debounce del buscador
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, searchQuery: searchTerm }));
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 3️⃣ FILTRADO REAL
  const filteredVehiculos = vehiculos.filter((coche) => {
    const modelo = coche.modelo?.modelo?.toLowerCase() || '';
    const search = filters.searchQuery.toLowerCase();
  
    if (search && !modelo.includes(search)) return false;
  
    if (filters.marcas.length > 0 && !filters.marcas.includes(coche.marca_id)) return false;
  
    if (Number(coche.precio) > filters.precioMax) return false;
  
    if (filters.carroceriaId !== 'todos' && Number(filters.carroceriaId) !== coche.carroceria_id) return false;

    // Aplicación del filtro de favoritos
    if (filters.soloFavoritos && !favoritos.includes(coche.id)) return false;
  
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

      <main style={{ flex: 1, padding: '20px' }}>
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '2rem' }}>Catálogo de Vehículos</h1>
          <p style={{ color: '#666' }}>
            Mostrando {filteredVehiculos.length} resultados 
            {filters.soloFavoritos && " (Filtrado por favoritos)"}
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
                isFavorito={favoritos.includes(coche.id)}
                onToggleFavorito={() => toggleFavorito(coche.id)}
              />
            ))
          ) : (
            <div className="no-results" style={{ textAlign: 'center', padding: '50px' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#333' }}>
                {filters.soloFavoritos ? "No tienes favoritos guardados" : "No hay resultados"}
              </h3>
              <p style={{ color: '#666' }}>
                {filters.soloFavoritos 
                  ? "Pulsa en el corazón de los coches que te gusten para verlos aquí." 
                  : "Prueba a cambiar los criterios de búsqueda."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CatalogoPage;