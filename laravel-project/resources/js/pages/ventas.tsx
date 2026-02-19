import React from 'react';
import MainLayout from "../layouts/MainLayout"; 
import { Link } from '@inertiajs/react';
import Graf from '@/components/componentes/graf';
import { usePage } from '@inertiajs/react';

const Ventas = () => {
    const { datosVentas, datosUsuarios, datosAltas } = usePage<any>().props;
    console.log("Datos del gráfico:", datosVentas);

    return (
        <MainLayout>
            <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
                
              
            <aside className="bg-dark text-white p-4 shadow" style={{ width: "250px" }}>
                    <nav className="nav flex-column gap-2">
                        <Link href="/inventario/coches" className="nav-link  nav-inventario text-white  rounded px-3 py-2">
                            <i className="bi bi-speedometer2 me-2"></i>Inventario
                        </Link>
                        <Link href="/inventario/equipamientos" className="nav-link nav-inventario text-white rounded px-3 py-2">
                            <i className="bi bi-speedometer2 "></i>Equipamiento opcional
                        </Link>
                        <Link href="/inventario/ventas" className="nav-link inv nav-inventario text-white rounded px-3 py-2">
                            <i className="bi bi-speedometer2 "></i>Ventas
                        </Link>
                    </nav>  
                </aside>

              
                <main className="flex-grow-1 p-4">
                    <div className="container-fluid">
                        <h2 className="mb-4">Panel de Estadísticas</h2>
                        
                        <div className="row">
                           
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow-sm border-0 h-100">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">Ventas Totales</h5>
                                        <p className="text-muted small">Coches vendidos por mes</p>
                                        <Graf data={datosVentas} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-4">
                                <div className="card shadow-sm border-0 h-100">
                                    <div className="card-body">
                                        <h5 className="card-title text-success">Altas de Inventario</h5>
                                        <p className="text-muted small">Nuevos coches registrados</p>
                                        <Graf data={datosAltas} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mb-4">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body">
                                        <h5 className="card-title text-info">Crecimiento de Usuarios</h5>
                                        <p className="text-muted small">Nuevos registros en la plataforma</p>
                                        <Graf data={datosUsuarios} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};



export default Ventas;