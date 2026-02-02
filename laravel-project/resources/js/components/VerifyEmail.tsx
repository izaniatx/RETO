// resources/js/components/VerifyEmail.tsx
import React from 'react';
import { router } from '@inertiajs/react';

interface VerifyEmailProps {
  onClose: () => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ onClose }) => {
  const handleLogout = () => {
    router.post('/logout');
  };

  const resendVerification = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/email/verification-notification');
  };

  return (
    <div
      className="r-modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        className="r-modal"
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '1000px',
          width: '90%',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          textAlign: 'center',
        }}
      >
        <h2 className="fw-bold mb-4">¡Gracias por registrarte!</h2>
        <p>
          Antes de continuar, ¿podrías verificar tu dirección de correo electrónico haciendo clic en el enlace que te acabamos de enviar?
          Si no recibiste el correo, con gusto te enviaremos otro.
        </p>

        <div className="mt-4 d-flex justify-content-between flex-wrap gap-2">
          <form onSubmit={resendVerification}>
            <button type="submit" className="btn btn-primary">
              Reenviar correo de verificación
            </button>
          </form>

          <a
            href="http://localhost:8025"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info"
          >
            Abrir bandeja de entrada (Mailpit)
          </a>

          
        </div>

        <div className="mt-4">
         
          <button onClick={handleLogout} className="btn btn-secondary">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
