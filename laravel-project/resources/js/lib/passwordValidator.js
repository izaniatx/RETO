
function validarPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
  return regex.test(password);
};


export default validarPassword;