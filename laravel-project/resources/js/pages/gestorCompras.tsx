import React, { useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import "../../css/gestorVentas.css";
import { Link } from '@inertiajs/react';

// --- INTERFACES ---
interface Compra {
    id: number;
    tipo: string;
    vehiculo_id: number;
    estado_id: number;
    vehiculo?: {
        precio: number;
        imagen: string;
        marca?: { marca: string };
        modelo?: { modelo: string };
    };
    estado?: {
        estado: string;
    };
}

interface Props {
    compras: Compra[];
}

function GestorCompras({ compras = [] }: Props) {
    // 1. ESTADOS PARA FILTROS
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [busqueda, setBusqueda] = useState('');

    // 2. LÓGICA DE FILTRADO (Segura contra undefined)
    const comprasFiltradas = compras.filter((v) => {
        const esCompra = v.tipo === 'compra';
        
        // Filtro por Estado
        const coincideEstado = filtroEstado === 'todos' || v.estado?.estado === filtroEstado;
        
        // Filtro por Buscador (Marca o Modelo)
        const textoBusqueda = busqueda.toLowerCase();
        const nombreCoche = `${v.vehiculo?.marca?.marca} ${v.vehiculo?.modelo?.modelo}`.toLowerCase();
        const coincideTexto = nombreCoche.includes(textoBusqueda);

        return esCompra && coincideEstado && coincideTexto;
    });

    // 3. GENERAR LISTA DE ESTADOS ÚNICOS (Solución al error 'unknown')
    // Usamos un Type Guard (e is string) para asegurar el tipo a TypeScript
    const estadosUnicos = Array.from(
        new Set(compras.map(v => v.estado?.estado).filter((e): e is string => !!e))
    );

    return (
        <MainLayout>
            <div className="container mt-5">
                <div className="header-gestion d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                    <h2 className="mb-0 fw-bold">Gestión de Compras</h2>
                    
                    <div className="d-flex gap-2 flex-wrap">
                        {/* BUSCADOR POR TEXTO */}
                        <input 
                            type="text"
                            className="form-control buscador-ventas"
                            placeholder="Buscar por marca o modelo..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />

                        {/* SELECTOR DE ESTADO */}
                        <select 
                            className="form-select w-auto select-filtro" 
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <option value="todos">Todos los estados</option>
                            {estadosUnicos.map((estado: string) => (
                                <option key={estado} value={estado}>
                                    {estado}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <hr />

                {/* LISTADO DE CARDS */}
                <div className="row mt-4">
                    {comprasFiltradas.length > 0 ? (
                        comprasFiltradas.map((compra: Compra) => (
                            <div className="col-md-6 col-lg-4 mb-4" key={compra.id}>
                                <div className="card h-100 shadow-sm border-0 card-venta">
                                    <div className="position-relative">
                                        <img 
                                            src={compra.vehiculo?.imagen ? `/storage/${compra.vehiculo.imagen}` : '/img/placeholder.png'} 
                                            className="card-img-top image-gestion" 
                                            alt="Vehículo" 
                                        />
                                        <span className={`badge-estado-float estado-${compra.estado_id}`}>
                                            {compra.estado?.estado}
                                        </span>
                                    </div>
                                    
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">
                                            {compra.vehiculo?.marca?.marca} {compra.vehiculo?.modelo?.modelo}
                                        </h5>
                                        <p className="price-text-gestion">
                                            {new Intl.NumberFormat('es-ES', { 
                                                style: 'currency', 
                                                currency: 'EUR' 
                                            }).format(compra.vehiculo?.precio || 0)}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span className="text-muted small">ID Reserva: #{compra.id}</span>
                                            <Link 
                                                href={`/gestion/compras/${compra.id}`} 
                                                className="btn btn-sm btn-outline-dark"
                                            >
                                                Detalles
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <div className="no-results-box">
                                <p className="text-muted fs-5">No se han encontrado resultados para tu búsqueda.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default GestorCompras;