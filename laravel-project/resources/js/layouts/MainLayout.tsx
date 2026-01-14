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

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: url === "/admin/dashboard" || url === "/admin/usuarios" ? "#212529" : "transparent" }}>
            
            <Header />
            <main className="container flex-grow-1" style={{ padding: "0px", width: "100vw", maxWidth: "100vw" }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
