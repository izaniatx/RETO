import React from 'react';

export default function SalesChart() {
    // 1. TUS DATOS (Pronto vendrán de Laravel)
    const data = [10, 25, 18, 40, 35, 60, 55];
    const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    // 2. CONFIGURACIÓN
    const height = 200;
    const width = 600;
    const maxVal = Math.max(...data);

    // 3. MATEMÁTICAS SIMPLES (Convertir datos a coordenadas SVG)
    // Coordenadas X: Espaciadas uniformemente
    // Coordenadas Y: Invertidas (SVG dibuja de arriba a abajo)
    const points = data.map((val, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (val / maxVal) * height * 0.8; // El 0.8 deja un margen arriba
        return `${x},${y}`;
    }).join(' ');

    // Coordenadas para el relleno (baja hasta el suelo del gráfico)
    const fillPoints = `0,${height} ${points} ${width},${height}`;

    return (
        <div className="w-full font-sans">
            {/* Contenedor del Gráfico */}
            <div className="relative w-full h-64 bg-black rounded-lg p-4 border border-neutral-800 shadow-2xl overflow-hidden">
                
                {/* Título Minimalista */}
                <div className="absolute top-4 left-4 z-10">
                    <h3 className="text-white text-sm font-light uppercase tracking-widest">Ventas Semanales</h3>
                    <p className="text-red-600 font-bold text-2xl mt-1">
                        {data[data.length - 1]} <span className="text-xs text-neutral-500 font-normal">coches</span>
                    </p>
                </div>

                {/* El Gráfico SVG */}
                <svg 
                    viewBox={`0 0 ${width} ${height}`} 
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none" // Para que se estire a todo lo ancho
                >
                    <defs>
                        {/* Degradado Rojo Estilo Auro */}
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Líneas de guía horizontales (opcional, muy sutiles) */}
                    <line x1="0" y1={height} x2={width} y2={height} stroke="#333" strokeWidth="1" />
                    <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="#333" strokeWidth="1" strokeDasharray="5,5" opacity="0.3"/>

                    {/* El Relleno (Area) */}
                    <polygon points={fillPoints} fill="url(#gradient)" />

                    {/* La Línea Principal */}
                    <polyline 
                        points={points} 
                        fill="none" 
                        stroke="#DC2626" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" // Efecto neón
                    />

                    {/* Puntos Interactivos (Círculos) */}
                    {data.map((val, index) => {
                        const x = (index / (data.length - 1)) * width;
                        const y = height - (val / maxVal) * height * 0.8;
                        return (
                            <g key={index} className="group">
                                {/* Círculo rojo */}
                                <circle cx={x} cy={y} r="5" fill="#000" stroke="#DC2626" strokeWidth="3" className="transition-all duration-300 group-hover:r-8 cursor-pointer" />
                                
                                {/* Etiqueta flotante (Tooltip puro CSS) */}
                                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <rect x={x - 20} y={y - 45} width="40" height="25" rx="4" fill="#DC2626" />
                                    <text x={x} y={y - 28} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{val}</text>
                                    <text x={x} y={height + 20} textAnchor="middle" fill="#666" fontSize="12">{labels[index]}</text>
                                </g>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}


