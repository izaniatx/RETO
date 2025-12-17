import validarPassword from './passwordValidator.js';


function mostrarError(id, mensaje) {
    document.getElementById(`error-${id}`).textContent = mensaje;
}

function limpiarErrores() {
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
}

function formValidator() {
    limpiarErrores();

    const nombre = document.getElementById("firstName").value.trim();
    const apellido = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const contrasenya = document.getElementById("contrasenya").value;
    const telefono = document.getElementById("telefono").value.trim();

    const atPos = email.indexOf('@');

    if (!nombre && !apellido && !email && !usuario && !contrasenya && !telefono) {
        mostrarError("all", "Todos Los campos son obligatorios.");
        return false;
    }

    if (nombre.charAt(0) !== nombre.charAt(0).toUpperCase()) {
        mostrarError("firstName", "La primera letra debe ser mayúscula.");
        return false;
    }

    if (apellido.charAt(0) !== apellido.charAt(0).toUpperCase()) {
        mostrarError("lastName", "La primera letra debe ser mayúscula.");
        return false;
    }

    if (atPos <= 0 || atPos === email.length - 1) {
        mostrarError("email", "Introduce un correo válido.");
        return false;
    }


    if (!validarPassword(contrasenya) || contrasenya.length < 8) {
        mostrarError(
            "contrasenya",
            "Mín. 8 caracteres, una mayúscula, un número y un carácter especial."
        );
        return false;
    }

    if (telefono.length < 9) {
        mostrarError("telefono", "El teléfono debe tener al menos 9 dígitos.");
        return false;
    }

    return true;
}   

export default formValidator;
