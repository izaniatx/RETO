import MainLayout from "../layouts/MainLayout";
import CatalogoPage from "../components/componentes/CatalogoPage";

function catalogo() { 
    return (
        <div>
            <MainLayout > 
                <CatalogoPage />
            </MainLayout>
        </div>
    );
}

export default catalogo;