import '../../css/registro.css';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { validateForm } from '../lib/validators';


interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  usuario: string;
  contrasenya: string;
  contrasenya2: string;
  telefono: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  usuario?: string;
  contrasenya?: string;
  contrasenya2?: string;
  telefono?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label className="r-form-label">{label}</label>
      <input
        {...rest}
        className={`r-form-control ${error ? 'r-input-error' : ''}`}
      />
      {error && <small className="r-error">{error}</small>}
    </div>
  );
};

const Registro: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    usuario: '',
    contrasenya: '',
    contrasenya2: '',
    telefono: '',
  });


  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm(values);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; 
    }

    router.post('/registro', values as any, {
      onSuccess: () => {},
      onError: (errors) => {
        setErrors(errors);
      }
    });
  };


  return (
    <div className="r-registro-bg" style={{ position: 'relative' }}>
      <button
        className="r-btn-atras"
        onClick={() => window.location.href = '/'}
        aria-label="Volver"
      >
        ←
      </button>
      <div className="container">
        <h2 className="mb-4 text-white text-center fw-bold">REGISTRO</h2>

        <form onSubmit={handleSubmit} className="r-cnt">
          <div className="row">
            <div className="col-md-12 r-registro-inputs">
              <Input
                label="Usuario"
                name="usuario"
                value={values.usuario}
                error={errors.usuario}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
         <Input
                label="Nombre"
                name="firstName"
                value={values.firstName}
                error={errors.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Apellido"
                name="lastName"
                value={values.lastName}
                error={errors.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Contraseña"
                name="contrasenya"
                type="password"
                value={values.contrasenya}
                error={errors.contrasenya}
                onChange={handleChange}
                onBlur={handleBlur}
              />

               <Input
                label="Confirme la contraseña"
                name="contrasenya2"
                type="password"
                value={values.contrasenya2}
                error={errors.contrasenya2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Teléfono"
                name="telefono"
                type="tel"
                value={values.telefono}
                error={errors.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="r-btn-primary">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  
};

export default Registro;
