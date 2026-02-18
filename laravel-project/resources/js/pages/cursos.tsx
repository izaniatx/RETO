import React, { useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import { Head, router } from '@inertiajs/react';

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
            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4">
                    
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-gray-900">Panel de Formación</h1>
                        <p className="text-gray-600 mt-2">Mejora tus habilidades en el concesionario</p>
                    </div>


                    <div className="flex justify-center gap-2 mb-10">
                        {categorias.map(cat => (
                            <button key={cat} onClick={() => setFiltro(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                                    filtro === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'
                                }`}>
                                {cat}
                            </button>
                        ))}
                    </div>

          
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cursosFiltrados.map((curso) => {
                            const yaInscrito = misCursosIds.includes(curso.id);
                            return (
                                <div key={curso.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition">
                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between mb-4">
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                                {curso.categoria}
                                            </span>
                                            <span className="text-xs text-gray-400">⏱ {curso.duracion_horas}h</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{curso.nombre}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{curso.descripcion}</p>
                                    </div>

                                    <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-gray-50">
                                        <span className="text-blue-500 font-bold text-xs">{curso.nivel}</span>
                                        <button 
                                            disabled={yaInscrito}
                                            onClick={() => handleAnyadir(curso.id)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                                                yaInscrito 
                                                ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                                                : 'bg-gray-900 text-white hover:bg-blue-600 shadow-md'
                                            }`}
                                        >
                                            {yaInscrito ? '✓ Ya inscrito' : 'Inscribirme'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}