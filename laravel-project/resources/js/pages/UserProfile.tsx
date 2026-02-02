import React, { useMemo } from 'react';
import '../../css/UserProfile.css';

interface UserProfileProps {
  user?: {
    name: string;
    lastName: string;
    username: string;
    phone: string;
    email: string;
    role: string;
  };
  onEdit: () => void;
  onLogout: () => void;
  onDelete: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit, onLogout, onDelete }) => {
  
  // Color aleatorio para el banner grande
  const bannerColor = useMemo(() => {
    const colors = ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F3D1F4', '#d28ae0ff', '#87ceebff', '#90ee90ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const userData = user || {
    name: 'Juan',
    lastName: 'Pérez',
    username: 'juanperez92',
    phone: '+34 600 000 000',
    email: 'juan.perez@example.com',
    role: 'Administrador' // Campo extra de ejemplo
  };

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
            <h2>{userData.name} {userData.lastName}</h2>
            <p className="username">@{userData.username}</p>
          </div>

          <div className="sidebar-actions">
            <button className="btn btn-primary btn-edit " onClick={onEdit}>
              Editar Datos
            </button>
            <button className="btn btn-outline" onClick={onLogout}>
              Cerrar Sesión
            </button>
            <button 
              className="btn btn-danger-link" 
              onClick={() => {
                 if(confirm('¿Seguro que quieres borrar tu cuenta?')) onDelete();
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
            {/* Aquí podrías poner pestañas si la app crece (ej: Historial, Configuración) */}
          </div>

          <div className="info-grid">
            <div className="info-group">
              <label>Nombre</label>
              <p>{userData.name}</p>
            </div>
            
            <div className="info-group">
              <label>Apellido</label>
              <p>{userData.lastName}</p>
            </div>

            <div className="info-group">
              <label>Correo Electrónico</label>
              <p>{userData.email}</p>
            </div>

            <div className="info-group">
              <label>Teléfono</label>
              <p>{userData.phone}</p>
            </div>

            <div className="info-group">
              <label>Rol de Usuario</label>
              <p className="badge">{userData.role}</p>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default UserProfile;