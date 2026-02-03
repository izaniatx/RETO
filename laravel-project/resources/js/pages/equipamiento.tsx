import React, { useEffect, useState } from 'react';
import MainLayout from "../layouts/MainLayout"; 
import { Link, usePage, router } from '@inertiajs/react';

import '../../css/dashboard.css';    
import SalesChart from '@/components/componentes/SalesChart';

const Equipamientos = () => {

   

    interface VehiculoRelacionado {
        id: number;
        color: string;
        marca?: { marca: string }; // Relaciones anidadas
        modelo?: { modelo: string };
    }
    
    interface Equipamiento {
        id: number;
        equipamiento: string;
        created_at?: string;
        // Añadimos la relación que falta:
        vehiculos: VehiculoRelacionado[]; 
    }
    // Props de Inertia (Asegúrate de que el controlador envíe 'equipamiento')
    const { equipamiento, totalVehiculos, ventasMes, cochesSinStock } = usePage<{
        equipamiento: Equipamiento[];
        totalVehiculos: number;
        ventasMes: number;
        cochesSinStock: number;
    }>().props;

    // Estado local para la tabla
    const [listaEquipos, setListaEquipos] = useState<Equipamiento[]>(equipamiento || []);

    useEffect(() => {
        setListaEquipos(equipamiento || []);
    }, [equipamiento]);

    // Función para eliminar (puedes implementarla luego en el controlador)
    const handleEliminar = (id: number) => {
        if (!confirm('¿Seguro que quieres eliminar este equipamiento?')) return;
        // Lógica de borrado aquí
        alert('Función de borrado para ID: ' + id);
    };

    return (
        <MainLayout>
            <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
                
                {/* SIDEBAR (IDÉNTICO AL TUYO) */}
                {/* SIDEBAR */}
                <aside className="bg-dark text-white p-4 shadow" style={{ width: "250px" }}>
                    <nav className="nav flex-column gap-2">
                        <Link href="/inventario/coches" className="nav-link inv nav-inventario text-white bg-primary rounded px-3 py-2">
                            <i className="bi bi-speedometer2 me-2"></i>Inventario
                        </Link>
                        <Link href="/inventario/equipamientos" className="nav-link nav-inventario text-white rounded px-3 py-2">
                            <i className="bi bi-speedometer2 "></i>Equipamiento opcional
                        </Link>
                        <Link href="/inventario/ventas" className="nav-link nav-inventario text-white rounded px-3 py-2">
                            <i className="bi bi-speedometer2 "></i>Ventas
                        </Link>
                    </nav>  
                </aside>

                {/* MAIN */}
                <main className="flex-grow-1 p-4">
                    <div className="container-fluid">
                        <header className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="h4 fw-bold text-uppercase m-0">Gestión de Equipamientos</h2>
                            <button className="btn btn-dark shadow-sm px-4" onClick={() => alert('Próximamente: Modal añadir')}>
                                    + Añadir Equipamiento
                            </button>
                        </header>

                        {/* STATS QUICK VIEW (MANTIENE TUS STATS) */}
                        
                        {/* TABLA DE EQUIPAMIENTOS */}
                        <section className="card border-0 shadow-sm overflow-hidden">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            
                                            <th>Nombre del Equipamiento</th>
                                            <th>Vehiculos Asociados</th>
                                            <th className="text-end pe-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {listaEquipos.length > 0 ? (
                                        listaEquipos.map(item => (
                                            <tr key={item.id}>
                                               
                                                <td className="fw-bold">{item.equipamiento}</td>
                                                
                                                {/* COLUMNA DE VEHÍCULOS ASOCIADOS */}
                                                <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-primary rounded-pill">
                                                        {item.vehiculos?.length || 0} vehículos
                                                    </span>
                                                    {item.vehiculos?.length > 0 && (
                                                        <button className="btn btn-sm btn-link p-0 text-decoration-none" title="Ver lista">
                                                            <i className="bi bi-eye"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>

                                                
                                                
                                                <td className="text-end pe-4">
                                                    <button className="btn btn-sm btn-light border me-2">Editar</button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(item.id)}>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4 text-muted">No hay datos</td>
                                        </tr>
                                    )}
                                </tbody>
                                </table>
                            </div>
                        </section>

                        
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default Equipamientos;