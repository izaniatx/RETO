import React, { useMemo, useState } from 'react';
import '../../css/UserProfile.css';
import { router } from '@inertiajs/react';
import UsuarioModal from '../components/componentes/modalUsuarioPerfil'; // ✅ Importamos el modal

interface Usuario {
  id: number;
  usuario: string;
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
  rol?: Rol; // opcional
}

const UserProfile: React.FC<UserProfileProps> = ({ usuario, rol }) => {
  const bannerColor = useMemo(() => {
    const colors = [
      '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7',
      '#C7CEEA', '#F3D1F4', '#d28ae0ff', '#87ceebff', '#90ee90ff'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  // --- Estados para el modal ---
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    usuario: usuario.usuario,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    telefono: usuario.telefono,
    rol_id: rol?.id?.toString() || '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- Función para enviar la actualización ---
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.put(`/UserProfile/${usuario.id}`, formValues, {
      preserveScroll: true,
      onSuccess: () => {
        alert('Datos actualizados correctamente');
        setShowModal(false);
        setErrors({});
        router.reload(); // ✅ recarga la página del perfil
      },
      onError: (backendErrors) => setErrors(backendErrors as Record<string,string>),
    });
  };
  

  const handleEliminarUsuario = () => {
    if (!confirm('¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
    
    router.post('/admin/usuarios/delete', { id: usuario.id }, {
      preserveScroll: true,
      onSuccess: () => {
        alert('Usuario eliminado correctamente');
        window.location.href = '/';
      },
      onError: () => alert('Error al eliminar el usuario'),
    });
  };

  const handleLogout = () => {
    if (!confirm('¿Seguro que quieres cerrar sesión?')) return;
    router.post('/logout');
  };

  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="profile-banner-full" style={{ backgroundColor:  'rgb(33, 37, 41)' }}>
        <button className="btn-back" onClick={() => window.history.back()}>⬅</button>
      </div>

      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar card">
          <div className="avatar-container">
            <div className="profile-avatar">👤</div>
          </div>

          <div className="identity-text">
            <h2>{usuario.nombre} {usuario.apellido}</h2>
            <p className="username">@{usuario.usuario}</p>
          </div>

          <div className="sidebar-actions">
            <button className="btn btn-primary btn-edit" onClick={() => setShowModal(true)}>
              Editar Datos
            </button>
            <button className="btn btn-outline" onClick={handleLogout}>
              Cerrar Sesión
            </button>
            <button className="btn btn-danger-link" onClick={handleEliminarUsuario}>
              Eliminar Cuenta
            </button>
          </div>
        </aside>

        {/* Información */}
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

      {/* Modal de edición */}
      <UsuarioModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formValues={formValues}
        setFormValues={setFormValues}
        errors={errors}
        roles={rol ? [rol] : []} // si quieres usar varios roles, pásalos todos
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserProfile;
