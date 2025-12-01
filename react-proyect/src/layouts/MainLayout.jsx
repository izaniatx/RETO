import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function MainLayout({ children }) {
    return (
        <div className="d-flex flex-column min-vh-100">

            <Header />

            <main className="container flex-grow-1 py-4">
                {children}
            </main>

            <Footer />

        </div>
    );
}

export default MainLayout;