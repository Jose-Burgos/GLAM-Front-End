export default function validateAddAnimalForm(values: any) {
    let errors: any = {};
    if(!values.species_id){
        errors.species = 'Debe seleccionar una especie'
    }
    // Validate animal name
    if (!values.name) {
        errors.name = 'El nombre es obligatorio';
    }
    if (!values.breed) {
        errors.breed = 'La raza es obligatoria';
    }
    if(!values.height) {
        errors.height = 'La altura es obligatoria';
    }
    if(!values.back_length){
        errors.back_length = 'La longitud del lomo es obligatorio';
    }
    if(!values.weight) {
        errors.weight = 'El peso es obligatorio';
    }
    if(!values.age) {
        errors.age = 'La edad es obligatoria';
    }
    if(!values.sex){
        errors.sex = 'El sexo es obligatorio'
    }
    return errors;
} 