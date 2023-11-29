export default function validateUserRegisterForm(values: any) {
  const errors: any = {};

  // Validate first name
  if (!values.firstName) {
    errors.firstName = 'El nombre es obligatorio';
  }
  // Validate last name
  if (!values.lastName) {
    errors.lastName = 'El apellido es obligatorio';
  }
  // Validate username
  if (!values.username) {
    errors.username = 'La nombre de usuario es obligatorio';
  }
  // Validate DNI
  if (!values.identification) {
    errors.identification = 'El DNI es obligatorio';
  } else if (
    !/^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/i.test(values.identification)
  ) {
    errors.identification = 'DNI no valido';
  }

  // Validate email
  if (!values.email) {
    errors.email = 'El email es obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.user_email = 'Email no válido';
  }

  // Validate password
  if (!values.password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (values.password.length < 6) {
    errors.password = 'La contraseña debe ser de al menos 6 caracteres';
  }

  return errors;
}
