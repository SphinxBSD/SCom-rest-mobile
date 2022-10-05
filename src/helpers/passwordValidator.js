export function passwordValidator(password) {
  if (!password) return "La contraseña no puede estar vacia.";
  if (password.length < 2)
    return "La contraseña al menos debe tener 5 caracteres de longitud!";
  return "";
}
