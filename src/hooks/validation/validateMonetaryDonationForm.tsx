export default function validateMonetaryDonationForm(values: any) {
    const errors: any = {};
    // Validate email
    if (!values.amount) {
        errors.amount = 'El monto es obligatorio';
    } else if (!/^[0-9]*[1-9][0-9]*$/i.test(values.amount)) {
        errors.amount = 'El monto debe ser un valor numerico';
    }
    return errors;
}