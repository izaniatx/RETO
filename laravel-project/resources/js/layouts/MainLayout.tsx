import { ReactNode } from 'react';
import Header from '../components/componentes/Header';
import Footer from '../components/componentes/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, usePage } from '@inertiajs/react'; 
import { url } from 'inspector/promises';

interface MainLayoutProps {
    children: ReactNode;
}


function MainLayout({ children }: MainLayoutProps) {

    const { url } = usePage();

    var aux = "";

    if (url === "/admin/dashboard" || url === "/admin/usuarios" || url === "/inventario/coches") {
        aux = "#212529";
    } else  if (url === "/catalogo") {
        aux = "#f8f9fa";
    }

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: aux }}>
            
            <Header />
            <main className="container flex-grow-1" style={{ padding: "0px", width: "100vw", maxWidth: "100vw" }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
