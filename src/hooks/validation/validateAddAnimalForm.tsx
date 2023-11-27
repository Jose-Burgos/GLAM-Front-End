import { Rating } from "@mui/material";

export default function validateAddAnimalForm(values: any) {
    const errors: any = {};
    // Validate species
    if(!values.species_id){
        errors.species_id = 'Debe seleccionar una especie'
    }
    // Validate animal name
    if (!values.name) {
        errors.name = 'El nombre es obligatorio';
    }
    // Validate breed
    if (!values.breed) {
        errors.breed = 'La raza es obligatoria';
    }
    // Validate height
    if(!values.height || values.height<=0) {
        errors.height = 'La altura es obligatoria';
    }
    else if(!/^[0-9]*[1-9][0-9]*$/i.test(values.height)) {
        errors.height = 'La altura debe ser un valor numerico';
    }
    // Validate Back Length
    if(!values.back_length || values.back_length<=0) {
        errors.back_length = 'La longitud del lomo es obligatoria';
    }
    else if(!/^[0-9]*[1-9][0-9]*$/i.test(values.back_length)) {
        errors.back_length = 'La longitud del lomo debe ser un valor numerico';
    }
    // Validate weight
    if(!values.weight) {
        errors.weight = 'El peso es obligatorio';
    }
    else if(!/^[0-9]*[1-9][0-9]*$/i.test(values.weight)) {
        errors.weight = 'El peso debe ser un valor numerico';
    }
    else if(values.weight > 110){
        errors.weight = 'Valor no válido.';
    }

    // Validate age
    if(!values.age) {
        errors.age = 'La edad es obligatoria';
    }
    else if(!/^[0-9]*[1-9][0-9]*$/i.test(values.age)) {
        errors.age = 'La edad debe ser un valor numerico';
    }
    // Validate sex
    if(!values.sex){
        errors.sex = 'El sexo es obligatorio';
    }
    // Validate Rescue Date
    if(!values.rescue_date){
        errors.rescue_date = 'La fecha de rescate es obligatoria';
    }
    // Validate Health Rating
    if(!values.health_rating){
        errors.health_rating = 'El porcentaje de salud es obligatorio';
    }
    // Validate vaccinated
    if(!values.vaccinated) {
        errors.vaccinated = 'Indica si el animal esta vacunado';
    }
    return errors;
} 
