import React, { useEffect, useState } from 'react';
import MainLayout from "../layouts/MainLayout"; 
import { Link, usePage, router } from '@inertiajs/react';

import '../../css/dashboard.css';    
import SalesChart from '@/components/componentes/SalesChart';
import ModalCoche from '../components/componentes/ModalCoche';

const ListadoCoches = () => {
    // ... (Interfaces se mantienen igual)
    interface Marca { id: number; marca: string; }
    interface Carroceria { id: number; carroceria: string; }
    interface Modelo { id: number; modelo: string; }
    interface Equipamiento { id: number; equipamiento: string; }

    interface Vehiculo {
        id: number;
        color?: string;
        precio: number;
        fecha_alta?: string;
        fecha_venta?: string | null;
        imagen?: string;
        marca?: Marca;
        carroceria?: Carroceria;
        modelo?: Modelo;
        equipamientos?: Equipamiento[];
        isDeleted: boolean;
    }

    interface PaginatedVehiculos {
        data: Vehiculo[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    }

    const { vehiculos, totalVehiculos, ventasMes, cochesSinStock, marcas, modelos, carrocerias, todosEquipamientos } = usePage<{
        vehiculos: PaginatedVehiculos;
        totalVehiculos: number;
        ventasMes: number;
        cochesSinStock: number;
        marcas: Marca[];
        modelos: Modelo[];
        carrocerias: Carroceria[];
        todosEquipamientos: Equipamiento[];
    }>().props;

    const [coches, setCoches] = useState<Vehiculo[]>(vehiculos.data);
    const [showModal, setShowModal] = useState(false);
    const [cocheEditar, setCocheEditar] = useState<Vehiculo | null>(null);

    useEffect(() => {
        setCoches(vehiculos.data);
    }, [vehiculos.data]);

    const goToPage = (page: number) => {
        router.get('/inventario/coches', { page }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleEliminar = (id: number) => {
        if (!confirm('¿Seguro que quieres eliminar este coche?')) return;
        router.post('/inventario/coches/delete', { id }, {
            onSuccess: () => alert('Coche eliminado correctamente'),
        });
    };

    const handleActivar = (id: number) => {
        if (!confirm('¿Seguro que quieres activar este coche?')) return;
        router.post('/inventario/coches/active', { id }, {
            onSuccess: () => alert('Coche activado correctamente'),
        });
    };

    const cocheParaEditar = cocheEditar
    ? {
        id: cocheEditar.id,
        marca_id: cocheEditar.marca?.id ?? 0,
        modelo_id: cocheEditar.modelo?.id ?? 0,
        carroceria_id: cocheEditar.carroceria?.id ?? 0,
        color: cocheEditar.color ?? '',
        precio: cocheEditar.precio,
        equipamientos: cocheEditar.equipamientos?.map(e => e.id) ?? [],
        }
    : undefined;

    return (
        <MainLayout>
            <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
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

                <main className="flex-grow-1 p-4">
                    <div className="container-fluid">
                        <header className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="h4 fw-bold text-uppercase m-0">Gestión de Stock</h2>
                            <button className="btn btn-dark shadow-sm px-4" onClick={() => { setCocheEditar(null); setShowModal(true); }}>
                                + Añadir Vehículo
                            </button>
                        </header>

                        <div className="row g-3 mb-4">
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm text-center p-3">
                                    <span className="text-muted small">Total en Catálogo</span>
                                    <h2 className="fw-bold m-0">{totalVehiculos}</h2>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm text-center p-3 border-start border-warning border-4">
                                    <span className="text-muted small">Coches sin Stock</span>
                                    <h2 className="fw-bold m-0 text-warning">{cochesSinStock}</h2>
                                </div>
                            </div>
                           <div className="col-md-4">
                                <div className="card border-0 shadow-sm text-center p-3 border-start border-success border-4">
                                    <span className="text-muted small">Ventas Mes</span>
                                    <h2 className="fw-bold m-0 text-success">{ventasMes}</h2>
                                </div>
                            </div>
                        </div>

                        <section className="card border-0 shadow-sm overflow-hidden">
                            <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                <th>Vehículo</th>
                                <th>Carrocería</th>
                                <th>Color</th>
                                <th>Precio</th>
                                <th>Alta</th>
                                <th>Venta</th>
                                <th>Equipamiento</th>
                                <th>Estado</th>
                                <th className="text-end pe-4">Acciones</th>
                                </tr>
                            </thead>
                                    <tbody>
                                        {coches.map((car) => (
                                        <tr key={car.id} className={car.isDeleted ? 'table-danger opacity-75' : ''}>
                                            <td>
                                            <div className="fw-bold">{car.marca?.marca} {car.modelo?.modelo}</div>
                                           
                                            </td>
                                            <td>{car.carroceria?.carroceria ?? '-'}</td>
                                            <td>{car.color ?? '-'}</td>
                                            <td>
                                                {(car.precio ?? 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                                            </td>
                                            {/* Campo Fecha Alta */}
                                            <td className="small">
                                            {car.fecha_alta ? car.fecha_alta.split(' ')[0] : '-'}
                                            </td>
                                            {/* Campo Fecha Venta */}
                                            <td className="small">
                                            {car.fecha_venta ? car.fecha_venta.split(' ')[0] : '-'}
                                            </td>
                                            <td>
                                            <span className="badge bg-info-subtle text-info rounded-pill px-3">
                                                {car.equipamientos?.length || 0} extras
                                            </span>
                                            </td>
                                            <td>
                                            {car.isDeleted ? (
                                                <span className="badge rounded-pill bg-danger text-white">Eliminado</span>
                                            ) : (
                                                <span className="badge rounded-pill bg-success text-white">Activo</span>
                                            )}
                                            </td>
                                            <td className="text-end pe-4">
                                            <button
                                                className="btn btn-sm btn-light border me-2"
                                                onClick={() => {
                                                setCocheEditar(car);
                                                setShowModal(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            {car.isDeleted ? (
                                                <button className="btn btn-sm btn-success" onClick={() => handleActivar(car.id)}>
                                                Activar
                                                </button>
                                            ) : (
                                                <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleEliminar(car.id)}
                                                >
                                                Eliminar
                                                </button>
                                            )}
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                            </div>
                        </section>

                        <div className="d-flex justify-content-center mt-4 gap-2">
                            <button className="btn btn-sm btn-outline-dark px-3" disabled={vehiculos.current_page === 1} onClick={() => goToPage(vehiculos.current_page - 1)}>Anterior</button>
                            <span className="align-self-center small fw-bold mx-2">Página {vehiculos.current_page} de {vehiculos.last_page}</span>
                            <button className="btn btn-sm btn-outline-dark px-3" disabled={vehiculos.current_page === vehiculos.last_page} onClick={() => goToPage(vehiculos.current_page + 1)}>Siguiente</button>
                        </div>
                    </div>

                    <ModalCoche 
                        showModal={showModal} 
                        setShowModal={setShowModal} 
                        marcas={marcas} 
                        modelos={modelos} 
                        carrocerias={carrocerias} 
                        todosEquipamientos={todosEquipamientos} 
                        cocheEditar={cocheParaEditar} 
                    />
                </main>
            </div>
        </MainLayout>
    );
};

export default ListadoCoches;