import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { Link } from '@inertiajs/react';
import { ChevronLeft, Mail, Phone, User, Tag, MessageSquare } from 'lucide-react'; // Iconos modernos
import "../../css/detalleVenta.css";
import { router } from '@inertiajs/react';

const DetalleCompra = ({ compra, estados }: { compra: any, estados: any[] }) => {

    const handleEstadoChange = (nuevoEstadoId: string) => {
        router.patch(`/gestion/compras/${compra.id}/estado`, {
            estado_id: nuevoEstadoId
        }, {
            preserveScroll: true, 
        });
    };

   
    return (
        <MainLayout>
            <div className="detalle-wrapper">
                {/* Botón de retroceso minimalista */}
                <Link href="/gestion/compras" className="back-nav">
                    <ChevronLeft size={24} />
                    <span>Volver al listado</span>
                </Link>

                <div className="glass-card">
                    {/* Badge superior flotante */}
                    <div className="floating-header">
                        DETALLES DE LA CONSULTA #{compra.id}
                    </div>

                    <div className="content-grid">
                        {/* Sección Cliente */}
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

                        {/* Sección Vehículo */}
                        <div className="vehicle-showcase">
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
                                <p className="vehicle-price">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(compra.vehiculo?.precio)}
                                </p>
                            </div>

                            <div className="action-buttons">
                                <button className="btn-main-red">Contactar cliente</button>
                                <button className="btn-outline-red">Comprar vehículo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DetalleCompra;