import ContactForm from '../components/contactform';
import LandingContainter from '../components/landingcontainter';
import './landing.css'

export const Landing = () => {
    return (
        <div className="content">
            <h1>Grupo Latinoamericano de ayuda a mascotas</h1>
            <LandingContainter 
            left={true}
            path="../src/assets/cat&dogs.png"
            subt="Quienes somos?"
            parag="Somos una organización sin fines de lucro, 
            con el objetivo de que todos los animales maltratados o en situación 
            de calle tengan la posibilidad de encontrar un nuevo hogar."/>
            <LandingContainter 
            left={false}
            path="../src/assets/cat&dogs.png"
            subt="Quienes somos?"
            parag="Somos una organización sin fines de lucro, 
            con el objetivo de que todos los animales maltratados o en situación 
            de calle tengan la posibilidad de encontrar un nuevo hogar."/>
            <LandingContainter 
            left={true}
            path="../src/assets/cat&dogs.png"
            subt="Quienes somos?"
            parag="Somos una organización sin fines de lucro, 
            con el objetivo de que todos los animales maltratados o en situación 
            de calle tengan la posibilidad de encontrar un nuevo hogar."/>
            <LandingContainter 
            left={false}
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