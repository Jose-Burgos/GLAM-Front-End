export default function validateLoginForm(values: any) {
  const errors: any = {};
  // Validate email
  if (!values.email) {
    errors.email = 'El email es obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email no válido';
  }
  // Validate password
  if (!values.password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (values.password.length < 6) {
    errors.password = 'La contraseña debe ser de al menos 6 caracteres';
  }
  console.log("Validated login form");
  return errors;
}
