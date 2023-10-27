export default function validatePasswordResetForm(values : any){
    let errors : any = {}
     // Validate email
    if(!values.email) {
        errors.email = 'Debes introducir un email válido'
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        errors.email = 'Email no válido'
    }
    return errors
}