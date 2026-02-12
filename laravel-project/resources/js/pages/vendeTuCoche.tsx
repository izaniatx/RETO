import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { useForm, usePage } from '@inertiajs/react';
import "../../css/modalReserva.css"; 
import "../../css/vendeTuCoche.css"; 

interface Props {
    marcas: any[];
    modelos: any[];
    carrocerias: any[];
}

const VendeTuCoche = ({ marcas, modelos, carrocerias }: Props) => {
    const { auth } = usePage().props as any;
    const usuarioLogueado = auth?.user;

    interface VendeForm {
        nombre: string;
        email: string;
        telefono: string;
        marca_id: string | number;
        modelo_id: string | number;
        carroceria_id: string | number;
        color: string;
        mensaje: string;
    }

    const { data, setData, post, processing, errors } = useForm<VendeForm>({
    nombre: usuarioLogueado ? `${usuarioLogueado.nombre} ${usuarioLogueado.apellido || ''}`.trim() : '',
    email: usuarioLogueado?.email || '',
    telefono: usuarioLogueado?.telefono || '',
    marca_id: '',
    modelo_id: '',
    carroceria_id: '',
    color: '',
    mensaje: '',
});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/registro/registrase');
    };

    return (
        <MainLayout>
            <div className="vende-page-wrapper">
                <div className="modal-container vende-static-container">
                    
                    <div className="modal-left">
                        <div className="vende-header-container">
                            <h2 className="modal-title">¡VENDE TU COCHE!</h2>
                        </div>
                        
                        <form id="form-vende" className="modal-form-grid" onSubmit={handleSubmit}>
                            {/* Fila de Nombre y Teléfono */}
                            <div className="row-inputs">
                                <div className="input-group">
                                    <label>Nombre completo:</label>
                                    <input type="text" value={data.nombre} onChange={e => setData('nombre', e.target.value)} required />
                                </div>
                                <div className="input-group">
                                    <label>Teléfono de contacto:</label>
                                    <input 
                                        type="tel" 
                                        value={data.telefono} 
                                        onChange={e => setData('telefono', e.target.value)} 
                                        placeholder="600 000 000"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Email:</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
                            </div>

                            {/* Fila de Marca y Modelo */}
                            <div className="row-inputs">
                                <div className="input-group">
                                    <label>Marca:</label>
                                    <select className="form-select-vende" value={data.marca_id} onChange={e => setData('marca_id', e.target.value)} required>
                                        <option value="">Selecciona marca</option>
                                        {marcas.map(m => <option key={m.id} value={m.id}>{m.marca}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Modelo:</label>
                                    <select className="form-select-vende" value={data.modelo_id} onChange={e => setData('modelo_id', e.target.value)} required>
                                        <option value="">Selecciona modelo</option>
                                        {modelos.map(mo => <option key={mo.id} value={mo.id}>{mo.modelo}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Fila de Carrocería y Color */}
                            <div className="row-inputs">
                                <div className="input-group">
                                    <label>Carrocería:</label>
                                    <select className="form-select-vende" value={data.carroceria_id} onChange={e => setData('carroceria_id', e.target.value)} required>
                                        <option value="">Selecciona carrocería</option>
                                        {carrocerias.map(c => <option key={c.id} value={c.id}>{c.carroceria}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Color del coche:</label>
                                    <input 
                                        type="text" 
                                        value={data.color} 
                                        onChange={e => setData('color', e.target.value)} 
                                        placeholder="Ej: Rojo perlado"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Mensaje adicional:</label>
                                <textarea 
                                    placeholder="Cuéntanos más (km, año, extras...)"
                                    value={data.mensaje}
                                    onChange={e => setData('mensaje', e.target.value)}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="modal-right">
                        <div className="booking-card-inner">
                            <h3>Tasación Directa</h3>
                            <div className="big-price-display">¡Gratis!</div>

                            <div className="booking-details">
                                <p className="vende-info-text">
                                    Nuestro equipo revisará el <strong>color</strong> y estado de tu vehículo para darte una oferta competitiva.
                                </p>
                            </div>

                            <button type="submit" form="form-vende" className="btn-confirmar-reserva btn-vende-rojo" disabled={processing}>
                                {processing ? 'Enviando...' : 'Solicitar oferta'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default VendeTuCoche;