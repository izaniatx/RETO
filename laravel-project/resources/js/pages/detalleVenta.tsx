import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { Link } from '@inertiajs/react';
import { ChevronLeft, Mail, Phone, User, Tag, MessageSquare } from 'lucide-react'; // Iconos modernos
import "../../css/detalleVenta.css";

const DetalleVenta = ({ venta }: { venta: any }) => {
    return (
        <MainLayout>
            <div className="detalle-wrapper">
                {/* Botón de retroceso minimalista */}
                <Link href="/gestion/ventas" className="back-nav">
                    <ChevronLeft size={24} />
                    <span>Volver al listado</span>
                </Link>

                <div className="glass-card">
                    {/* Badge superior flotante */}
                    <div className="floating-header">
                        DETALLES DE LA CONSULTA #{venta.id}
                    </div>

                    <div className="content-grid">
                        {/* Sección Cliente */}
                        <div className="client-info">
                            <h4 className="section-title"><User size={18} /> Información del Cliente</h4>
                            <div className="data-row">
                                <span className="label">Nombre:</span>
                                <span className="value">{venta.user?.nombre} {venta.user?.apellido}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Teléfono:</span>
                                <span className="value">{venta.user?.telefono || '123456789'}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Email:</span>
                                <span className="value">{venta.user?.email}</span>
                            </div>

                            <div className="status-container">
                                <span className={`status-pill pill-${venta.estado_id}`}>
                                    {venta.estado?.estado || 'NUEVO'}
                                </span>
                                <button className="icon-btn"><Mail size={20} /></button>
                            </div>

                            <div className="message-area">
                                <label><MessageSquare size={16} /> Mensaje del cliente:</label>
                                <div className="message-bubble">
                                    {venta.mensaje?.mensaje}
                                </div>
                            </div>
                        </div>

                        {/* Sección Vehículo */}
                        <div className="vehicle-showcase">
                            <div className="img-container">
                                <img 
                                    src={venta.vehiculo?.imagen ? `/storage/${venta.vehiculo.imagen}` : '/img/placeholder.png'} 
                                    alt="Vehículo" 
                                />
                            </div>
                            <div className="vehicle-details">
                                <h2 className="vehicle-name">
                                    {venta.vehiculo?.marca?.marca} {venta.vehiculo?.modelo?.modelo}
                                </h2>
                                <p className="vehicle-price">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(venta.vehiculo?.precio)}
                                </p>
                            </div>

                            <div className="action-buttons">
                                <button className="btn-main-red">Contactar cliente</button>
                                <button className="btn-outline-red">Vender vehículo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DetalleVenta;