export default function validateContactForm(values: any) {
  const errors: any = {};
  // Validate email
  if (!values.email) {
    errors.email = 'El email es obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email no válido';
  }
  // Validate message
  if (!values.message) {
    errors.message = 'Debe escribir algun mensaje';
  }
  return errors;
}
