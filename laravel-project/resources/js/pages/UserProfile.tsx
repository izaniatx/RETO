import React, { useMemo } from 'react';
import '../../css/UserProfile.css';
import { usePage } from '@inertiajs/react';

interface Usuario {
  id: number;
  usuario:string,
  nombre: string;
  apellido: string;

  telefono: string;
  email: string;
  role: string;
}

interface Rol {
  id: number;
  rol: string;
}



interface UserProfileProps {
  usuario: Usuario;
  rol?: Rol; // agregamos opcional
}


const UserProfile: React.FC<UserProfileProps> = ({ usuario, rol }) => {
  // Color aleatorio para el banner grande
  const bannerColor = useMemo(() => {
    const colors = [
      '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', 
      '#C7CEEA', '#F3D1F4', '#d28ae0ff', '#87ceebff', '#90ee90ff'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <div className="profile-page">
      {/* Banner de ancho completo */}
      <div 
        className="profile-banner-full" 
        style={{ backgroundColor: bannerColor }}
      >
        <button className="btn-back" onClick={() => window.history.back()}>
          ⬅
        </button>
      </div>

      <div className="profile-container">
        
        {/* Columna Izquierda: Identidad y Acciones */}
        <aside className="profile-sidebar card">
          <div className="avatar-container">
            <div className="profile-avatar">👤</div>  
          </div>
          
          <div className="identity-text">
            <h2>{usuario.nombre} {usuario.apellido}</h2>
            <p className="username">@{usuario.usuario}</p>
          </div>

          <div className="sidebar-actions">
            <button className="btn btn-primary btn-edit">
              Editar Datos
            </button>
            <button className="btn btn-outline">
              Cerrar Sesión
            </button>
            <button 
              className="btn btn-danger-link" 
              onClick={() => {
                 if(confirm('¿Seguro que quieres borrar tu cuenta?')) {
                    console.log('Eliminar cuenta'); // aquí llamas a tu lógica
                 }
              }}
            >
              Eliminar Cuenta
            </button>
          </div>
        </aside>

        {/* Columna Derecha: Información Detallada */}
        <main className="profile-content card">
          <div className="content-header">
            <h3>Información Personal</h3>
          </div>

          <div className="info-grid">
            <div className="info-group">
              <label>Nombre</label>
              <p>{usuario.nombre}</p>
            </div>
            
            <div className="info-group">
              <label>Apellido</label>
              <p>{usuario.apellido}</p>
            </div>

            <div className="info-group">
              <label>Correo Electrónico</label>
              <p>{usuario.email}</p>
            </div>

            <div className="info-group">
              <label>Teléfono</label>
              <p>{usuario.telefono}</p>
            </div>

            <div className="info-group">
              <label>Rol de Usuario</label>
              <p className="badge">{rol?.rol || 'Sin rol'}</p>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default UserProfile;
