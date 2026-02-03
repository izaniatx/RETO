import React from 'react';
import MainLayout from "../layouts/MainLayout"; 
import { Link } from '@inertiajs/react';
import Graf from '@/components/componentes/graf';
import { usePage } from '@inertiajs/react';

const Ventas = () => {
    const { datosVentas } = usePage<any>().props;
    console.log("Datos del gráfico:", datosVentas);

    return (
        <MainLayout>
            <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
                
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

                {/* MAIN CONTENT */}
                <main className="flex-grow-1 p-4">
                    <div className="container-fluid p-0">
                        <div className="w-100 px-2">
                            {/* Pasamos los datos reales al componente Graf */}
                            <Graf data={datosVentas} />
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default Ventas;