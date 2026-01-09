import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import CarCard from './CarCard';
import './css/Catalogo.css'; // Asegúrate de que el nombre del archivo coincida

// Datos de ejemplo para que veas contenido
const COCHES_DATA = [
  { id: 1, marca: 'Toyota', modelo: 'Corolla', precio: 25000, combustible: 'hibrido', imagen: 'https://loremflickr.com/320/240/car', año: 2023 },
  { id: 2, marca: 'BMW', modelo: 'Serie 3', precio: 45000, combustible: 'diesel', imagen: 'https://loremflickr.com/320/240/car', año: 2022 },
  { id: 3, marca: 'Tesla', modelo: 'Model 3', precio: 50000, combustible: 'electrico', imagen: 'https://loremflickr.com/320/240/car', año: 2024 },
  { id: 4, marca: 'Audi', modelo: 'A4', precio: 38000, combustible: 'gasolina', imagen: 'https://loremflickr.com/320/240/car', año: 2021 },
  { id: 5, marca: 'Toyota', modelo: 'Yaris', precio: 18000, combustible: 'hibrido', imagen: 'https://loremflickr.com/320/240/car', año: 2023 },
  { id: 6, marca: 'Mercedes', modelo: 'Clase C', precio: 42000, combustible: 'diesel', imagen: 'https://loremflickr.com/320/240/car', año: 2022 },
  { id: 7, marca: 'Ford', modelo: 'Focus', precio: 22000, combustible: 'gasolina', imagen: 'https://loremflickr.com/320/240/car', año: 2021 },
  { id: 8, marca: 'Honda', modelo: 'Civic', precio: 24000, combustible: 'hibrido', imagen: 'https://loremflickr.com/320/240/car', año: 2023 },
  { id: 9, marca: 'Volkswagen', modelo: 'Golf', precio: 23000, combustible: 'gasolina', imagen: 'https://loremflickr.com/320/240/car', año: 2022 },
  { id: 10, marca: 'Nissan', modelo: 'Leaf', precio: 29000, combustible: 'electrico', imagen: 'https://loremflickr.com/320/240/car', año: 2024 },
  { id: 11, marca: 'Hyundai', modelo: 'Ioniq', precio: 31000, combustible: 'hibrido', imagen: 'https://loremflickr.com/320/240/car', año: 2023 },
  { id: 12, marca: 'Kia', modelo: 'Soul EV', precio: 33000, combustible: 'electrico', imagen: 'https://loremflickr.com/320/240/car', año: 2024 },
];

const CatalogoPage = () => {
  const [cochesFiltrados, setCochesFiltrados] = useState(COCHES_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [filters, setFilters] = useState({
    searchQuery: "",
    marcas: [],
    precioMax: 100000,
    combustible: 'todos'
  });

  // Debounce para el buscador
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, searchQuery: searchTerm }));
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Lógica de Filtrado
  useEffect(() => {
    const resultado = COCHES_DATA.filter(coche => {
      const coincideBusqueda = 
        coche.marca.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        coche.modelo.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      const porMarca = filters.marcas.length > 0 ? filters.marcas.includes(coche.marca) : true;
      const porPrecio = coche.precio <= filters.precioMax;
      const porCombustible = filters.combustible !== 'todos' ? coche.combustible === filters.combustible : true;

      return coincideBusqueda && porMarca && porPrecio && porCombustible;
    });
    
    setCochesFiltrados(resultado);
  }, [filters]);

  return (
    <div className="catalogo-container">
      {/* Columna Izquierda */}
      <Sidebar 
        filters={filters} 
        setFilters={setFilters} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} 
      />

      {/* Columna Derecha */}
      <main style={{ flex: 1 }}>
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '5px' }}>Catálogo de Vehículos</h1>
          <p style={{ color: '#666' }}>Mostrando {cochesFiltrados.length} resultados</p>
        </header>

        <div className="car-grid">
          {cochesFiltrados.length > 0 ? (
            cochesFiltrados.map(coche => (
              <CarCard key={coche.id} coche={coche} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '10px' }}>
              <h3>No se encontraron vehículos</h3>
              <p>Prueba a ajustar los filtros o limpiar la búsqueda.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CatalogoPage;