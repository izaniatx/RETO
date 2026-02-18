import React, { useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import { Link } from '@inertiajs/react';
import { ChevronLeft, User, MessageSquare, Edit3, Save, X, Palette } from 'lucide-react'; 
import "../../css/detalleVenta.css";
import { router } from '@inertiajs/react';

const DetalleCompra = ({ compra, estados }: { compra: any, estados: any[] }) => {
    // NUEVO: Estado para edición
    const [editando, setEditando] = useState(false);
    const [formVehiculo, setFormVehiculo] = useState({
        color: compra.vehiculo?.color || '',
        precio: compra.vehiculo?.precio || 0
    });

    const handleEstadoChange = (nuevoEstadoId: string) => {
        router.patch(`/gestion/compras/${compra.id}/estado`, {
            estado_id: nuevoEstadoId
        }, {
            preserveScroll: true, 
        });
    };

    // NUEVO: Función para guardar cambios del vehículo
    const handleGuardarVehiculo = () => {
        router.patch(`/gestion/compras/${compra.id}/vehiculo`, formVehiculo, {
            onSuccess: () => setEditando(false),
            preserveScroll: true
        });
    };

    const handleComprarVehiculo = () => {
        if (confirm('¿Confirmas la compra de este vehículo? Pasará directamente al catálogo "En venta".')) {
            // Usamos router.patch o router.post según tengas definida la ruta
            router.patch(`/gestion/compras/${compra.id}/comprar`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    // Opcional: podrías redirigir manualmente si no lo hace el controlador
                    // router.visit('/gestion/compras');
                }
            });
        }
    };

    return (
        <MainLayout>
            <div className="detalle-wrapper">
                <Link href="/gestion/compras" className="back-nav">
                    <ChevronLeft size={24} />
                    <span>Volver al listado</span>
                </Link>

                <div className="glass-card">
                    <div className="floating-header">
                        DETALLES DE LA CONSULTA #{compra.id}
                    </div>

                    <div className="content-grid">
                        <div className="client-info">
                            <h4 className="section-title"><User size={18} /> Información del Cliente</h4>
                            <div className="data-row">
                                <span className="label">Nombre:</span>
                                <span className="value">{compra.user?.nombre} {compra.user?.apellido}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Teléfono:</span>
                                <span className="value">{compra.user?.telefono || '123456789'}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Email:</span>
                                <span className="value">{compra.user?.email}</span>
                            </div>

                            <div className="status-container">
                                <select 
                                    className={`status-pill pill-${compra.estado_id} select-custom`}
                                    value={compra.estado_id}
                                    onChange={(e) => handleEstadoChange(e.target.value)}
                                >
                                    {estados.map((est) => (
                                        <option key={est.id} value={est.id}>
                                            {est.estado}
                                        </option>
                                    ))}
                                </select>
                            </div>

                           <div className="message-area">
                                <label><MessageSquare size={16} /> Mensaje del cliente:</label>
                                <div className="message-bubble">
                                    {compra.mensaje?.mensaje}
                                </div>
                            </div>
                        </div>

                        <div className="vehicle-showcase">
                            {/* NUEVO: Botón de edición en la esquina */}
                                                    {/* CONTENEDOR DE EDICIÓN MEJORADO */}
                            <div className="edit-zone">
                                {!editando ? (
                                    <button onClick={() => setEditando(true)} className="btn-glass-edit">
                                        <div className="icon-circle">
                                            <Edit3 size={14} />
                                        </div>
                                        <span style={{color: 'black'}}>GESTIONAR VEHÍCULO</span>
                                    </button>
                                ) : (
                                    <div className="edit-actions-animated">
                                        <button onClick={handleGuardarVehiculo} className="btn-action-confirm">
                                            <Save size={16} />
                                            <span>GUARDAR CAMBIOS</span>
                                        </button>
                                        <button onClick={() => setEditando(false)} className="btn-action-cancel">
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="img-container">
                                <img 
                                    src={compra.vehiculo?.imagen ? `/storage/${compra.vehiculo.imagen}` : '/img/placeholder.png'} 
                                    alt="Vehículo" 
                                />
                            </div>
                            <div className="vehicle-details">
                                <h2 className="vehicle-name">
                                    {compra.vehiculo?.marca?.marca} {compra.vehiculo?.modelo?.modelo}
                                </h2>
                                
                                {/* NUEVO: Mostrar COLOR (y su input si edita) */}
                                <div className="data-row" style={{ justifyContent: 'center', marginBottom: '10px' }}>
                                    <span className="label"><Palette size={14} /> Color:</span>
                                    {editando ? (
                                        <input 
                                            type="text" 
                                            className="input-detalle-custom"
                                            value={formVehiculo.color}
                                            onChange={e => setFormVehiculo({...formVehiculo, color: e.target.value})}
                                        />
                                    ) : (
                                        <span className="value" style={{ marginLeft: '8px' }}>{compra.vehiculo?.color}</span>
                                    )}
                                </div>

                                {/* PRECIO (y su input si edita) */}
                                {editando ? (
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <input 
                                            type="number" 
                                            className="input-detalle-custom price-input"
                                            value={formVehiculo.precio}
                                            onChange={e => setFormVehiculo({...formVehiculo, precio: Number(e.target.value)})}
                                        />
                                    </div>
                                ) : (
                                    <p className="vehicle-price">
                                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(compra.vehiculo?.precio)}
                                    </p>
                                )}
                            </div>

                            <div className="action-buttons">
                                <button className="btn-main-red">Contactar cliente</button>
                                <button 
                                    className="btn-outline-red"
                                    onClick={handleComprarVehiculo}
                                >
                                    Comprar vehículo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DetalleCompra;