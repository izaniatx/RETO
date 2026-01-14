import React from 'react';
import '../../../css/Catalogo.css';

const Sidebar = ({ filters, setFilters, searchTerm, setSearchTerm }) => {
  
  // Función para resetear todos los filtros al estado inicial
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      searchQuery: "",
      marcas: [],
      precioMax: 100000,
      combustible: 'todos'
    });
  };

  // Función para manejar el cambio en los checkboxes de marcas
  const handleMarcaChange = (marca) => {
    const nuevasMarcas = filters.marcas.includes(marca)
      ? filters.marcas.filter(m => m !== marca)
      : [...filters.marcas, marca];
    
    setFilters({ ...filters, marcas: nuevasMarcas });
  };

  return (
    <aside className="sidebar">
      {/* Cabecera con botón de limpiar */}
      <div className="sidebar-header">
        <h2>Filtros</h2>
        {(searchTerm !== "" || filters.marcas.length > 0 || filters.precioMax < 100000) && (
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
        {['Toyota', 'BMW', 'Audi', 'Tesla', 'Mercedes'].map(marca => (
          <label key={marca} className="checkbox-item">
            <input 
              type="checkbox" 
              checked={filters.marcas.includes(marca)}
              onChange={() => handleMarcaChange(marca)}
            />
            <span>{marca}</span>
          </label>
        ))}
      </div>

      {/* Grupo 3: Rango de Precio */}
      <div className="filter-group">
        <label className="filter-label">Precio Máximo</label>
        <input 
          type="range" 
          className="range-slider"
          min="10000" 
          max="100000" 
          step="1000"
          value={filters.precioMax}
          onChange={(e) => setFilters({...filters, precioMax: parseInt(e.target.value)})}
        />
        <span className="price-display">
          {filters.precioMax.toLocaleString('es-ES')}€
        </span>
      </div>

      {/* Grupo 4: Tipo de Combustible */}
      <div className="filter-group">
        <label className="filter-label">Combustible</label>
        <select 
          className="search-input" // Reutilizamos estilo de input para el select
          value={filters.combustible}
          onChange={(e) => setFilters({...filters, combustible: e.target.value})}
          style={{ cursor: 'pointer' }}
        >
          <option value="todos">Todos</option>
          <option value="hibrido">Híbrido</option>
          <option value="electrico">Eléctrico</option>
          <option value="gasolina">Gasolina</option>
          <option value="diesel">Diésel</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;