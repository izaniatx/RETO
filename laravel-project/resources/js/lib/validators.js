import validarPassword from './passwordValidator';

export function validateField(name, value) {
    switch (name) {
        case 'firstName':
            if (!value) return 'El nombre es obligatorio';
            if (value[0] !== value[0].toUpperCase())
                return 'La primera letra debe ser mayúscula';
            break;

        case 'lastName':
            if (!value) return 'El apellido es obligatorio';
            if (value[0] !== value[0].toUpperCase())
                return 'La primera letra debe ser mayúscula';
            break;

        case 'email':
            if (!value) return 'El email es obligatorio';
            if (!value.includes('@'))
                return 'Email no válido';
            break;

        case 'usuario':
            if (!value) return 'El usuario es obligatorio';
            break;

        case 'contrasenya':
            if (!validarPassword(value))
                return 'Mín. 8 caracteres, mayúscula, número y símbolo';
            break;

        case 'telefono':
            if (value.length < 9)
                return 'Debe tener al menos 9 dígitos';
            break;

        default:
            return '';
    }

    return '';
}

export function validateForm(values) {
    const errors = {};

    Object.keys(values).forEach(field => {
        const error = validateField(field, values[field]);
        if (error) errors[field] = error;
    });

    return errors;
}
