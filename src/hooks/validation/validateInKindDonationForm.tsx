//validateInKindDonationsForm.tsx
export default function validateInKindDonationForm(values: any) {
  const errors: any = {};
  // Validate type
  if (!values.type) {
    errors.type = 'El tipo de donativo es obligatorio';
  }
  // Validate description
  if (!values.description) {
    errors.description = 'Debe escribir alguna descripción';
  }
  // Validate quantity
  if (!values.quantity || values.quantity <= 0) {
    errors.quantity = 'La cantidad es obligatoria';
  } else if (!/^[0-9]*[1-9][0-9]*$/i.test(values.quantity)) {
    errors.quantity = 'La cantidad debe ser un valor numerico';
  }
  // Validate condition
  if (!values.condition) {
    errors.condition = 'La condicion del donativo es obligatorio';
  }
  // Validate Availability
  if (!values.availability) {
    errors.availability = 'La fecha de rescate es obligatoria';
  }
  return errors;
}
