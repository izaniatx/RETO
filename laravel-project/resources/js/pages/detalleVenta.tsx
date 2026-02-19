import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { Link } from '@inertiajs/react';
import { ChevronLeft, Mail, Phone, User, Tag, MessageSquare } from 'lucide-react'; // Iconos modernos
import "../../css/detalleVenta.css";
import { router } from '@inertiajs/react';

const DetalleVenta = ({ venta, estados }: { venta: any, estados: any[] }) => {

    const handleEstadoChange = (nuevoEstadoId: string) => {
 
        router.patch(`/gestion/ventas/${venta.id}/estado`, {
            estado_id: nuevoEstadoId
        }, {
            preserveScroll: true, 
        });
    };

    const handleVender = () => {
        if (confirm('¿Confirmas la venta de este vehículo? El estado pasará a "Vendido".')) {
          
            router.patch(`/gestion/ventas/${venta.id}/vender`, {}, {
                preserveScroll: true,
            });
        }
    };
    return (
        <MainLayout>
            <div className="detalle-wrapper">
               
                <Link href="/gestion/ventas" className="back-nav">
                    <ChevronLeft size={24} />
                    <span>Volver al listado</span>
                </Link>

                <div className="glass-card">
                   
                    <div className="floating-header">
                        DETALLES DE LA CONSULTA #{venta.id}
                    </div>

                    <div className="content-grid">
                     
                        <div className="client-info">
                            <h4 className="section-title"> Información del Cliente</h4>
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

                            

                            <div className="message-area">
                                <label className='detalle-icon'><MessageSquare size={16} /> Mensaje del cliente:</label>
                                <div className="message-bubble">
                                    {venta.mensaje?.mensaje}
                                </div>
                            </div>

                            <div className="status-container">
                                
                                <select 
                                    className={`status-pill pill-${venta.estado_id} select-custom`}
                                    value={venta.estado_id}
                                    onChange={(e) => handleEstadoChange(e.target.value)}
                                >
                                    {estados.map((est) => (
                                        <option key={est.id} value={est.id}>
                                            {est.estado}
                                        </option>
                                    ))}
                                </select>
                                
                              
                            </div>
                        </div>

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
                                <button 
                                    className="btn-outline-red" 
                                    onClick={handleVender}
                                >
                                    Vender vehículo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DetalleVenta;