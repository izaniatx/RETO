import React, { useEffect, useState } from 'react';
import MainLayout from "../layouts/MainLayout"; 
import { Link, usePage, router } from '@inertiajs/react';

import '../../css/dashboard.css';    
import ModalEquipamiento from '../components/componentes/modalEquipamiento';

const Equipamientos = () => {

    interface VehiculoRelacionado {
        id: number;
        color: string;
        marca?: { marca: string }; 
        modelo?: { modelo: string };
    }
    
    interface Equipamiento {
        id: number;
        equipamiento: string;
        isDeleted: boolean; // Añadimos este campo para la lógica visual
        vehiculos: VehiculoRelacionado[]; 
    }

    const { equipamiento } = usePage<{
        equipamiento: Equipamiento[];
    }>().props;

    const [listaEquipos, setListaEquipos] = useState<Equipamiento[]>(equipamiento || []);
    const [showModal, setShowModal] = useState(false);
    const [equipoParaEditar, setEquipoParaEditar] = useState<Equipamiento | null>(null);

    useEffect(() => {
        setListaEquipos(equipamiento || []);
    }, [equipamiento]);

    // Función para ELIMINAR (Llama a tu método deleteEquipamiento)
    const handleEliminar = (id: number) => {
        if (!confirm('¿Seguro que quieres desactivar este equipamiento?')) return;
        router.post('/inventario/equipamientos/delete', { id }, {
            onSuccess: () => alert('Equipamiento desactivado'),
        });
    };

    // Función para ACTIVAR (Llama a tu método activeEquipamiento)
    const handleActivar = (id: number) => {
        router.post('/inventario/equipamiento/active', { id }, {
            onSuccess: () => alert('Equipamiento activado'),
        });
    };

    const handleNuevo = () => {
        setEquipoParaEditar(null);
        setShowModal(true);
    };

    const handleEditar = (item: Equipamiento) => {
        setEquipoParaEditar(item);
        setShowModal(true);
    };

    return (
        <MainLayout>
            <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
                
                <aside className="bg-dark text-white p-4 shadow" style={{ width: "250px" }}>
                    <nav className="nav flex-column gap-2">
                        <Link href="/inventario/coches" className="nav-link nav-inventario text-white rounded px-3 py-2">
                            <i className="bi bi-car-front me-2"></i>Inventario
                        </Link>
                        <Link href="/inventario/equipamientos" className="nav-link inv nav-inventario text-white bg-primary rounded px-3 py-2">
                            <i className="bi  bi-tools me-2"></i>Equipamiento opcional
                        </Link>
                        <Link href="/inventario/ventas" className="nav-link nav-inventario text-white rounded px-3 py-2">
                            <i className="bi bi-graph-up-arrow me-2"></i>Ventas
                        </Link>
                    </nav>  
                </aside>

                <main className="flex-grow-1 p-4">
                    <div className="container-fluid">
                        <header className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="h4 fw-bold text-uppercase m-0">Gestión de Equipamientos</h2>
                            <button className="btn btn-dark shadow-sm px-4" onClick={handleNuevo}>
                                    + Añadir Equipamiento
                            </button>
                        </header>
                        
                        <section className="card border-0 shadow-sm overflow-hidden">
                            <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
    <thead className="table-dark">
        <tr>
            <th>Nombre del Equipamiento</th>
            <th>Estado</th>
            <th>Vehículos Asociados</th>
            <th className="text-end pe-4">Acciones</th>
        </tr>
    </thead>
    <tbody>
        {listaEquipos.length > 0 ? (
            listaEquipos.map(item => (
                <tr key={item.id} className={item.isDeleted ? 'table-danger opacity-75' : ''}>
                    <td className="fw-bold">{item.equipamiento}</td>
                    <td>
                        {item.isDeleted 
                            ? <span className="badge bg-danger">Inactivo</span> 
                            : <span className="badge bg-success">Activo</span>}
                    </td>
                    <td>
                        <span className="badge bg-primary rounded-pill">
                            {item.vehiculos?.length || 0} vehículos
                        </span>
                    </td>
                    <td className="text-end pe-4">
                        <button 
                            className="btn btn-sm btn-light border me-2"
                            onClick={() => handleEditar(item)}
                        >
                            Editar
                        </button>
                        {item.isDeleted ? (
                            <button className="btn btn-sm btn-success" onClick={() => handleActivar(item.id)}>
                                Activar
                            </button>
                        ) : (
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(item.id)}>
                                Desactivar
                            </button>
                        )}
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={4} className="text-center py-4 text-muted">No hay datos</td>
            </tr>
        )}
    </tbody>
</table>
                            </div>
                        </section>
                    </div>

                    <ModalEquipamiento 
                        showModal={showModal}
                        setShowModal={setShowModal}
                        equipamientoEditar={equipoParaEditar}
                    />
                </main>
            </div>
        </MainLayout>
    );
};

export default Equipamientos;