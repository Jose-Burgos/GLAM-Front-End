export default function validateOngSettingsForm(values: any) {
    const errors: any = {};
    // Validate first name
    if (!values.firstName) {
        errors.firstName = 'El nombre es obligatorio';
    }
    return errors;
}