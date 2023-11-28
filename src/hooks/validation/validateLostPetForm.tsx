// validateLostPetReportForm.js

export default function validateLostPetReportForm(values :any) {
    const errors : any = {};
        // Validar el tipo de animal
        if (!values.species_id) {
        errors.species_id = 'Debe seleccionar una especie';
        }
    
        // Validar la ubicación
        if (!values.location) {
        errors.location = 'La ubicación es obligatoria';
        }
    
        // Validar la descripción
        if (!values.description) {
        errors.description = 'La descripción es obligatoria';
        }
        return errors;
    }
    