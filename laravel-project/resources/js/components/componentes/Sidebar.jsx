import React from 'react';
import '../../../css/Catalogo.css';

const Sidebar = ({ filters, setFilters, searchTerm, setSearchTerm, marcasBackend, carroceriasBackend }) => {
  
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      searchQuery: "",
      marcas: [],
      precioMax: 120000,
      carroceriaId: 'todos' 
    });
  };

  const handleMarcaChange = (marcaId) => {
 
    const nuevasMarcas = filters.marcas.includes(marcaId)
      ? filters.marcas.filter(id => id !== marcaId)
      : [...filters.marcas, marcaId];
    
    setFilters({ ...filters, marcas: nuevasMarcas });
  };
  return (
    <aside className="sidebar">
    
      <div className="sidebar-header">
        <h2>Filtros</h2>
        {(searchTerm !== "" || filters.marcas.length > 0 || filters.precioMax < 120000 || filters.carroceriaId !== 'todos') && (
        <button className="btn-reset" onClick={resetFilters}>
          Limpiar
        </button>
      )}
      </div>

    
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

   
     <div className="filter-group">
        <label className="filter-label">Marcas</label>
        <div className="scrollable-marcas" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {marcasBackend.map(marca => (
            <label key={marca.id} className="checkbox-item">
              <input 
                type="checkbox" 
            
                checked={filters.marcas.includes(marca.id)}
                onChange={() => handleMarcaChange(marca.id)}
              />
              <span>{marca.marca}</span> 
            </label>
          ))}
        </div>
      </div>

  
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

     

        <div className="filter-group">
          <label className="filter-label">Carrocería</label>
          <select 
            className="search-input" 
            value={filters.carroceriaId || 'todos'} 
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

        <div className="filter-group" style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={filters.soloFavoritos}
              onChange={(e) => setFilters({ ...filters, soloFavoritos: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: '#bd3a3f' }}
            />
            <span style={{ fontWeight: 'bold', color: '#333' }}>Ver mis favoritos</span>
          </label>
        </div>
    </aside>
  );
};

export default Sidebar;