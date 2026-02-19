import { useState, useEffect, useMemo } from 'react';
import { useForm, router } from '@inertiajs/react';
import MainLayout from "../layouts/MainLayout";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Phone, Navigation, MapPin } from 'lucide-react';
import L, { LatLngExpression } from 'leaflet';

// Importación de estilos
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// --- INTERFACES ---
interface Ciudad { id: number; ciudad: string; }
interface Territorio { id: number; comunidad_autonoma: string; ciudades: Ciudad[]; }
interface Pais { id: number; pais: string; territorios: Territorio[]; }
interface Concesionario {
    id: number;
    nombre: string;
    telefono: string;
    latitud: number;
    longitud: number;
}

interface Props {
    paises: Pais[];
    concesionarios: Concesionario[];
    filters: { pais_id?: string; territorio_id?: string; ciudad_id?: string; };
}

// Icono por defecto
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }: { center: LatLngExpression, zoom: number }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom, {
                animate: true,
                duration: 1.5 
            });
        }
    }, [center, zoom, map]);
    return null;
}

export default function DondeEncontrarnos({ paises, concesionarios, filters }: Props) {
    const { data, setData } = useForm({
        pais_id: filters.pais_id || '',
        territorio_id: filters.territorio_id || '',
        ciudad_id: filters.ciudad_id || '',
    });

    const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
    const [mapCenter, setMapCenter] = useState<LatLngExpression>([40.4167, -3.7032]);
    const [zoom, setZoom] = useState(6);

    const handleLocateUser = () => {
        if (!navigator.geolocation) return alert("No soportado");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newPos: LatLngExpression = [position.coords.latitude, position.coords.longitude];
                setUserLocation(newPos);
                setMapCenter(newPos);
                setZoom(14);
            }
        );
    };

    const territoriosDisponibles = useMemo(() => {
        const pais = paises.find(p => p.id === Number(data.pais_id));
        return pais ? pais.territorios : [];
    }, [data.pais_id, paises]);

    const ciudadesDisponibles = useMemo(() => {
        const territorio = territoriosDisponibles.find(t => t.id === Number(data.territorio_id));
        return territorio ? territorio.ciudades : [];
    }, [data.territorio_id, territoriosDisponibles]);

    useEffect(() => {
        router.get('/dondeEncontrarnos', data, { 
            preserveState: true, replace: true, only: ['concesionarios'] 
        });
    }, [data.pais_id, data.territorio_id, data.ciudad_id]);

    const volarAlConcesionario = (lat: number, lng: number) => {
        setMapCenter([lat, lng]);
        setZoom(16);
    };

    return (
        <MainLayout>
            <div className="d-flex flex-column flex-md-row" style={{ height: 'calc(100vh - 64px)', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                
              
                <div className="bg-white shadow-sm d-flex flex-column border-end" style={{ width: '100%', maxWidth: '400px', zIndex: 1000 }}>
                    <div className="p-4 border-bottom">
                        <h2 className="h4 fw-bold mb-3 text-dark">Encuéntranos</h2>
                        
                        <button onClick={handleLocateUser} className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 mb-3 fw-bold">
                            <Navigation size={18} /> Mi ubicación
                        </button>
                        
                        <div className="d-flex flex-column gap-2">
                            <select className="form-select form-select-sm" value={data.pais_id} onChange={e => setData({ ...data, pais_id: e.target.value, territorio_id: '', ciudad_id: '' })}>
                                <option value="">Selecciona País</option>
                                {paises.map(p => <option key={p.id} value={p.id}>{p.pais}</option>)}
                            </select>
                            
                            <select disabled={!data.pais_id} className="form-select form-select-sm" value={data.territorio_id} onChange={e => setData({ ...data, territorio_id: e.target.value, ciudad_id: '' })}>
                                <option value="">Comunidad / Territorio</option>
                                {territoriosDisponibles.map(t => <option key={t.id} value={t.id}>{t.comunidad_autonoma}</option>)}
                            </select>
                            
                            <select disabled={!data.territorio_id} className="form-select form-select-sm" value={data.ciudad_id} onChange={e => setData('ciudad_id', e.target.value)}>
                                <option value="">Ciudad</option>
                                {ciudadesDisponibles.map(c => <option key={c.id} value={c.id}>{c.ciudad}</option>)}
                            </select>
                        </div>
                    </div>

                
                    <div className="flex-grow-1 overflow-auto">
                        {concesionarios.length === 0 ? (
                            <div className="p-5 text-center text-muted">
                                <MapPin className="mb-2 opacity-25" size={48} />
                                <p>No hay resultados disponibles.</p>
                            </div>
                        ) : (
                            concesionarios.map(con => (
                                <div 
                                    key={con.id} 
                                    onClick={() => volarAlConcesionario(Number(con.latitud), Number(con.longitud))}
                                    className="p-3 border-bottom list-item-hover cursor-pointer border-start border-4 border-transparent"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h6 className="fw-bold text-dark mb-1">{con.nombre}</h6>
                                    <div className="text-muted small d-flex align-items-center mb-1">
                                        <Phone size={14} className="me-2" /> {con.telefono}
                                    </div>
                                    <span className="text-primary fw-bold text-uppercase" style={{ fontSize: '10px' }}>Ver en mapa →</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

             
                <div className="flex-grow-1 position-relative">
                    <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <ChangeView center={mapCenter} zoom={zoom} />
                        
                        {concesionarios.map(con => (
                            <Marker key={con.id} position={[Number(con.latitud), Number(con.longitud)]}>
                                <Popup>
                                    <div className="p-1">
                                        <strong className="d-block mb-1">{con.nombre}</strong>
                                        <span className="text-muted">{con.telefono}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        {userLocation && (
                            <Marker position={userLocation} icon={L.divIcon({
                                className: 'custom-user-marker',
                                html: '<div class="bg-danger border border-white rounded-circle shadow" style="width: 15px; height: 15px;"></div>'
                            })}>
                                <Popup>Tu ubicación actual</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
            </div>

            <style>{`
                .list-item-hover:hover {
                    background-color: #f0f7ff;
                    border-left-color: #0d6efd !important;
                }
                .cursor-pointer { cursor: pointer; }
                .border-transparent { border-left-color: transparent; }
               
                .leaflet-popup-content-wrapper {
                    border-radius: 8px;
                    font-family: sans-serif;
                }
            `}</style>
        </MainLayout>
    );
}