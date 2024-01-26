export default function validateOngSettingsForm(values: any) {
    const errors: any = {};
    // Validate first name
    if (!values.name) {
        errors.name = 'El nombre es obligatorio';
    }
    return errors;
}