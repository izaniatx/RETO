import React, { useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import { Head, router } from '@inertiajs/react';
import '../../css/cursos.css';

interface Curso {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: 'Ventas' | 'Compras' | 'Administración';
    nivel: string;
    duracion_horas: number;
}

interface Props {
    cursos: Curso[];
    misCursosIds: number[];
}

export default function Cursos({ cursos, misCursosIds }: Props) {
    const [filtro, setFiltro] = useState('Todos');
    const categorias = ['Todos', 'Ventas', 'Compras', 'Administración'];

    const cursosFiltrados = filtro === 'Todos' 
        ? cursos 
        : cursos.filter(c => c.categoria === filtro);

    const handleAnyadir = (cursoId: number) => {
        router.post('/cursos/anyadir', { curso_id: cursoId }, {
            preserveScroll: true,
            onSuccess: () => alert('¡Inscrito con éxito!')
        });
    };

    return (
        <MainLayout>
            <Head title="Cursos de Formación" />
            <div className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="container">
                    
               
                    <div className="text-center mb-5">
                        <h1 className="display-5 fw-bold text-dark">Panel de Formación</h1>
                        <p className="text-muted">Mejora tus habilidades en el concesionario</p>
                    </div>

                  
                    <div className="d-flex justify-content-center gap-2 mb-5">
                        {categorias.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setFiltro(cat)}
                                className={`btn rounded-pill px-4 fw-bold shadow-sm transition-all ${
                                    filtro === cat ? 'btn-primary c-elegido' : 'btn-white c-no-elegido bg-white text-secondary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

             
                    <div className="row g-4">
                        {cursosFiltrados.map((curso) => {
                            const yaInscrito = misCursosIds.includes(curso.id);
                            return (
                                <div key={curso.id} className="col-12 col-md-6 col-lg-4">
                                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                        <div className="card-body c-card-body p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="badge bg-primary-subtle c-category text-primary border border-primary-subtle text-uppercase px-2 py-1" style={{ fontSize: '0.7rem' }}>
                                                    {curso.categoria}
                                                </span>
                                                <small className="text-muted">⏱ {curso.duracion_horas}h</small>
                                            </div>
                                            
                                            <h5 className="card-title fw-bold text-dark mb-3">{curso.nombre}</h5>
                                            <p className="card-text text-muted small" style={{ lineHeight: '1.6' }}>
                                                {curso.descripcion}
                                            </p>
                                        </div>

                                        <div className="card-footer bg-white border-top-0 p-4 pt-0 d-flex align-items-center justify-content-between">
                                            <span className="text-primary c-nivel fw-bold small">{curso.nivel}</span>
                                            <button 
                                                disabled={yaInscrito}
                                                onClick={() => handleAnyadir(curso.id)}
                                                className={`b-insc btn btn-sm rounded-3 px-3 fw-bold ${
                                                    yaInscrito 
                                                    ? 'btn-success disabled opacity-75' 
                                                    : 'btn-dark '
                                                }`}
                                            >
                                                {yaInscrito ? '✓ Ya inscrito' : 'Inscribirme'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

          
            <style>{`
                .hover-blue:hover {
                    background-color: #0d6efd !important;
                    border-color: #0d6efd !important;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
            `}</style>
        </MainLayout>
    );
}