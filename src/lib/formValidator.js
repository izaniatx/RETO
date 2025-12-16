import validarPassword from './passwordValidator.js';

function formValidator() {
    const nombre = document.getElementById("firstName").value;
    const apellido = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const usuario = document.getElementById("usuario").value;
    const contrasenya = document.getElementById("contrasenya").value;
    const telefono = document.getElementById("telefono").value;


    const atPos = email.indexOf('@');

    // comprobar requisitos de contraseña: mayúscula, número y carácter especial
    const tieneMayuscula = /[A-Z]/.test(contrasenya);
    const tineNumero = /\d/.test(contrasenya); 
    const tieneCaracter = /[^A-Za-z0-9]/.test(contrasenya);

    if (!nombre || !apellido || !email || !usuario || !contrasenya || !telefono) {
        alert("Por favor, completa todos los campos.");
        return false;
    } else if (nombre.charAt(0) !== nombre.charAt(0).toUpperCase()) {
        alert("La primera letra del nombre debe ser mayúscula.");
        return false;
    } else if (apellido.charAt(0) !== apellido.charAt(0).toUpperCase()) {
        alert("La primera letra del apellido debe ser mayúscula.");
        return false;
    } else if (atPos <= 0 || atPos === email.length - 1) {
        alert("Por favor, introduce un correo electrónico válido con un '@' en medio.");
        return false;
    } else if (!validarPassword(contrasenya) || contrasenya.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.");
        return false;
    } else if (telefono.length < 9) {
        alert("Por favor, introduce un número de teléfono válido de al menos 9 dígitos.");
        return false;
    }

    return true;
}

export default formValidator;