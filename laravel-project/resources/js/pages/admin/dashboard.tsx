import React, { useState } from 'react';
import MainLayout from "../../layouts/MainLayout"; 
import { Link } from '@inertiajs/react';

const Dashboard = () => {
    const [cars, setCars] = useState([
        { id: 1, marca: 'Audi', modelo: 'A4', stock: 5, precio: '35.000€' },
        { id: 2, marca: 'BMW', modelo: 'Serie 3', stock: 2, precio: '42.000€' },
        { id: 3, marca: 'Mercedes', modelo: 'Clase C', stock: 0, precio: '45.000€' },
        { id: 4, marca: 'Volkswagen', modelo: 'Golf', stock: 8, precio: '28.000€' },
        { id: 5, marca: 'Honda', modelo: 'Civic', stock: 1, precio: '30.000€' },

    ]);

    return (
        <MainLayout>
            <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
                
                {/* BARRA LATERAL (SIDEBAR) */}
                <aside className="bg-dark text-white p-4 shadow" style={{ width: "250px" }}>
                    <h4 className="fw-bold mb-4 text-center border-bottom pb-3">Panel Admin</h4>
                    <nav className="nav flex-column gap-2">
                        <Link href="#" className="nav-link text-white bg-primary rounded px-3 py-2">
                            <i className="bi bi-speedometer2 me-2"></i> Inventario
                        </Link>
                        <Link href="#" className="nav-link text-white-50 px-3 py-2">
                            <i className="bi bi-people me-2"></i> Usuarios
                        </Link>
                        <Link href="#" className="nav-link text-white-50 px-3 py-2">
                            <i className="bi bi-chat-dots me-2"></i> Mensajes
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
                                    <h2 className="fw-bold m-0">24</h2>
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
                                            <th className="ps-4">Modelo</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
                                            <th className="text-end pe-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars.map((car) => (
                                            <tr key={car.id}>
                                                <td className="ps-4">
                                                    <span className="fw-bold">{car.marca}</span> 
                                                    <span className="text-muted ms-2">{car.modelo}</span>
                                                </td>
                                                <td>{car.precio}</td>
                                                <td>
                                                    {car.stock > 0 ? (
                                                        <span className="badge rounded-pill bg-success-subtle text-success">
                                                            {car.stock} disp.
                                                        </span>
                                                    ) : (
                                                        <span className="badge rounded-pill bg-danger-subtle text-danger">
                                                            Agotado
                                                        </span>
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
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default Dashboard;