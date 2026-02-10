import React from 'react';
import '../../../css/Catalogo.css';

const Sidebar = ({ filters, setFilters, searchTerm, setSearchTerm, marcasBackend, carroceriasBackend }) => {
  
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      searchQuery: "",
      marcas: [],
      precioMax: 120000,
      carroceriaId: 'todos' // <--- Añade esto
    });
  };

  const handleMarcaChange = (marcaId) => {
    // IMPORTANTE: Ahora manejamos IDs, no nombres de texto
    const nuevasMarcas = filters.marcas.includes(marcaId)
      ? filters.marcas.filter(id => id !== marcaId)
      : [...filters.marcas, marcaId];
    
    setFilters({ ...filters, marcas: nuevasMarcas });
  };
  return (
    <aside className="sidebar">
      {/* Cabecera con botón de limpiar */}
      <div className="sidebar-header">
        <h2>Filtros</h2>
        {(searchTerm !== "" || filters.marcas.length > 0 || filters.precioMax < 120000 || filters.carroceriaId !== 'todos') && (
        <button className="btn-reset" onClick={resetFilters}>
          Limpiar
        </button>
      )}
      </div>

      {/* Grupo 1: Buscador de texto */}
      <div className="filter-group">
        <label className="filter-label">Buscar Modelo</label>
        <input 
          type="text" 
          className="search-input"
          placeholder="Ej: Corolla, Serie 3..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grupo 2: Selección de Marcas */}
     <div className="filter-group">
        <label className="filter-label">Marcas</label>
        <div className="scrollable-marcas" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {marcasBackend.map(marca => (
            <label key={marca.id} className="checkbox-item">
              <input 
                type="checkbox" 
                // Comparamos por ID
                checked={filters.marcas.includes(marca.id)}
                onChange={() => handleMarcaChange(marca.id)}
              />
              <span>{marca.marca}</span> 
            </label>
          ))}
        </div>
      </div>

      {/* Grupo 3: Rango de Precio */}
      <div className="filter-group">
        <label className="filter-label">Precio Máximo</label>
        <input
          type="range"
          min="5000"
          max="120000"
          step="1000"
          value={filters.precioMax}
          onChange={(e) =>
            setFilters({ ...filters, precioMax: Number(e.target.value) })
          }
        />

        <span className="price-display">
          {filters.precioMax.toLocaleString('es-ES')}€
        </span>
      </div>

     
      {/* Grupo 4: Tipo de Carrocería Dinámica */}
        <div className="filter-group">
          <label className="filter-label">Carrocería</label>
          <select 
            className="search-input" 
            value={filters.carroceriaId || 'todos'} // Usamos el ID para el filtro
            onChange={(e) => setFilters({...filters, carroceriaId: e.target.value})}
            style={{ cursor: 'pointer' }}
          >
            <option value="todos">Todas las carrocerías</option>
            {carroceriasBackend.map((c) => (
              <option key={c.id} value={c.id}>
                {c.carroceria}
              </option>
            ))}
          </select>
        </div>
    </aside>
  );
};

export default Sidebar;