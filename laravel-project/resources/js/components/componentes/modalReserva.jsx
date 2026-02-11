import React, { useEffect } from 'react'; // 👈 Faltaba importar useEffect
import { useForm, usePage } from '@inertiajs/react'; // 👈 Faltaba importar usePage
import '../../../css/modalReserva.css';

const ModalReserva = ({ isOpen, onClose, vehiculo }) => {
    // Extraemos la información del usuario desde las props compartidas de Inertia
    const { auth } = usePage().props;
    const usuarioLogueado = auth?.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        vehiculo_id: vehiculo?.id || '',
        nombre: usuarioLogueado?.nombre 
            ? `${usuarioLogueado.nombre} ${usuarioLogueado.apellido || ''}`.trim() 
            : '',
        email: usuarioLogueado?.email || '',
        telefono: usuarioLogueado?.telefono || '',
        mensaje: '',
    });

    // Actualizamos el formulario si el estado de autenticación cambia mientras la modal está abierta
    useEffect(() => {
        if (isOpen && usuarioLogueado) {
            setData(prev => ({
                ...prev,
                // Solo actualizamos si el campo está vacío para no sobreescribir si el usuario borra algo
                nombre: prev.nombre === '' ? `${usuarioLogueado.nombre} ${usuarioLogueado.apellido || ''}`.trim() : prev.nombre,
                email: prev.email === '' ? (usuarioLogueado.email || '') : prev.email,
                telefono: prev.telefono === '' ? (usuarioLogueado.telefono || '') : prev.telefono,
            }));
        }
    }, [isOpen, usuarioLogueado]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post('/reservar', {
            onSuccess: () => {
                reset();
                onClose();
                alert('¡Reserva creada con éxito!');
            },
            onError: (errors) => {
                console.log("Errores de validación:", errors);
            }
        });
    };

    const formatPrecio = (precio) => {
        return new Intl.NumberFormat('es-ES', { 
            style: 'currency', 
            currency: 'EUR' 
        }).format(precio || 0);
    };

   

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-left">
                    <h2 className="modal-title">
                        {vehiculo.marca?.marca} {vehiculo.modelo?.modelo}
                    </h2>
                    
                    <div className="mini-card-resumen">
                        <img 
                            src={vehiculo.imagen ? `/storage/${vehiculo.imagen}` : '/img/placeholder.png'} 
                            alt="Coche" 
                        />
                    </div>

                    <form id="form-reserva" className="modal-form-grid" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Nombre completo:</label>
                            <input 
                                type="text" 
                                placeholder="Escribe tu nombre..."
                                value={data.nombre}
                                onChange={e => setData('nombre', e.target.value)}
                                required
                            />
                            {errors.nombre && <span className="error">{errors.nombre}</span>}
                        </div>

                        <div className="input-group">
                            <label>Email:</label>
                            <input 
                                type="email" 
                                placeholder="ejemplo@correo.com"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="input-group">
                            <label>Teléfono:</label>
                            <input 
                                type="tel" 
                                placeholder="600 000 000"
                                value={data.telefono}
                                onChange={e => setData('telefono', e.target.value)}
                                required
                            />
                            {errors.telefono && <span className="error">{errors.telefono}</span>}
                        </div>

                        <div className="input-group">
                            <label>Mensaje:</label>
                            <textarea 
                                placeholder="¿Tienes alguna duda sobre este vehículo?"
                                value={data.mensaje}
                                onChange={e => setData('mensaje', e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                <div className="modal-right">
                    <div className="booking-card-inner">
                        <h3>Reserva Vehículo</h3>
                        <div className="big-price-display">
                            {formatPrecio(vehiculo.precio)}
                        </div>

                        <div className="booking-details">
                            <div className="detail-row">
                                <span>Impuestos</span>
                                <span>{formatPrecio(vehiculo.precio * 0.21)} (IVA 21%)</span>
                            </div>
                            <div className="detail-row">
                                <span>Localización</span>
                                <span>Donostia 📍</span>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            form="form-reserva" 
                            className="btn-confirmar-reserva"
                            disabled={processing}
                        >
                            {processing ? 'Enviando...' : 'Reservar'}
                        </button>

                        <button type="button" className="btn-cancelar-modal" onClick={onClose}>
                            Cancelar acción
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalReserva;