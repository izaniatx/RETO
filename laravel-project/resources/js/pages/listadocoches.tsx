import React, { useState } from 'react';
import MainLayout from "../layouts/MainLayout"; 
import { Link, usePage, } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

import '../../css/dashboard.css';    
import SalesChart from '@/components/componentes/SalesChart';

    const ListadoCoches = () => {

        interface Marca {
        id: number;
        marca: string;
    }

    interface Carroceria {
        id: number;
        carroceria: string;
    }

    interface Modelo {
        id: number;
        modelo: string;
    }

    interface Vehiculo {
        id: number;
        color?: string;
        precio: number; // usar number en lugar de DoubleRange
        fecha_alta?: string; // o Date si lo parseas
        fecha_venta?: string | null; // puede ser null si no está vendido
        imagen?: string;
        marca?: Marca;
        carroceria?: Carroceria;
        modelo?: Modelo;
        isDeleted: boolean;
    }

interface PaginatedVehiculos {
    data: Vehiculo[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}


    const { vehiculos, totalVehiculos } = usePage<{
        vehiculos: PaginatedVehiculos;
        totalVehiculos: number;
    }>().props;

    const goToPage = (page: number) => {
        Inertia.get('/listado/coches', { page }, { preserveState: true });
    };

    return (
        <MainLayout>
            <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
                
                {/* BARRA LATERAL (SIDEBAR) */}
                <aside className="bg-dark text-white p-4 shadow" style={{ width: "250px" }}>
                    
                    <nav className="nav flex-column gap-2 " >
                        <Link href="#" className="nav-link nav-inventario text-white bg-primary rounded px-3 py-2">
                            <i className="bi bi-speedometer2 me-2"></i> Inventario
                        </Link>
                        
                    </nav>
                </aside>

                {/* AREA DE TRABAJO */}
                <main className="flex-grow-1 p-4">
                    <div className="container-fluid">
                        <header className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="h4 fw-bold text-uppercase m-0">Gestión de Stock</h2>
                            <button className="btn btn-dark shadow-sm px-4">
                                + Añadir Vehículo
                            </button>
                        </header>



                        {/* STATS QUICK VIEW */}
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
                                    <h2 className="fw-bold m-0 text-warning">3</h2>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm text-center p-3 border-start border-success border-4">
                                    <span className="text-muted small">Ventas Mes</span>
                                    <h2 className="fw-bold m-0 text-success">12</h2>
                                </div>
                            </div>
                        </div>

                        {/* TABLA PRINCIPAL */}
                        <section className="card border-0 shadow-sm overflow-hidden">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th className="ps-4">Marca</th>
                                            <th className="ps-4">Modelo</th>
                                            <th className="ps-4">Carroceria</th>
                                            <th className="ps-4">Color</th>
                                            <th className="ps-4">Precio</th>
                                            <th className="ps-4">Fecha alta</th>
                                            <th className="ps-4">Fecha venta</th>
                                            <th className="ps-4">Eliminado</th>
                                            <th className="text-end pe-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehiculos.data.map((car) => (
                                            <tr key={car.id}>
                                                <td>{car.marca?.marca ?? '-'}</td>
                                                <td>{car.modelo?.modelo ?? '-'}</td>
                                                <td>{car.carroceria?.carroceria ?? '-'}</td>
                                                <td>{car.color ?? '-'}</td>
                                                <td>{car.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
                                                <td>{car.fecha_alta ?? '-'}</td>
                                                <td>{car.fecha_venta ?? '-'}</td>
                                                <td>
                                                    {car.fecha_venta ? (
                                                        <span className="badge rounded-pill bg-danger-subtle text-danger">Agotado</span>
                                                    ) : (
                                                        <span className="badge rounded-pill bg-success-subtle text-success">Disponible</span>
                                                    )}
                                                </td>
                                                <td className="text-end pe-4">
                                                    <button className="btn btn-sm btn-light border me-2">Editar</button>
                                                    <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}

                                    
                                    </tbody>

                                </table>
                            </div>
                        </section>

                  <div className="d-flex justify-content-center mt-4 gap-2">
                        <button
                            className="btn btn-sm btn-outline-primary"
                            disabled={vehiculos.current_page === 1}
                            onClick={() => goToPage(vehiculos.current_page - 1)}
                        >
                            Anterior
                        </button>
                        <span className="align-self-center">
                            Página {vehiculos.current_page} de {vehiculos.last_page}
                        </span>
                        <button
                            className="btn btn-sm btn-outline-primary"
                            disabled={vehiculos.current_page === vehiculos.last_page}
                            onClick={() => goToPage(vehiculos.current_page + 1)}
                        >
                            Siguiente
                        </button>
                    </div>




                        <div className="max-w-3xl mx-auto mt-10">
                            <SalesChart />
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default ListadoCoches;