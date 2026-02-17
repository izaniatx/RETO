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

// --- COMPONENTE AUXILIAR PARA MOVER LA CÁMARA ---
function ChangeView({ center, zoom }: { center: LatLngExpression, zoom: number }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom, {
                animate: true,
                duration: 1.5 // Segundos de la animación de vuelo
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

    // 1. Geolocalización
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

    // 2. Selects en cascada
    const territoriosDisponibles = useMemo(() => {
        const pais = paises.find(p => p.id === Number(data.pais_id));
        return pais ? pais.territorios : [];
    }, [data.pais_id, paises]);

    const ciudadesDisponibles = useMemo(() => {
        const territorio = territoriosDisponibles.find(t => t.id === Number(data.territorio_id));
        return territorio ? territorio.ciudades : [];
    }, [data.territorio_id, territoriosDisponibles]);

    // 3. Sincronización con Laravel
    useEffect(() => {
        router.get('/dondeEncontrarnos', data, { 
            preserveState: true, replace: true, only: ['concesionarios'] 
        });
    }, [data.pais_id, data.territorio_id, data.ciudad_id]);

    // 4. FUNCIÓN PARA VOLAR AL CONCESIONARIO (LISTA -> MAPA)
    const volarAlConcesionario = (lat: number, lng: number) => {
        setMapCenter([lat, lng]);
        setZoom(16); // Zoom cercano para ver el detalle
    };

    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden bg-gray-50 font-sans">
                
                {/* PANEL LATERAL */}
                <div className="w-full md:w-96 bg-white shadow-xl z-[1000] flex flex-col">
                    <div className="p-6 border-b space-y-4">
                        <h1 className="text-2xl font-bold text-gray-800">Encuéntranos</h1>
                        <button onClick={handleLocateUser} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold shadow-sm">
                            <Navigation size={18} /> Usar mi ubicación actual
                        </button>
                        
                        <div className="space-y-3">
                            <select className="w-full border-gray-300 rounded-lg text-sm" value={data.pais_id} onChange={e => setData({ ...data, pais_id: e.target.value, territorio_id: '', ciudad_id: '' })}>
                                <option value="">Selecciona País</option>
                                {paises.map(p => <option key={p.id} value={p.id}>{p.pais}</option>)}
                            </select>
                            <select disabled={!data.pais_id} className="w-full border-gray-300 rounded-lg text-sm disabled:bg-gray-100" value={data.territorio_id} onChange={e => setData({ ...data, territorio_id: e.target.value, ciudad_id: '' })}>
                                <option value="">Comunidad / Territorio</option>
                                {territoriosDisponibles.map(t => <option key={t.id} value={t.id}>{t.comunidad_autonoma}</option>)}
                            </select>
                            <select disabled={!data.territorio_id} className="w-full border-gray-300 rounded-lg text-sm disabled:bg-gray-100" value={data.ciudad_id} onChange={e => setData('ciudad_id', e.target.value)}>
                                <option value="">Ciudad</option>
                                {ciudadesDisponibles.map(c => <option key={c.id} value={c.id}>{c.ciudad}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* LISTA DE RESULTADOS CON CLIC */}
                    <div className="flex-1 overflow-y-auto">
                        {concesionarios.length === 0 ? (
                            <div className="p-8 text-center text-gray-500"><MapPin className="mx-auto mb-2 opacity-20" size={48} /><p>No hay resultados.</p></div>
                        ) : (
                            concesionarios.map(con => (
                                <div 
                                    key={con.id} 
                                    onClick={() => volarAlConcesionario(Number(con.latitud), Number(con.longitud))}
                                    className="p-4 border-b hover:bg-blue-50 cursor-pointer group transition border-l-4 border-l-transparent hover:border-l-blue-500"
                                >
                                    <h3 className="font-bold text-blue-900">{con.nombre}</h3>
                                    <p className="flex items-center text-sm text-gray-600 mt-1"><Phone size={14} className="mr-2" /> {con.telefono}</p>
                                    <span className="text-[10px] text-blue-500 uppercase font-bold mt-2 inline-block">Ver en el mapa →</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* MAPA */}
                <div className="flex-1 relative z-0">
                    <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <ChangeView center={mapCenter} zoom={zoom} />
                        
                        {concesionarios.map(con => (
                            <Marker key={con.id} position={[Number(con.latitud), Number(con.longitud)]}>
                                <Popup><div className="font-sans"><strong>{con.nombre}</strong><br/>{con.telefono}</div></Popup>
                            </Marker>
                        ))}

                        {userLocation && (
                            <Marker position={userLocation} icon={L.divIcon({
                                className: 'user-marker',
                                html: '<div class="w-4 h-4 bg-red-600 border-2 border-white rounded-full shadow pulse"></div>'
                            })}>
                                <Popup>Estás aquí</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
            </div>
        </MainLayout>
    );
}