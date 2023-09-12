import ContactForm from '../components/contactform';
import LandingContainter from '../components/landingcontainter';
import './landing.css'

export const Landing = () => {
    return (
        <div className="content">
            <h1 className='title'>Grupo Latinoamericano de ayuda a mascotas</h1>
            <div className='info-container'>
            <h1 className='info1'>Nuestra misión es rescatar animales abandonados.</h1>
            <h1 className='info2'>Nuestro sueño es que un día no sea necesario hacerlo</h1>
            </div>
            <LandingContainter
            left={false}
            path="../src/assets/descarga.jpg"
            subt="Donaciones"
            parag="Las donaciones por parte de las personas nos ayudan en gran medida y 
            tienen un gran impacto positivo en la calidad de vida de millones de animales."/>
            <LandingContainter 
            left={true}
            path="../src/assets/cat&dogs.png"
            subt="Quienes somos?"
            parag="Somos una organización sin fines de lucro, 
            con el objetivo de que todos los animales maltratados o en situación 
            de calle tengan la posibilidad de encontrar un nuevo hogar."/>
            <h1>Contactanos</h1>
            <ContactForm />
        </div>
    );
}